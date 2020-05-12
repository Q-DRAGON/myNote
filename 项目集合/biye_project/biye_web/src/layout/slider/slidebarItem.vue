<template>
    <div v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
            <el-tooltip v-if="spread" class="item" effect="dark" :content="onlyOneChild.meta.title" placement="right">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta">
                    <i :class="onlyOneChild.meta && onlyOneChild.meta.icon"/>
                    <span>{{ onlyOneChild.meta.title}}</span>
                </el-menu-item>
            </el-tooltip>
            <el-menu-item :index="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta && !spread">
                <i :class="onlyOneChild.meta && onlyOneChild.meta.icon"/>
                <span>{{ onlyOneChild.meta.title}}</span>
            </el-menu-item>
        </template>

        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <div v-if="item.meta">
                    <i :class="item.meta && item.meta.icon"/>
                    <span>{{ item.meta.title}}</span>
                </div>
            </template>
            <slidebar-item
                v-for="child in item.children"
                :key="child.path"
                :item="child"
                :base-path="resolvePath(child.path)"></slidebar-item>
        </el-submenu>
    </div>
</template>

<script type="text/ecmascript-6">
    import path from 'path'
    import { isExternal } from '@/utils/validate'

    export default {
        name: 'slidebarItem',
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            basePath: {
                type: String,
                default: ''
            },
            spread: {
                type: Boolean,
            }
        },
        data() {
            this.onlyOneChild = null
            return {}
        },
        methods: {
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
