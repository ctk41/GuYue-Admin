<template>
  <div class="select-filter">
    <div v-for="item in data" :key="item.key" class="select-filter-item">
      <div class="select-filter-title">
        <span>{{ item.title }} ：</span>
      </div>
      <span v-if="!item.options.length" class="select-filter-notData">暂无数据 ~</span>
      <ul class="select-filter-list">
        <li
          v-for="option in item.options"
          :key="option.value"
          :class="{
            active:
              option.value === selected[item.key] ||
              (Array.isArray(selected[item.key]) && selected[item.key].includes(option.value)),
          }"
          @click="select(item, option)"
        >
          <slot :row="option">
            <component v-if="option.icon" :is="option.icon" class="select-filter-icon" />
            <span>{{ option.label }}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="selectFilter">
  import { ref, watch } from 'vue';

  interface OptionsProps {
    value: string | number;
    label: string;
    icon?: string;
  }

  interface SelectDataProps {
    title: string;
    key: string;
    multiple?: boolean;
    options: OptionsProps[];
  }

  interface SelectFilterProps {
    data?: SelectDataProps[];
    defaultValues?: { [key: string]: any };
  }

  const props = withDefaults(defineProps<SelectFilterProps>(), {
    data: () => [],
    defaultValues: () => ({}),
  });

  const selected = ref<{ [key: string]: any }>({});
  watch(
    () => props.defaultValues,
    () => {
      props.data.forEach(item => {
        if (item.multiple) selected.value[item.key] = props.defaultValues[item.key] ?? [''];
        else selected.value[item.key] = props.defaultValues[item.key] ?? '';
      });
    },
    { deep: true, immediate: true },
  );

  interface FilterEmits {
    (e: 'change', value: any): void;
  }
  const emit = defineEmits<FilterEmits>();

  const select = (item: SelectDataProps, option: OptionsProps) => {
    if (!item.multiple) {
      if (selected.value[item.key] !== option.value) selected.value[item.key] = option.value;
    } else {
      if (item.options[0].value === option.value) selected.value[item.key] = [option.value];
      if (selected.value[item.key].includes(option.value)) {
        let currentIndex = selected.value[item.key].findIndex((s: any) => s === option.value);
        selected.value[item.key].splice(currentIndex, 1);
        if (selected.value[item.key].length == 0) selected.value[item.key] = [item.options[0].value];
      } else {
        selected.value[item.key].push(option.value);
        if (selected.value[item.key].includes(item.options[0].value)) selected.value[item.key].splice(0, 1);
      }
    }
    emit('change', selected.value);
  };
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
