import { Table } from './interface';
import { reactive, computed, toRefs } from 'vue';

/**
 * @description table page operation method encapsulation
 * @param {Function} api Get table data api ---> Required
 * @param {Object} initParams Get data initialization parameters ---> Optional, default is {}
 * @param {Boolean} isPageable Whether there is paging ---> Optional, default is true
 * @param {Function} dataCallback Method for processing data returned by the background ---> Optional
 * @param {Function} requestError Method for handling errors ---> Optional
 * */
export const useTable = (
  api?: (params: any) => Promise<any>,
  initParams: object = {},
  isPageable: boolean = true,
  dataCallback?: (data: any) => any,
  requestError?: (error: any) => void,
) => {
  const state = reactive<Table.TableStateProps>({
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 25,
      total: 0,
    },
    isLoading: false,
    searchParam: {},
    searchInitParam: {},
    totalParam: {},
  });

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize,
      };
    },
    set: (newVal: any) => {
      console.log('我是分页更新之后的值', newVal);
    },
  });

  const getTableList = async () => {
    if (!api) return;
    try {
      Object.assign(state.totalParam, initParams, isPageable ? pageParam.value : {});
      state.isLoading = true;
      let { data } = await api(state.totalParam);
      dataCallback && (data = dataCallback(data));
      state.tableData = isPageable ? data.list : data;
      const { pageNum, pageSize, total } = data;
      isPageable && updatePageable({ pageNum, pageSize, total });
    } catch (error) {
      requestError && requestError(error);
    } finally {
      state.isLoading = false;
    }
  };

  const updatedTotalParam = () => {
    state.totalParam = {};
    let nowSearchParam: { [key: string]: any } = {};
    for (let key in state.searchParam) {
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
  };

  const updatePageable = (resPageable: Table.Pageable) => {
    Object.assign(state.pageable, resPageable);
  };

  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };

  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = {};
    Object.keys(state.searchInitParam).forEach(key => {
      state.searchParam[key] = state.searchInitParam[key];
    });
    updatedTotalParam();
    getTableList();
  };

  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val;
    getTableList();
  };

  const handlePageAndPageSize = (page: number, pageSize: number) => {
    state.pageable.pageNum = page;
    state.pageable.pageSize = pageSize;
    getTableList();
  };

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
    handlePageAndPageSize,
  };
};
