<template>
    <div>
        <el-row class="headerContainer">
            <template>
                <el-carousel class="carousel" :interval="3000">
                    <el-carousel-item v-for="(item, index) in imagesGroup" :key="index">
                        <img :src="item" alt="" class="carouselImg">
                    </el-carousel-item>
                </el-carousel>
            </template>
        </el-row>
        <el-row class="labelHeader">
            欢迎来到微慕课平台，这是大家在这里留下的足迹。
        </el-row>
        <el-row class="contentWrapper">
            <el-table :data="postlist" class="tb"
                      style="width: 100%;"
                      :cell-style="{height: '44.4px !important', padding: '0 !important'}">
                <el-table-column width="100">
                    <template slot-scope="scope">
                        <div :class="['tag',
                       {'stag': scope.$index === 1},
                       {'sstag': scope.$index === 2},
                       {'ssstag': scope.$index >= 3}]">
                            {{scope.$index + 1}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="content" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <div class="value">
              <span :class="['val',
                       {'sval': scope.$index === 1},
                       {'ssval': scope.$index === 2},
                       {'sssval': scope.$index >= 3}]">
                      {{ scope.row.timestamp }}
              </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="paginationWrapper">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="postTotal"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="handlePageChange"
              class="pagination">
            </el-pagination>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapActions } from 'vuex'

    export default {
        name: 'index',
        data() {
          return {
              imagesGroup: [
                'https://img.mukewang.com/5e7dca9f00019ffc16000652.jpg',
                'https://img.mukewang.com/5e09596e000185c518720764.jpg',
                'https://img.mukewang.com/5e93cfe00001d27c18720764.jpg',
                'https://img.mukewang.com/5e9519320001f4b818720764.jpg',
              ],
              postlist: [],
              postTotal: 0,
              pageSize: 10,
              currentPage: 1
          }
        },
        created() {
            this.init()
        },
        methods: {
            ...mapActions(['explorePosts']),
            async init() {
                const res = await this.explorePosts({
                    data: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                })
                if (res.code === '0') {
                    this.postlist = res.data.pagePosts
                    this.postTotal = res.data.total
                } else {
                    this.$message.error(res.message)
                }
            },
            handlePageChange(val) {
                this.currentPage = val
                this.init()
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin border-npx($color, $n) {
        position: relative;
        &:after {
            content: '';
            position: absolute;
            bottom: $n;
            left: 0;
            width: 100%;
            border-top: $n solid $color;
        }
    }

    .headerContainer {
        position: relative;
        left: -1px;
        right: -1px;
        height: 330px;
        .carousel {
            box-sizing: border-box;
            padding: 20px 20px 0;
            height: 100%;
            width: 100%;
            margin: 0 auto;
            /deep/.el-carousel__container {
                height: 100%;
                width: 100%;
            }
            .carouselImg {
                height: 100%;
                width: 100%;
                background-size: cover;
                border-radius: 5px;
            }
        }
    }
    .labelHeader {
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 30px;
        color: #5a5e66;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 20px;
    }
    .contentWrapper {
        margin-bottom: 20px;
        /deep/ .el-table__header-wrapper {
            display: none;
        }

        /deep/ .el-table td, .el-table th.is-leaf {
            border-bottom: 1px dashed #B9CDE6;
        }

        /deep/ .el-table .el-table__row:last-child td {
            border-bottom: none;
        }

        .tb {
            .tag {
                width: 18px;
                height: 18px;
                line-height: 18px;
                background: #F382A6;
                border-radius: 50%;
                text-align: center;
                color: white;
            }

            .stag {
                @extend .tag;
                background: #FBB389;
            }

            .sstag {
                @extend .tag;
                background: #FFC985;
            }

            .ssstag {
                @extend .tag;
                background: #A3DAFF;
            }

            .value {
                font-family: PingFang SC;
                line-height: 20px;

                .val {
                    color: #F382A6;
                }

                .sval {
                    color: #FBB389;
                }

                .ssval {
                    color: #FFC985;
                }

                .sssval {
                    color: #333333;
                }
            }
        }
    }
    .paginationWrapper {
        display: flex;
        justify-content: center;
        padding-bottom: 50px;
        .pagination {
            margin-right: 20px;
        }
    }
</style>
