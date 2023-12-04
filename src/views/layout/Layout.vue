<template>
  <a-layout has-sider>
    <a-layout-sider :style="{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0}">
      <div class="logo" />
      <a-menu :selectedKeys="[currentRoute]" theme="dark" mode="inline">
        <a-menu-item key="helloPoint">
          <router-link to="helloPoint"><span class="nav-text">Hello Point</span></router-link>
        </a-menu-item>
        <a-menu-item key="helloPoint2">
          <router-link to="helloPoint2"><span class="nav-text">Hello Point2</span></router-link>
        </a-menu-item>
        <a-menu-item key="clickedPoints">
          <router-link to="clickedPoints"><span class="nav-text">Clicked Points</span></router-link>
        </a-menu-item>
        <a-menu-item key="coloredPoints">
          <router-link to="coloredPoints"><span class="nav-text">Colored Points</span></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{marginLeft: '200px'}">
      <a-layout-content :style="{margin: '24px 16px', overflow: 'initial', height: '100vh'}">
        <div :style="{padding: '24px', background: '#fff', height: '100%'}">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {defineComponent, computed} from 'vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'Layout',
  components: {},
  setup() {
    const router = useRouter();

    const currentRoute = computed(() => {
      return router.currentRoute.value.name;
    });

    return {
      router,
      currentRoute,
    };
  },
});
</script>
<style lang="css" scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
