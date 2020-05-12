<template>
  <div>
    <el-row class="headerWrapper">
      <div class="title">web 前端学习</div>
      <div class="content">
        Web 前端学习路径中首先实践 HTML、CSS、JavaScript、CSS3、HTML5等基础知识，然后完成实现页面特效组件、网页游戏、Web应用等一系列项目，帮助你通过动手实践成长为合格的 Web 前端工程师。
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
              <div class="title">{{ val.title }}</div>
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
  const jsData = require('@/mock/javascript.json')

  export default {
    name: 'jsPage',
    data() {
      return {
        webData: jsData,
      }
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
    background-image: url(https://dn-simplecloud.shiyanlou.com/course/1552356130262_Stu-track-title-BG-V2_21.png);
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
