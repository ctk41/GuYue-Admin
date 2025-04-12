import { notification } from 'ant-design-vue';

/**
 * @description Receive data stream to generate blob, create link, and download file
 * @param {Function} api API method for exporting table (required)
 * @param {String} tempName Name of the exported file (required)
 * @param {Object} params Export parameters (default {})
 * @param {Boolean} isNotify Whether to show export notification (default true)
 * @param {String} fileType Format of the exported file (default .xlsx)
 * */
export const useDownload = async (
  api: (param: any) => Promise<any> | any,
  tempName: string,
  params: any = {},
  isNotify: boolean = true,
  fileType: string = '.xlsx',
) => {
  if (isNotify) {
    notification['warning']({
      message: 'Friendly Reminder',
      description: 'If the data is large, the download may be slow. Please be patient!',
      style: { borderRadius: '8px' },
      duration: 3,
    });
  }
  try {
    const res = await api(params);
    const blob = new Blob([res]);
    if ('msSaveOrOpenBlob' in navigator) return window.navigator.msSaveOrOpenBlob(blob, tempName + fileType);
    const blobUrl = window.URL.createObjectURL(blob);
    const exportFile = document.createElement('a');
    exportFile.style.display = 'none';
    exportFile.download = `${tempName}${fileType}`;
    exportFile.href = blobUrl;
    document.body.appendChild(exportFile);
    exportFile.click();
    document.body.removeChild(exportFile);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log(error);
  }
};
