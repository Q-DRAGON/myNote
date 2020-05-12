<template>
  <div class="app-main">
    <div class="homePage">
      <div class="pageContent">
        <div class="labelHeader">moock 平台</div>
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" required>
            <el-input  v-model.number="loginForm.password" size="mini"></el-input>
          </el-form-item>
<!--          <el-form-item label="角色" prop="role">-->
<!--            <el-input v-model="loginForm.role" size="mini"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small" class="btnSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          const pas = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{6,10}$/
          if (!pas.test(value)) {
            return callback(new Error('密码(必须包含字母和数字的组合，不能使用特殊字符，长度在 6-10 之间)'))
          }
          callback();
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: 'admin123',
          // role: 'admin',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
          ]
        },
      }
    },
    methods: {
      ...mapActions(['login']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login({
              data: this.loginForm
            }).then(res => {
              if (res.code === '0') {
                this.$router.push('/')
              } else {
                this.$message.warning(res.message)
              }
            })
          } else {
            this.$message.error('登录验证失败')
            return false
          }
        });
      },
    }
  }
</script>

<style class="scss" scoped>
  .app-main {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    font-size: 15px;
    color: #1a1a1a;
    background: #f6f6f6;
    -webkit-tap-highlight-color: rgba(26,26,26,0);
  }

  .homePage {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-image: url('../../assets/img/login/background.png');
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;
  }

  .pageContent {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    min-height: 688px;
    box-sizing: border-box;
  }

  .labelHeader {
    height: 80px;
    line-height: 80px;
    font-size: 40px;
    color: #1f82f6;
    font-family: "Adobe Hebrew"
  }

  .loginForm {
    box-sizing: border-box;
    padding-left: 25px;
    padding-top: 30px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(26,26,26,0.1);
    border-radius: 2px;
    width: 400px;
    overflow: hidden;
    text-align: center;
  }

  .el-form-item {
    width: 300px;
  }

  .el-input {
    width: 200px;
  }

  .btnSubmit {
    width: 200px;
  }
</style>
