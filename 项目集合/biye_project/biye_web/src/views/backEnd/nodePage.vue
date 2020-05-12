<template>
  <div>
    <el-row class="headerWrapper">
      <div class="title">Node.js 前端学习</div>
      <div class="content">
        NodeJS 学习路径中将通过使用 NodeJS 实现博客、在线笔记、爬虫、即时搜索、漂流瓶、端口扫描器等应用，学习并实践 NodeJS 编程基础和Web 应用开发等技术。完成本路径的所有实验课，将能够使用 NodeJS 独立实现 Web 应用程序。
      </div>
    </el-row>
    <div class="contentWrapper">
      <el-row class="contentBox" v-for="(type, index) in webData" :key="index">
        <div class="title">
          <span class="line hidden-xs"></span>
          <span class="text">{{ type[0].type }}</span>
          <span class="line hidden-xs"></span>
        </div>
        <el-row class="itemBox" v-for="(val, jndex) in space3(type)" :key="jndex">
          <el-col :span="8" v-if="val" class="item">
            <div class="itemContainer">
              <img v-lazy="val.img" alt="">
              <div class="title" ref="title">{{ val.title }}</div>
              <div class="footer">
                <i class="el-icon-user-solid"></i>
                <span class="follower">{{ val.follow }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-if="getItem(val, 1, type)" class="item">
            <div class="itemContainer">
              <img v-lazy="getItem(val, 1, type).img" alt="">
              <div class="title">{{ getItem(val, 1, type).title }}</div>
              <div class="footer">
                <i class="el-icon-user-solid"></i>
                <span class="follower">{{ getItem(val, 1, type).follow }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-if="getItem(val, 2, type)" class="item">
            <div class="itemContainer">
              <img v-lazy="getItem(val, 2, type).img" alt="">
              <div class="title">{{ getItem(val, 2, type).title }}</div>
              <div class="footer">
                <i class="el-icon-user-solid"></i>
                <span class="follower">{{ getItem(val, 2, type).follow }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const nodeData = require('@/mock/nodeJs.json')

  export default {
    data() {
      return {
        webData: nodeData,
      }
    },
    computed: {
    },
    mounted() {
      this.overflowed()
    },
    methods: {
      space3(arr) {
        let r = arr.filter((item, index) => index % 3 === 0)
        return r
      },
      getItem(val, i, arr) {
        let index = arr.indexOf(val);
        if (arr[index + i]) {
          return arr[index + i]
        }
        return false
      },
      overflowed() {
        this.$nextTick(() => {
          let titles = this.$refs.title
          titles.forEach(title => {
            let cHeight = title.clientWidth
            let sHeight = title.scrollWidth
            if (sHeight > cHeight) {
              title.setAttribute('title', title.innerText)
            }
          })
          return false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin mt($n) {
    margin-top: $n;
  }
  @mixin mb($n) {
    margin-bottom: $n;
  }
  @mixin ml($n) {
    margin-left: $n;
  }
  @mixin mr($n) {
    margin-right: $n;
  }

  @mixin cMargin($mt, $mb) {
    @include mt($mt);
    @include mb($mb);
    @include mr(21px);
    @include ml(21px);
  }

  .headerWrapper {
    @include cMargin(10px, 20px);
    height: 250px;
    background-color: #47cfae;
    background-image: url(https://doc.shiyanlou.com/document-uid168344labid3093timestamp1499759396348.png);
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
    border-radius: 2px;
    .title {
      font-size: 30px;
      margin-top: 50px;
      margin-bottom: 40px;
      padding: 0 15px;
    }
    .content {
      padding: 0 15px;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .contentWrapper {
    @include cMargin(10px, 20px);
    .contentBox {
      box-sizing: border-box;
      & + .contentBox {
        margin-top: 20px;
      }
      background-color: #fff;
      border-radius: 2px;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        color: #787878;
        .line {
          width: 15%;
          display: inline-block;
          border-top: 1px solid #ccc;
        }
        .text {
          margin: 0 10px;
        }
      }
    }
  }

  .contentWrapper .contentBox {
    .itemBox {
      margin-bottom: 20px;
      padding: 0 15px;
      .item {
        .itemContainer {
          margin: 0 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
          border-radius: 5px;
          &:hover {
            cursor: pointer;
            z-index: 5;
            box-shadow: 2px 2px 2px 1px rgba(0, 128, 128, 0.18);
            transition: background-color 1s, opacity 1s;
          }
          img {
            width: 100%;
            height: 150px;
          }
          .title {
            padding-left: 10px;
            display: block;
            color: #666;
            font-size: 16px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .footer {
            padding-left: 10px;
            padding-bottom: 8px;
            .el-icon-user-solid {
              color: #9b9da2;
              margin-right: 8px;
            }
            .follower {
              font-size: 12px;
              color: #9b9da2;
            }
          }
        }
      }
    }
  }
</style>
