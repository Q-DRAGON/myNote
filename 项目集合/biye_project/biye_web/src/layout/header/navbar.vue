<template>
  <div class="navbarWrapper">
    <div style="padding: 0 15px;" @click="toggleClick">
      <svg
        :class="{'is-active':value}"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64">
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"/>
      </svg>
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1"
                class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="right-menu">
      <search id="header-search" class="right-menu-item"/>
      <screenfull id="screenfull" class="right-menu-item hover-effect"/>
      <el-dropdown class="dropdown" v-if="username">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const {compile} = require("path-to-regexp");
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import { removeToken } from '@/utils/auth.js'

  export default {
    name: 'navbar',
    props: ['value'],
    data() {
      return {
        levelList: null,
      }
    },
    watch: {
      $route(route) {
        if (route.path.startsWith('/redirect/')) {
          return
        }
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    computed: {
      ...mapGetters(['username'])
    },
    methods: {
      ...mapActions(['logout']),
      ...mapMutations(['SETUSERROLE']),
      toggleClick() {
        this.$emit('input', !this.value)
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        const first = matched[0]

        if (!this.isHome(first)) {
          matched = [{path: '/index', meta: {title: '首页'}}].concat(matched)
        }
        this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      isHome(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim().toLocaleLowerCase() === 'index'.toLocaleLowerCase()
      },
      pathCompile(path) {
        const {params} = this.$route
        let toPath = compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const {redirect, path} = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
        this.$router.push(path)
      },
      async handleLogout() {
        await this.logout({
          data: '',
        }).then(res => {
          if (res.code === '0') {
            this.SETUSERROLE()
          }
        })
        this.$router.push('/login')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .navbarWrapper {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    display: flex;
    align-items: center;
  }

  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }


  .right-menu {
    position: absolute;
    display: flex;
    right: 0;
    height: 100%;
    line-height: 50px;
    padding-right: 20px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .dropdown {
      margin-left: 5px;
      cursor: pointer;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }


  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }

  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
