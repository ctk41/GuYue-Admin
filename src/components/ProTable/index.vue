<template>
  <SearchForm
    ref="searchForm"
    :getScrollY="getScrollY"
    :search="search"
    :reset="reset"
    :search-param="searchParam"
    v-show="isShowSearch"
  >
    <template #searchItem="scope">
      <slot name="searchForm" :expand="scope.expand" :formState="scope.formState"></slot>
    </template>
  </SearchForm>

  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selectedListIds="selectedListIds"
          :selectedList="selectedList"
          :isSelected="isSelected"
        ></slot>
      </div>

      <div class="header-button-ri">
        <slot name="toolButton">
          <a-button shape="circle" class="tool-btn" @click="getTableList">
            <template #icon>
              <sync-outlined />
            </template>
          </a-button>

          <a-tooltip placement="top">
            <template #title>
              <span>Table printing functionality is not yet supported</span>
            </template>
            <a-button shape="circle" class="tool-btn">
              <template #icon>
                <printer-outlined />
              </template>
            </a-button>
          </a-tooltip>

          <a-button shape="circle" class="tool-btn" @click="openCompactHeaders">
            <template #icon>
              <setting-outlined />
            </template>
          </a-button>

          <a-button shape="circle" class="tool-btn" @click="isShowSearch = !isShowSearch">
            <template #icon>
              <SearchOutlined />
            </template>
          </a-button>
        </slot>
      </div>
    </div>

    <a-table
      ref="tableRef"
      :loading="isLoading"
      :columns="tableColumns"
      v-bind="$attrs"
      :dataSource="data ?? tableData"
      :bordered="border"
      :rowKey="rowKey"
      :row-selection="multiple ? rowSelection : false"
      :pagination="false"
      :scroll="{ x: 2000, y: scrollY }"
      @resize-column="handleResizeColumn"
    >
      <template #headerCell="{ title, column }">
        <slot name="headerCell" :title="title" :column="column"></slot>
      </template>

      <template #bodyCell="{ text, record, index, column }">
        <slot name="bodyCell" :text="text" :record="record" :index="index" :column="column"></slot>
        <template v-if="column.ellipsis">
          <a-tooltip placement="top">
            <template #title>
              <span>{{ text }}</span>
            </template>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.key === 'index'">
          <span>{{ parseInt(index) + 1 }}</span>
        </template>
      </template>

      <template #expandedRowRender="scope">
        <slot name="expandedRowRender" v-bind="scope"></slot>
      </template>

      <template #emptyText>
        <div class="table-empty" :style="{ height: noDataHeight }">
          <slot name="emptyText">
            <div class="notData-container">
              <img src="@/assets/images/emptyData.png" alt="notData" />
              <div class="notice">No data</div>
            </div>
          </slot>
        </div>
      </template>
    </a-table>

    <Pagination :pageabale="pageable" :handle-page-and-page-size="handlePageAndPageSize" />

    <transition appear name="fade-transform" mode="out-in">
      <div class="footer-slot-wrapper" v-show="selectedList.length">
        <a-space>
          <a-checkbox v-model:checked="state.checkAll" @change="onCheckAllChange" :indeterminate="state.indeterminate">
            Selected
            <span class="footer-selected-count">{{ selectedList.length }}</span>
            items
          </a-checkbox>
          <slot
            name="footer-btn"
            :selectedListIds="selectedListIds"
            :selectedList="selectedList"
            :isSelected="isSelected"
          ></slot>
        </a-space>
      </div>
    </transition>

    <CompactHeaders ref="CompactHeadersRef" :table-key="props.tableKey" v-model:columns="tableColumns" />
  </div>
</template>

