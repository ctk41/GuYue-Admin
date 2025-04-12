import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/modules/global';
import { ConfigProvider } from 'ant-design-vue';

export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { primary, isGrey, isWeak } = storeToRefs(globalStore);

  const switchDark = () => {
    changePrimary();
  };

  const changePrimary = () => {
    ConfigProvider.config({
      theme: {
        primaryColor: primary.value,
      },
    });
  };

  const changeGreyOrWeak = (value: boolean, type: string) => {
    const body = document.body as HTMLElement;
    if (!value) return body.setAttribute('style', '');
    if (type === 'grey') body.setAttribute('style', 'filter: grayscale(1)');
    if (type === 'weak') body.setAttribute('style', 'filter: invert(80%)');
    const propName = type === 'grey' ? 'isWeak' : 'isGrey';
    globalStore.setGlobalState(propName, false);
  };

  const initTheme = () => {
    switchDark();
    changePrimary();
    if (isGrey.value) changeGreyOrWeak(true, 'grey');
    if (isWeak.value) changeGreyOrWeak(true, 'weak');
  };

  return {
    initTheme,
    switchDark,
    changePrimary,
    changeGreyOrWeak,
  };
};
