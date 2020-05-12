<template>
  <div>
    <el-scrollbar wrapClass="yf-container" class="elScrollbar">
      <el-menu :default-active="activeMenu"
               :background-color="variables.menuBg"
               :text-color="variables.menuText"
               :active-text-color="variables.menuActiveText"
               :collapse="isCollapse"
               :collapse-transition="false"
               unique-opened
               router>
        <slidebar-item v-for="route in permission_routes"
                       :key="route.path"
                       :item="route"
                       :base-path="route.path"
                       :spread="isCollapse">
        </slidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import variables from '@/assets/scss/slidebar.scss'
  import SlidebarItem from "./slidebarItem"
  import {mapGetters} from 'vuex'

  export default {
    name: 'sliderbar',
    components: {SlidebarItem},
    props: ['value'],
    created() {
      // log('route', this.permission_routes)
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['permission_routes']),
      activeMenu() {
        return this.$route.path
      },
      isCollapse() {
        return this.value;
      },
      variables() {
        return variables
      }
    }
  }
</script>

<style>
  .elScrollbar {
    overflow-x: hidden !important;
  }

  .yf-container {
    height: calc(100% + 15px) !important;
  }
</style>
<style lang="scss">
  @import "./sliderbar.less";
</style>
<style lang="scss" scoped>
  .elScrollbar {
    /deep/.el-submenu__icon-arrow.el-icon-arrow-right {
      display: none;
    }
  }
</style>
