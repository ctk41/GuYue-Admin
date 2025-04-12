export function getTableScroll({ extraHeight, ref, isSummary = false }: any = {}) {
  if (typeof extraHeight == 'undefined') {
    if (isSummary) {
      extraHeight = 54 + 48;
    } else {
      extraHeight = 54;
    }
  }
  let tHeader = null;
  if (ref && ref.current) {
    tHeader = ref.current.getElementsByClassName('ant-table-thead')[0];
  } else {
    tHeader = document.getElementsByClassName('ant-table-thead')[0];
  }
  let tHeaderBottom = 0;
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom;
  }
  let height = `calc(100vh - ${tHeaderBottom + extraHeight + 50}px)`;
  if (ref && ref.current) {
    let placeholder = ref.current.getElementsByClassName('ant-table-placeholder')[0];
    if (placeholder) {
      placeholder.style.height = height;
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
    }
  }
  return height;
}

export const getJsonArrEqual = (arr1: any, arr2: any) => {
  let newArr: any[] = [],
    kvIndex: any = {};
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].title == arr2[j].title) {
        let item: any;
        if (kvIndex[arr1[i].title] == undefined) {
          kvIndex[arr1[i].title] = newArr.length;
          item = {};
          for (let attr in arr1[i]) item[attr] = arr1[i][attr];
          newArr[kvIndex[arr1[i].title]] = item;
        } else {
          item = newArr[kvIndex[arr1[i].title]];
          for (let attr in arr2[j]) item[attr] = arr2[j][attr];
        }
      }
    }
  }
  return newArr;
};
