<template>
  <a-modal
    class="table-head-modal"
    :visible="tableHeadPop"
    :bodyStyle="{ padding: '8px' }"
    title="Table View Settings"
    :width="900"
    @cancel="handleCancel"
  >
    <div class="Custom-list-container">
      <div class="left">
        <div class="choosableField">
          <p class="optionalField">
            Optional Fields
            <span class="amount">{{ columnsAll.length }}</span>
          </p>
        </div>
        <div class="check-all">
          <a-checkbox v-model:checked="state.checkAll" :indeterminate="state.indeterminate" @change="onCheckAllChange">
            Select All
          </a-checkbox>
        </div>
        <a-checkbox-group v-model:value="checkedList" @change="onChange" style="height: 265px; overflow-y: auto">
          <ul class="check-ul">
            <li v-for="(item, index) in columnsAll" :key="index" class="check-li">
              <a-checkbox :value="item.key" @change="getCheckOne" :disabled="item?.disabled ?? false">
                <span class="commonCode">{{ item.title }}</span>
              </a-checkbox>
            </li>
          </ul>
        </a-checkbox-group>
      </div>
      <div class="right">
        <div class="checkedField">
          <p class="optionalField">
            Selected Fields
            <span class="amount">{{
              sort.length + fixedColumns.fixedLeft.length + fixedColumns.fixedRight.length
            }}</span>
          </p>
          <a-button v-show="sort.length" type="link" @click="clearAll">Clear</a-button>
        </div>
        <Draggable v-model="sort" item-key="key" :animation="100" :sort="true" class="drag-container">
          <template #item="{ element }">
            <div class="draggable-item-container">
              <div class="drag-item">
                <a-space style="justify-content: space-between; width: 100%">
                  <div>
                    <a-space>
                      <SvgIcon name="move" />
                      <span>{{ element.title }}</span>
                    </a-space>
                  </div>
                  <a-button type="text" size="small" @click="sortDeleteOne(element.key)">
                    <template #icon>
                      <SvgIcon name="close" />
                    </template>
                  </a-button>
                </a-space>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
    <template #footer>
      <a-button @click="handleCancel">Return</a-button>
      <a-button type="primary" class="search-btn" @click="handleOk">Save to Local</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts" name="CompactHeaders">
  import { onMounted, ref, toRaw, watch, reactive } from 'vue';
  import type { TableColumnType } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { getJsonArrEqual } from '@/utils/table';
  import Draggable from 'vuedraggable';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { createCacheStorage } from '@/utils/cache/storageCache';
  import { StorageType } from '@/enums/cache';

  interface CompactHeadersProps {
    columns: TableColumnType[];
    tableKey: string;
  }
  interface ColumnProps<T = any> extends TableColumnType<T> {
    checked?: boolean;
    disabled?: boolean;
  }
  declare type Key = string | number;

  const props = withDefaults(defineProps<CompactHeadersProps>(), {});
  const emits = defineEmits<{
    (e: 'update:columns', columns: any): void;
  }>();
  const checkedList = ref<Key[]>([]);
  const columnsAll = ref<ColumnProps[]>([]);
  const fixedColumns = reactive<{
    indexColumn: ColumnProps[];
    fixedLeft: ColumnProps[];
    fixedRight: ColumnProps[];
  }>({
    indexColumn: [],
    fixedLeft: [],
    fixedRight: [],
  });
  const sort = ref<ColumnProps[]>([]);
  const state = reactive({
    indeterminate: false,
    checkAll: false,
  });
  const tableHeadPop = ref(false);
  const acceptParams = () => {
    tableHeadPop.value = true;
    setValues();
  };
  const handleCancel = () => {
    tableHeadPop.value = false;
  };
  const storageConfig = {
    key: 'sortTable-' + props.tableKey,
    type: StorageType.LOCAL,
    hasEncrypt: false,
  };
  const sortStorage = createCacheStorage(storageConfig);
  const setValues = () => {
    checkedList.value = [];
    sort.value = [];
    let newColumns = getJsonArrEqual(toRaw(props.columns), columnsAll.value);
    columnsAll.value.forEach(i => {
      i.checked = false;
      if (i.fixed === 'left' || i.fixed === 'right') {
        i.disabled = true;
      }
    });
    const keySet = new Set(newColumns.map(i => i.key));
    columnsAll.value.forEach(item => {
      if (keySet.has(item.key)) {
        item.checked = true;
        item.key && checkedList.value.push(item.key);
      }
    });
    props.columns.forEach(item => {
      if (item.fixed !== 'left' && item.fixed !== 'right') {
        sort.value.push(item);
      }
    });
  };
  const onChange = (checkedValue: any) => {
    checkedList.value = checkedValue;
  };
  const getCheckOne = (e: any) => {
    columnsAll.value.forEach((item, index) => {
      if (item.key === e.target.value) {
        columnsAll.value[index].checked = e.target.checked;
        if (e.target.checked) {
          sort.value.push(item);
        } else {
          let index = sort.value.findIndex(i => i.key === item.key);
          if (index !== -1) sort.value.splice(index, 1);
        }
      }
    });
  };
  const onCheckAllChange = (e: any) => {
    sort.value = [];
    if (e.target.checked) {
      if (columnsAll.value.length) {
        checkedList.value = [];
        columnsAll.value.map(i => {
          i.key && checkedList.value.push(i.key);
          return (i.checked = true);
        });
        columnsAll.value.forEach(item => {
          if (!item.disabled) {
            sort.value.push(item);
          }
        });
      }
    } else {
      let newCheckedList: Key[] = [];
      fixedColumns.fixedLeft.forEach(item => {
        item.key && newCheckedList.push(item.key);
      });
      fixedColumns.fixedRight.forEach(item => {
        item.key && newCheckedList.push(item.key);
      });
      checkedList.value = newCheckedList;
      columnsAll.value.map(i => {
        if (i.fixed === 'left' || i.fixed === 'right') {
          return (i.checked = true);
        } else {
          return (i.checked = false);
        }
      });
    }
  };
  const clearAll = () => {
    sort.value = [];
    let newCheckedList: Key[] = [];
    fixedColumns.fixedLeft.forEach(item => {
      item.key && newCheckedList.push(item.key);
    });
    fixedColumns.fixedRight.forEach(item => {
      item.key && newCheckedList.push(item.key);
    });
    checkedList.value = newCheckedList;
  };
  const sortDeleteOne = (key: number | string) => {
    const sortIndex = sort.value.findIndex(i => i.key === key);
    if (sortIndex !== -1) sort.value.splice(sortIndex, 1);
    const checkIndex = checkedList.value.findIndex(i => i === key);
    if (checkIndex !== -1) checkedList.value.splice(checkIndex, 1);
  };
  const getValues = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      if (checkedList.value.length >= 3) {
        resolve(sort.value);
      } else {
        message.warning('At least three items must be selected');
        reject([]);
      }
    });
  };
  const handleOk = async () => {
    let newColumns = await getValues();
    let _totalCols = [
      ...fixedColumns.indexColumn,
      ...fixedColumns.fixedLeft,
      ...newColumns,
      ...fixedColumns.fixedRight,
    ];
    if (_totalCols.length) {
      let keys: Key[] = [];
      _totalCols.forEach(item => keys.push(item.key));
      sortStorage.set(keys);
      tableHeadPop.value = false;
      emits('update:columns', _totalCols);
    }
  };
  watch(
    () => [...checkedList.value],
    newVal => {
      state.indeterminate = !!newVal.length && newVal.length < columnsAll.value.length;
      state.checkAll = newVal.length === columnsAll.value.length;
    },
  );
  onMounted(() => {
    let newColumns = props.columns.map(item => ({ ...item, checked: false }));
    newColumns.forEach(item => {
      if (item.key === 'index') {
        fixedColumns.indexColumn.push(item);
      }
    });
    let filtrationKeys: (string | number)[] = ['index'];
    newColumns = newColumns!.filter(item => !filtrationKeys.includes(item.key!));
    columnsAll.value = newColumns;
    columnsAll.value.forEach(item => {
      if (item.fixed === 'left') {
        fixedColumns.fixedLeft.push(item);
      }
      if (item.fixed === 'right') {
        fixedColumns.fixedRight.push(item);
      }
    });
  });

  defineExpose({
    acceptParams,
  });
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
