<template>
    <div class="fullScreen">
        <i :class="isFullscreen?'icon-exit-fullscreen':'icon-fullscreen'" @click="click" />
    </div>
</template>

<script>
    import screenfull from 'screenfull'

    export default {
        name: 'Screenfull',
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        beforeDestroy() {
            this.destroy()
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
            },
            change() {
                this.isFullscreen = screenfull.isFullscreen
            },
            init() {
                if (screenfull.enabled) {
                    screenfull.on('change', this.change)
                }
            },
            destroy() {
                if (screenfull.enabled) {
                    screenfull.off('change', this.change)
                }
            }
        }
    }
</script>

<style scoped>
    .fullScreen > i {
        font-size: 18px;
    }
</style>
