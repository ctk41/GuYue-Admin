<template>
  <a-modal v-model:visible="visible" :title="`Batch Add ${parameter.title}`" :footer="null" width="580px">
    <a-form>
      <a-form-item label="Template Download:">
        <a-button type="primary" @click="downloadTemp">
          <template #icon>
            <DownloadOutlined />
          </template>
          Download
        </a-button>
      </a-form-item>

      <a-form-item label="File Upload:">
        <a-upload-dragger
          name="file"
          :multiple="true"
          class="upload"
          :maxCount="excelLimit"
          @change="handleChange"
          :showUploadList="false"
          :customRequest="uploadExcel"
          :beforeUpload="beforeExcelUpload"
          :accept="parameter.fileType!.join(',')"
        >
          <p class="ant-upload-drag-icon">
            <cloud-upload-outlined />
          </p>
          <p class="ant-upload-text">Drag files here, or <em>click to upload</em></p>
        </a-upload-dragger>
        <div class="a-upload__tip">
          Please upload .xls or .xlsx standard format files, maximum file size is {{ parameter.fileSize }}M
        </div>
      </a-form-item>

      <a-form-item label="Data Override:">
        <a-switch v-model:checked="isCover" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts" name="importExcel">
  import { ref } from 'vue';
  import { useDownload } from '@/hooks/useDownload';
  import { UploadChangeParam, notification } from 'ant-design-vue';

  export interface ExcelParameterProps {
    title: string;
    fileSize?: number;
    fileType?: File.ExcelMimeType[];
    tempApi?: (params: any) => Promise<any>;
    importApi?: (params: any) => Promise<any>;
    getTableList?: () => void;
  }

  const isCover = ref(false);
  const excelLimit = ref(1);
  const visible = ref(false);
  let limitMessage: boolean = true;

  const parameter = ref<ExcelParameterProps>({
    title: '',
    fileSize: 5,
    fileType: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  });

  const acceptParams = (params: ExcelParameterProps) => {
    parameter.value = { ...parameter.value, ...params };
    visible.value = true;
  };

  const downloadTemp = () => {
    if (!parameter.value.tempApi) return;
    useDownload(parameter.value.tempApi, `${parameter.value.title} Template`);
  };

  const uploadExcel = async (e: any) => {
    try {
      let excelFormData = new FormData();
      excelFormData.append('file', e.file);
      excelFormData.append('isCover', isCover.value as unknown as Blob);
      let res = await parameter.value.importApi!(excelFormData);
      e.onSuccess(res.data, e);
      parameter.value.getTableList && parameter.value.getTableList();
      visible.value = false;
    } catch (error) {
      e.onError(error);
    }
  };

  const beforeExcelUpload = async (file: any, fileList: any) => {
    const isExcel = parameter.value.fileType!.includes(file.type as File.ExcelMimeType);
    const fileSize = file.size / 1024 / 1024 < parameter.value.fileSize!;
    const fileAmount = fileList.length >= 2 ? false : true;

    if (!isExcel) {
      notification['warning']({
        message: 'Notice',
        description: 'Upload files can only be in xls / xlsx format!',
        style: { borderRadius: '8px' },
        duration: 3,
      });
    }

    if (!fileSize) {
      setTimeout(() => {
        notification['warning']({
          message: 'Notice',
          description: `Upload file size cannot exceed ${parameter.value.fileSize}MB!`,
          style: { borderRadius: '8px' },
          duration: 3,
        });
      }, 0);
    }

    if (!fileAmount) {
      if (limitMessage) {
        notification['warning']({
          message: 'Notice',
          description: 'You can only upload one file at a time!',
          style: { borderRadius: '8px' },
          duration: 3,
        });
        limitMessage = false;
        setTimeout(() => {
          limitMessage = true;
        }, 1000);
      }
    }

    return isExcel && fileSize && fileAmount;
  };

  const handleChange = (info: UploadChangeParam) => {
    const { status } = info.file;
    if (status === 'done') {
      excelUploadSuccess();
    } else if (status === 'error') {
      excelUploadError();
    }
  };

  const excelUploadError = (): void => {
    notification['error']({
      message: 'Notice',
      description: `Batch adding ${parameter.value.title} failed, please try uploading again!`,
    });
  };

  const excelUploadSuccess = (): void => {
    notification['success']({
      message: 'Notice',
      description: `Batch adding ${parameter.value.title} successful!`,
    });
  };

  defineExpose({
    acceptParams,
  });
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
