<template>
  <div class="wrapper">
    <ad-header></ad-header>
    <ad-sidebar></ad-sidebar>
    <div class="ad-site-page">
      <div class="page-container">
        <div class="layout-full site-contabs-open site-menubar-unfold">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdLayoutHeaderComponent from "./header.vue";
import AdLayoutSidebarComponent from "./sidebar.vue";
export default {
  name: "AdLayoutComponent",
  components: {
    "ad-header": AdLayoutHeaderComponent,
    "ad-sidebar": AdLayoutSidebarComponent
  },
  data() {
    return {};
  },
  methods: {}
};
</script>