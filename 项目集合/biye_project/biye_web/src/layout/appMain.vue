<template>
    <div class="app-main">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"> </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'appMain'
    }
</script>

<style lang="scss" scoped>
    .app-main {
        /* 50= navbar  50  tagviews 38*/
        min-height: calc(100vh - 88px);
        width: 100%;
        position: relative;
        background: #f8fafd;
    }
</style>