<script setup lang="tsx" name="ProTable">
  import { ref, reactive, onMounted, nextTick, watch } from 'vue';
  import type { TableColumnType } from 'ant-design-vue';
  import { Table } from 'ant-design-vue';
  import { useTable } from '@/hooks/useTable';
  import { useSelection } from '@/hooks/useSelection';
  import Pagination from './components/Pagination.vue';
  import SearchForm from '@/components/SearchForm/index.vue';
  import { getTableScroll } from '@/utils/table';
  import CompactHeaders from '@/components/CompactHeaders/index.vue';
  import { createCacheStorage } from '@/utils/cache/storageCache';
  import { StorageType } from '@/enums/cache';
  import { isArray } from '@/utils/is';

  interface ProTableProps {
    columns: TableColumnType[];
    tableKey: string;
    data?: any[];
    requestApi?: (params: any) => Promise<any>;
    requestAuto?: boolean;
    requestError?: (params: any) => void;
    dataCallback?: (data: any) => any;
    isPagination?: boolean;
    initParam?: any;
    multiple?: boolean;
    border?: boolean;
    toolButton?: boolean;
    rowKey?: string;
    isSummary?: boolean;
  }

  const props = withDefaults(defineProps<ProTableProps>(), {
    requestAuto: true,
    isPagination: true,
    initParam: {},
    multiple: false,
    border: true,
    toolButton: true,
    rowKey: 'id',
    isSummary: false,
  });

  const isShowSearch = ref(true);
  const tableRef = ref();
  const state = reactive({
    indeterminate: false,
    checkAll: false,
  });

  const onCheckAllChange = (e: any) => {
    if (e.target.checked) selectionChange(tableData.value);
    else selectionChange([]);
  };

  const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

  const { tableData, isLoading, searchParam, pageable, getTableList, search, reset, handlePageAndPageSize } = useTable(
    props.requestApi,
    props.initParam,
    props.isPagination,
    props.dataCallback,
    props.requestError,
  );

  const rowSelection = {
    selectedRowKeys: selectedListIds,
    onChange: (selectedRowKeys: Key[], selectedRows: DefaultRecordType[]) => {
      selectionChange(selectedRows);
    },
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  const clearSelection = () => selectionChange([]);

  const tableColumns = ref<TableColumnType[]>(props.columns);

  const scrollY = ref('0');
  const searchForm = ref();
  const noDataHeight = ref('0');

  const getScrollY = () => {
    nextTick(() => {
      let scrol_Y = getTableScroll({ isSummary: props.isSummary });
      let height = getTableScroll({ extraHeight: 108 });
      scrollY.value = scrol_Y;
      noDataHeight.value = height;
    });
  };

  const handleResizeColumn = (w: string | number, col: TableColumnType) => {
    if (100 > Number(w) || Number(w) > 400) return;
    if (col.width) col.width = w;
  };

  const CompactHeadersRef = ref<InstanceType<typeof CompactHeaders> | null>(null);

  const openCompactHeaders = () => {
    CompactHeadersRef.value?.acceptParams();
  };

  const storageConfig = {
    key: 'sortTable-' + props.tableKey,
    type: StorageType.LOCAL,
    hasEncrypt: false,
  };

  const sortStorage = createCacheStorage(storageConfig);

  onMounted(() => {
    props.requestAuto && getTableList();
    scrollY.value = getTableScroll({ isSummary: props.isSummary });
    noDataHeight.value = getTableScroll({ extraHeight: 108 });
    let _cache = sortStorage.get();
    if (_cache && isArray(_cache)) {
      let newColumns: TableColumnType[] = [];
      _cache.forEach(item => {
        tableColumns.value.forEach(column => {
          if (item === column.key) {
            newColumns.push(column);
          }
        });
      });
      tableColumns.value = [...newColumns];
    }
  });

  watch(
    () => isShowSearch.value,
    () => {
      getScrollY();
    },
  );

  watch(
    () => selectedList.value,
    newVal => {
      state.indeterminate = !!newVal.length && newVal.length < tableData.value.length;
      state.checkAll = newVal.length === tableData.value.length;
    },
  );

  defineExpose({
    tableData,
    searchParam,
    pageable,
    getTableList,
    reset,
    isSelected,
    selectedList,
    selectedListIds,
    clearSelection,
  });
</script>

<style scoped lang="less">
  .notData-container {
    box-sizing: border-box;
    width: 100%;
    padding: 70px;
    text-align: center;

    img {
      height: 210px;
    }

    .notice {
      font-size: 16px;
      line-height: 29px;
      color: #333333;
    }
  }

  .footer-slot-wrapper {
    position: absolute;
    bottom: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: calc(100% - 30px);
    height: 32px;
    background: #ffffff;

    .footer-selected-count {
      font-weight: 600;
      color: @primary-color;
    }
  }

  :deep(.ant-table-summary) {
    height: 48px;
  }
</style>
