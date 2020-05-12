<template>
  <div>
    <el-row class="toolWrapper">
      <button class="btn btnAdd" @click="addFormStatus=true">新增</button>
      <button class="btn btnDel" @click="handleMulDel">批量删除</button>
    </el-row>
    <el-row class="tableWrapper">
      <el-table
        :data="tableData"
        class="tableBox"
        style="width: 100%; border: solid 1px #d7dce3"
        header-row-class-name="_specialtableHeader"
        header-cell-class-name="_specialtableHeaderCell"
        :header-cell-style="{height: '36px !important'}"
        row-class-name="_specialtableRow"
        cell-class-name="_specialtableCell"
        stripe border highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column width="94" align="center" type="selection" :selectable='checkboxT'></el-table-column>
        <el-table-column label="用户id" align="center" width="100" prop="id"></el-table-column>
        <el-table-column label="用户名" prop="username" align="center" min-width="247"></el-table-column>
        <el-table-column label="角色" prop="role" align="center" min-width="277"></el-table-column>
        <el-table-column label="密码" align="center" min-width="204" prop="password"></el-table-column>
        <el-table-column label="操作" align="center" min-width="123">
          <template slot-scope="scope">
            <span><i class="el-icon-edit-outline iconEdit" @click="handleEdit(scope.row)" v-if="scope.row.id > 1"></i></span>
            <span><i class="el-icon-delete iconDel" @click="handleDel(scope.row)" v-if="scope.row.role !== 'admin'"></i></span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="新增用户"
               :visible.sync="addFormStatus"
               width="600" class="myDialogForm" @close="cancelAddForm">
      <el-form :model="addForm" :rules="addRules" ref="addruleForm" label-width="150px" size="mini">
        <el-form-item label="角色" prop="role">
          <el-input v-model="addForm.role" class="dialogItem"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" class="dialogItem"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" required="">
          <el-input v-model="addForm.password" class="dialogItem"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddForm">取消</el-button>
          <el-button type="primary" @click="handleAddForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户"
               :visible.sync="editFormStatus"
               width="600" class="myDialogForm" @close="cancelEditForm">
      <el-form :model="editForm" :rules="editRules" ref="editruleForm" label-width="150px" size="mini">
        <el-form-item label="角色" prop="role">
          <el-input v-model="editForm.role" class="dialogItem"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" class="dialogItem"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" required="">
          <el-input v-model="editForm.password" class="dialogItem"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEditForm">取消</el-button>
          <el-button type="primary" @click="handleEditForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'

  const itemIsNotIn = (item, arr) => {
    let status = true;
    arr.forEach(a => {
      if (item === a) {
        status = false;
      }
    });
    return status;
  };

  export default {
    name: 'permission',
    data() {
      const commonRule = {
        role: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let roles = ['user', 'admin']
              if (roles.indexOf(value) === -1) {
                callback(new Error('角色目前只能是user或者admin'))
              }
              return callback();
            },
            trigger: 'blur',
          }
        ],
        password: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              const pas = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{6,10}$/
              if (!pas.test(value)) {
                return callback(new Error('密码(必须包含字母和数字的组合，不能使用特殊字符，长度在 6-10 之间)'))
              }
              callback();
            }
          },
          trigger: 'blur',
        }],
      }
      return {
        multipleSelection: [],
        tableData: [],
        addFormStatus: false,
        editFormStatus: false,
        curEditUsername: '',
        curEidtUserId: null,
        editForm: {
          username: '',
          role: '',
          password: '',
        },
        addForm: {
          username: '',
          role: '',
          password: '',
        },
        addRules: {
          ...commonRule,
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let accounts = this.tableData.map(item => item.username);
                if (accounts.indexOf(value) !== -1) {
                  callback(new Error('用户名已存在'));
                }
                return callback();
              },
              trigger: 'change',
            }
          ],
        },
        editRules: {
          ...commonRule,
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let accounts = this.tableData.map(item => item.username);
                if (accounts.indexOf(value) !== -1 && this.curEditUsername !== value) {
                  callback(new Error('该用户名已被其他人选用'));
                }
                return callback();
              },
              trigger: 'blur',
            }
          ]
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapActions(['getAllUsers', 'userRegister', 'userEdit', 'userDelete', 'userDeletes']),
      async init() {
        this.getAllUsers({}).then(res => {
          if (res.code === '0') {
            this.tableData = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      checkboxT(row, rowIndex){
        if(row.role === 'admin'){
          return false;
        }else{
          return true;
        }
      },
      handleMulDel() {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择要删除的用户')
        } else {
          let ids = this.multipleSelection.map(item => item.id)
          this.userDeletes({
            data: {
              ids,
            }
          }).then(res => {
            if (res.code === '0') {
              this.$message.success('删除成功')
              this.init()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(data) {
        this.editForm.username = data.username
        this.editForm.role = data.role
        this.editForm.password = data.password
        this.curEditUsername = data.username
        this.curEidtUserId = data.id
        this.editFormStatus = true
      },
      handleDel(data) {
        let id = data.id
        this.userDelete({
          data: {id}
        }).then(res => {
          if (res.code === '0') {
            this.$message.success(res.message)
            this.init()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      cancelAddForm() {
        this.$refs.addruleForm.resetFields()
        this.addFormStatus = false
      },
      handleAddForm() {
        this.$refs.addruleForm.validate(valid => {
          if (valid) {
            this.userRegister({
              data: {
                ...this.addForm,
              }
            }).then(res => {
              if (res.code === '0') {
                this.$refs.addruleForm.resetFields();
                this.init()
              } else {
                this.$message.warning(res.message)
              }
            })
            this.addFormStatus = false;
          }
        });
      },
      cancelEditForm() {
        this.editFormStatus = false
      },
      handleEditForm() {
        this.$refs.editruleForm.validate(valid => {
          if (valid) {
            this.userEdit({
              data: {
                id: this.curEidtUserId,
                ...this.editForm,
              }
            }).then(res => {
              if (res.code === '0') {
                this.editFormStatus = false
                this.init()
              } else {
                this.$message.warning(res.message)
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toolWrapper {
    height: 58px;
    padding-right: 26px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn + .btn {
      margin-left: 12px;
    }

    .btn {
      width: 100px;
      height: 36px;
      box-sizing: border-box;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    }

    .btnAdd {
      border: solid 1px #00ab9d;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      letter-spacing: 1px;
      color: #00ab9d;
    }

    .btnDel {
      border: solid 1px #267dd5;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      letter-spacing: 1px;
      color: #2377d0;
    }
  }

  .tableWrapper {
    /deep/ .cell, .el-table--border th:first-child .cell {
      padding: 0 !important;
    }

    .iconDel {
      vertical-align: middle;
      font-family: FontAwesome5FreeSolid;
      font-size: 16px;
      color: #ff7070;
    }

    .iconEdit {
      margin-right: 10px;
      vertical-align: middle;
      font-family: FontAwesome5FreeSolid;
      font-size: 16px;
      color: #00ab9d;
    }
  }

  .myDialogForm {
    .dialogItem {
      width: 239px;
    }
    /deep/ .el-form-item__label {
      margin-right: 20px;
    }
    /deep/ .el-dialog__footer {
      text-align: center;
    }
  }
</style>
