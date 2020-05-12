<template>
  <div class="container">
    <el-row class="page-header">Hi, {{ username }}</el-row>
    <el-row class="formWrapper">
      <el-form ref="form" :model="postForm" label-width="80px" label-position="top">
        <el-form-item label="Say something">
          <el-input type="textarea" v-model="postForm.post"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="onSubmit" size="small">Submit</el-button>
        </el-form-item>
      </el-form>
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
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'directive',
    data() {
      return {
        postForm: {
          post: '',
        },
        postlist: [],
        postTotal: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    created() {
      this.init()
    },
    computed: {
      ...mapGetters(['username']),
      params() {
        return {
          content: this.postForm.post,
        }
      }
    },
    methods: {
      ...mapActions(['addPost', 'userPosts']),
      onSubmit() {
        this.addPost({
          data: this.params,
        }).then(res => {
          if (res.code === '0') {
            this.init()
          }
        })
      },
      async init() {
        const res = await this.userPosts({
          data: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          }
        })
        if (res.code == '0') {
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
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    border-top: $n solid $color;
  }

  @mixin border-ps-npx($color, $ps, $n) {
    position: relative;
    @if $ps == 'top' {
      &:before {
        @include border-npx($color, $n);
        top: $n;
      }
    } @else {
      &:after {
        @include border-npx($color, $n);
        bottom: $n;
      }
    }
  }

  .container {
    padding-right: 20px;
    padding-left: 20px;
    margin-right: auto;
    margin-left: auto;
  }

  .page-header {
    @include border-ps-npx(#eee, 'bottom', 1px);
    box-sizing: border-box;
    padding: 40px 0 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 36px;
  }

  .formWrapper {
    /deep/ .el-form-item__label {
      font-weight: bold;
    }
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
