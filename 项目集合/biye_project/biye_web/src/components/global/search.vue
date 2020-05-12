<template>
    <div class="header-search" :class="{'show':show}">
        <i class="el-icon-search" @click.stop="click"></i>
        <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="Search"
            class="header-search-select"
            @change="change">
            <el-option v-for="item in options" :key="item.path"
                       :value="item" :label="item.title.join(' > ')"></el-option>
        </el-select>
    </div>
</template>

<script type="text/ecmascript-6">
    // fuse is a lightweight fuzzy-search module (模糊查询)
    // make search results more in line with expectations
    // https://www.open-open.com/lib/view/open1358403883809.html
    import Fuse from 'fuse.js'
    import path from 'path'

    export default {
        name: 'search',
        data() {
            return {
                search: '',
                options: [],
                searchPool: [],
                show: false,
                fuse: undefined,
            }
        },
        computed: {
            routes() {
                return this.$store.getters.permission_routes
            }
        },
        watch: {
            routes() {
                this.searchPool = this.generateRoutes(this.routes)
            },
            searchPool(list) {
                this.initFuse(list)
            },
            show(value) {
                if (value) {
                    document.body.addEventListener('click', this.close)
                } else {
                    document.body.removeEventListener('click', this.close)
                }
            }
        },
        mounted() {
            this.searchPool = this.generateRoutes(this.routes)
        },
        methods: {
            click() {
                this.show = !this.show
                if (this.show) {
                    this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
                }
            },
            close() {
                this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
                this.options = []
                this.show = false
            },
            change(val) {
              this.$router.push(val.path)
              this.search = ''
              this.options = []
              this.$nextTick(() => {
                  this.show = false
              })
            },
            initFuse(list) {
                this.fuse = new Fuse(list, {
                    shouldSort: true, // 是否按分数对结果列表排序
                    threshold: 0.4, // 匹配算法阈值。阈值为0.0需要完全匹配（字母和位置），阈值为1.0将匹配任何内容。
                    location: 0, // 确定文本中预期找到的模式的大致位置。
                    /**
                     * 确定匹配与模糊位置（由位置指定）的距离。一个精确的字母匹配，即距离模糊位置很远的字符将被视为完全不匹配。
                     *  距离为0要求匹配位于指定的准确位置，距离为1000则要求完全匹配位于使用阈值0.8找到的位置的800个字符以内。
                     */
                    distance: 100,
                    maxPatternLength: 32, // 模式的最大长度
                    minMatchCharLength: 1, // 模式的最小字符长度
                    keys: [{
                        name: 'title',
                        weight: 0.7
                    }, {
                        name: 'path',
                        weight: 0.3
                    }]
                })
            },
            // Filter out the routes that can be displayed in the sidebar
            // And generate the internationalized title
            generateRoutes(routes, basePath = '/', prefixTitle = []) {
                let res = []

                for (const router of routes) {
                    // skip hidden router
                    if (router.hidden) { continue }

                    const data = {
                        path: path.resolve(basePath, router.path),
                        title: [...prefixTitle]
                    }

                    if (router.meta && router.meta.title) {
                        data.title = [...data.title, router.meta.title]

                        if (router.redirect !== 'noRedirect') {
                            // only push the routes with title
                            // special case: need to exclude parent router without redirect
                            res.push(data)
                        }
                    }

                    // recursive child routes
                    if (router.children) {
                        const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
                        if (tempRoutes.length >= 1) {
                            res = [...res, ...tempRoutes]
                        }
                    }
                }
                return res
            },
            querySearch(query) {
                if (query !== '') {
                    this.options = this.fuse.search(query)
                } else {
                    this.options = []
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header-search {
        font-size: 0 !important;

        .el-icon-search {
            cursor: pointer;
            font-size: 18px;
            vertical-align: middle;
        }

        .header-search-select {
            font-size: 18px;
            transition: width 0.2s;
            width: 0;
            overflow: hidden;
            background: transparent;
            border-radius: 0;
            display: inline-block;
            vertical-align: middle;

            /deep/ .el-input__inner {
                border-radius: 0;
                border: 0;
                padding-left: 0;
                padding-right: 0;
                box-shadow: none !important;
                border-bottom: 1px solid #d9d9d9;
                vertical-align: middle;
            }
        }

        &.show {
            .header-search-select {
                width: 210px;
                margin-left: 10px;
            }
        }
    }
</style>
