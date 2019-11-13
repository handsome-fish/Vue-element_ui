<template>
  <div class="back">
    <div class="demo-image"><el-image alt="logo" :src="logo" style="width: 900px; height: 350px"></el-image></div>
    <div class="loginMode">
      <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm login-page" >
<!--        <el-col class="title">系统登录</el-col>-->
        <el-form-item prop="name">
          <el-col :span="8">
            <el-input id="name" v-model="userForm.name" placeholder="请输入用户名">
              <template slot="prepend">用户名</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="password">
          <el-col :span="8">
            <el-input id="password" v-model="userForm.password" type="password" show-password placeholder="请输入密码">
              <template slot="prepend">密码</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="8">
            <el-button id="login" v-on:click="login" style="width:100%" type="primary">登录</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {login} from "../api/user";
    import logo from "../assets/images/logo.jpg"
    export default {
        data(){
            // 规则，用于前端验证用户名是否合法
            const validateUserName = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入用户名'))
                }
                else if(value.length > 16){
                    callback(new Error('用户名不大于16个字符'))
                }
                else {
                    callback()
                }
            }
            return{
                logo,
                userForm:{
                    name: undefined,
                    password: undefined
                },
                rules:{
                    name: [
                        {validator: validateUserName, trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: "blur" },
                        { min: 3, max: 12, message: '密码由3-12位的字母数字下划线组成', trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            login(){
                // 前端设置规则验证，只有前端规则验证通过才会向后端发送请求
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        login(this.userForm).then(res=> {
                            if(res === 1){
                                this.$message({
                                    message: '登录成功，欢迎您' + this.userForm.name,
                                    type: 'success',
                                    center: true
                                });
                                // alert('欢迎您：' + this.userForm.name)
                            }
                            else if(res === 0){
                                this.$message({
                                    message: '该用户不存在',
                                    type: 'error',
                                    center: true
                                });
                            }
                            else {
                                this.$message({
                                    message: '用户名或密码错误',
                                    type: 'error',
                                    center: true
                                });
                            }
                        })
                    } else {
                        this.$message({
                            message: '登录失败,请填写完整登录信息',
                            type: 'error',
                            center: true
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
  .loginMode{
    margin-left: 35%;
    margin-top: 6%;
  }
  .back{
    background: #1B253A url("../assets/images/back.jpg") no-repeat;
    width: calc(100vw);
    height: calc(100vh);
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
</style>
