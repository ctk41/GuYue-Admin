<template>
  <a-card title="Workbench" :bordered="false" :bodyStyle="{ padding: '15px' }" class="mb-6">
    <a-row>
      <a-col :span="12">
        <div class="flx-align-center">
          <a-avatar :size="{ md: 42, xl: 52, xxl: 64 }">
            <template #icon>
              <img alt="avatar" src="@/assets/images/avatar.jpg" />
            </template>
          </a-avatar>
          <div>
            <p class="px-16 text-title">
              <span>{{ time }}</span
              >, {{ username }}, let's start your day's work!
            </p>
            <p class="px-16 text-gray">Today cloudy turning to heavy rain, 17℃ - 28℃, remember to bring an umbrella.</p>
          </div>
        </div>
      </a-col>
      <a-col :span="12" class="flx-justify-between">
        <a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
          <p class="count-text">Projects</p>
          <a-typography-text strong class="info-size">
            <CountUp :end="1600" :options="{ prefix: '' }"></CountUp>
          </a-typography-text>
        </a-card>
        <a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
          <p class="count-text">To-do</p>
          <a-typography-text strong class="info-size">
            <CountUp :end="9" :options="{ prefix: '' }"></CountUp>/<CountUp
              :end="16"
              :options="{ prefix: '' }"
            ></CountUp>
          </a-typography-text>
        </a-card>
        <a-card :bordered="false" :bodyStyle="{ padding: '6px' }">
          <p class="count-text">Messages</p>
          <a-typography-text strong class="info-size">
            <CountUp :end="1136" :options="{ prefix: '' }"></CountUp>
          </a-typography-text>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
  <a-row :gutter="6">
    <a-col :span="12">
      <a-card title="Engineering Projects" class="mb-6">
        <template #extra><a href="https://gitee.com/Y_lao/VTI CORP" target="_blank">More Projects</a></template>
        <a-card-grid v-for="item in projectData" :key="item.title">
          <div class="flex flex-row">
            <component :is="item.icon" :style="{ fontSize: '30px', color: item.color }"></component>
            <span class="project-text">
              <a-anchor-link :href="item.link" :title="item.title" target="_blank" />
            </span>
          </div>
          <div class="flex mt-8 text-gray" style="height: 40px; overflow: hidden">
            {{ item.desc }}
          </div>
          <div
            class="flex mt-8 text-gray"
            style="height: 20px; overflow: hidden; font-size: 12px; color: rgb(0 0 0 / 25%)"
          >
            {{ item.author }}
          </div>
        </a-card-grid>
      </a-card>
      <a-card title="Activities" :bordered="false" :bodyStyle="{ paddingTop: 0, paddingBottom: 0 }">
        <a-list item-layout="horizontal" :data-source="dynamicData">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.desc">
                <template #title>
                  <a :href="item.link" target="_blank">{{ item.title }}</a>
                </template>
                <template #avatar>
                  <a-avatar :size="40">
                    <template #icon>
                      <img alt="avatar" src="@/assets/images/avatar.jpg" />
                    </template>
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="Quick Actions" class="mb-6">
        <a-card-grid
          style="padding: 12px; text-align: center"
          v-for="item in shortcutKeyList"
          :key="item.title"
          class="shortcut-key"
        >
          <div class="flex justify-center flex-col" @click="item.onClick">
            <span>
              <component :is="item.icon" :style="{ fontSize: '26px', color: item.color }"></component>
            </span>
            <span class="title">{{ item.title }}</span>
          </div>
        </a-card-grid>
      </a-card>
      <a-card title="Gitee / GitHub Visit Proportion" :bodyStyle="{ height: '350px' }">
        <div class="book-echarts">
          <Pie ref="pieRef" />
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts" name="home">
  import { ref, computed, onMounted } from 'vue';
  import { useUserStore } from '@/stores/modules/user';
  import { getTimeState } from '@/utils/util';
  import { useRouter } from 'vue-router';
  import Pie from './components/pie.vue';
  import CountUp from '@/components/CountUp/index.vue';

  interface DataItem {
    id: string;
    title: string;
    link: string;
    desc: string;
  }

  interface ShortcutKeyItem {
    icon: string;
    title: string;
    color: string;
    onClick: () => void;
  }

  interface ShortcutKeyItem {
    icon: string;
    title: string;
    color: string;
    onClick: () => void;
  }

  interface ProjectItem {
    icon: string;
    title: string;
    desc: string;
    author: string;
    color: string;
    link?: string;
  }

  const router = useRouter();
  const userStore = useUserStore();
  const username = computed(() => userStore.userInfo.name);
  const time = computed(() => getTimeState());
  const pieRef = ref();

  const shortcutKeyList: ShortcutKeyItem[] = [
    {
      icon: 'FundViewOutlined',
      title: 'Dashboard',
      color: '#68c755',
      onClick: () => {
        router.push('/dashboard/dataVisualize');
      },
    },
    {
      icon: 'FileTextOutlined',
      title: 'Forms',
      color: '#fab558',
      onClick: () => {
        router.push('/form/basicForm');
      },
    },
    {
      icon: 'LockOutlined',
      title: 'Permissions',
      color: '#3da2ff',
      onClick: () => {
        router.push('/auth/menu');
      },
    },
    {
      icon: 'BarChartOutlined',
      title: 'Data Screen',
      color: '#f387aa',
      onClick: () => {
        router.push('/dataScreen');
      },
    },
    {
      icon: 'ProjectOutlined',
      title: 'About Project',
      color: '#814dd6',
      onClick: () => {
        router.push('/about/index');
      },
    },
    {
      icon: 'MailOutlined',
      title: 'Messages',
      color: '#5cdbd3',
      onClick: () => {},
    },
  ];
  const dynamicData: DataItem[] = [
    {
      id: '1',
      title: 'Vue3 Custom Right-click Menu Component',
      link: 'https://juejin.cn/post/7212456518331088952',
      desc: '2023-05-06 22:06:16',
    },
    {
      id: '2',
      title: 'Engineering: Axios + Ts Secondary Encapsulation',
      link: 'https://juejin.cn/post/7175174061515866149',
      desc: '2023-05-04 12:17:16',
    },
    {
      id: '3',
      title: 'Less Global Style Definition',
      link: 'https://juejin.cn/post/7167007858394546213',
      desc: '2023-05-03 21:37:16',
    },
    {
      id: '4',
      title: 'Vue3.2 - Using nextTick',
      link: 'https://juejin.cn/post/7039135899904393229',
      desc: '2023-05-02 15:27:16',
    },
    {
      id: '5',
      title: 'Vue Version Hooks Library - VueUse',
      link: 'https://juejin.cn/post/7055248384713555999',
      desc: '2023-05-01 05:30:16',
    },
    {
      id: '6',
      title: 'Vue3 Custom Directives - 10 Common Practical Directives',
      link: 'https://juejin.cn/post/6968996649515515917',
      desc: '2023-05-01 16:17:16',
    },
  ];
  const projectData: ProjectItem[] = [
    {
      icon: 'GithubOutlined',
      title: 'Github',
      desc: 'A hosting platform for open source and private software projects.',
      author: 'Open Source Master 2021-07-04',
      color: '#333639',
      link: 'https://github.com/',
    },
    {
      icon: 'GitlabOutlined',
      title: 'Gitlab',
      desc: 'A git-based project management software.',
      author: 'Must Learn 2021-07-04',
      color: '#47ba86',
      link: 'https://gitlab.com/users/sign_in',
    },
    {
      icon: 'Html5Outlined',
      title: 'HTML5',
      desc: 'HTML5 is the next generation standard for the internet.',
      author: 'Coding is an Art 2021-04-01',
      color: '#e4502c',
      link: 'https://www.w3school.com.cn/html/html5_intro.asp',
    },
    {
      icon: 'TaobaoCircleOutlined',
      title: 'Taobao',
      desc: 'If you can think of it, you can find it here.',
      author: 'Shopping World 2021-04-01',
      color: '#42b983',
      link: 'https://www.taobao.com/',
    },
    {
      icon: 'AlipayCircleOutlined',
      title: 'Alipay',
      desc: 'Committed to providing simple, secure, and fast payment solutions for businesses and individuals.',
      author: 'Payment Tool 2021-07-04',
      color: '#61dafb',
      link: 'https://auth.alipay.com/login/index.htm',
    },
    {
      icon: 'WeiboOutlined',
      title: 'Weibo',
      desc: 'A social platform for sharing short real-time information.',
      author: 'Share Master 2021-07-04',
      color: '#dd0031',
      link: 'https://weibo.com/newlogin?url=https%3A%2F%2Fweibo.com%2F',
    },
  ];

  const pieData = [
    { value: 4524, name: 'Gitee Visits' },
    { value: 8616, name: 'GitHub Visits' },
  ];

  onMounted(() => {
    pieRef.value.initChart(pieData);
  });
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
