import { ref, computed } from 'vue';

/**
 * @description Table multi-selection data operations
 * @param {string} rowkey The specified id when table has multi-selection
 */
export const useSelection = (rowkey: string = 'id') => {
  const isSelected = ref<boolean>(false);
  const selectedList = ref<{ [key: string]: any }[]>([]);

  /* Array of all currently selected ids */
  const selectedListIds = computed(() => {
    let ids: Key[] = [];
    selectedList.value.forEach(item => ids.push(item[rowkey]));
    return ids;
  });

  /**
   * @description Multi-selection operation
   * @param {Array} rowArr All currently selected data
   * @return void
   */
  const selectionChange = (rowArr: { [key: string]: any }[]) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false);
    selectedList.value = rowArr;
  };

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
  };
};
