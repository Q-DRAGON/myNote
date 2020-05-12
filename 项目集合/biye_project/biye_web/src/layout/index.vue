<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if="false" class="draw-bg" @click="handleClickOutside"></div>
        <sliderbar v-model="menuSpread" class="sidebar-container"></sliderbar>
        <div class="main-container">
            <navbar v-model="menuSpread"></navbar>
            <tags-view/>
            <app-main></app-main>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import AppMain from "./appMain";
    import Sliderbar from "./slider/sliderbar";
    import Navbar from "./header/navbar";
    import TagsView from "./header/TagsView/TagsView";
    export default {
        name: 'index',
        data() {
            return {
                menuSpread: true,
            }
        },
        computed: {
            classObj() {
                return {
                    hideSidebar: this.menuSpread,
                    openSidebar: !this.menuSpread,
                }
            }
        },
        methods: {
            handleClickOutside () {
                // close slidebar
            }
        },
        components: {TagsView, Navbar, Sliderbar, AppMain}
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/slidebar.scss";

    .app-wrapper {
        position: fixed;
        overflow: scroll;
        overflow-x: hidden;
        width: 100%;
        height: 100%;
    }
    /*蒙版*/
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
    .main-container {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: $sideBarWidth;
        position: relative;
    }
</style>
