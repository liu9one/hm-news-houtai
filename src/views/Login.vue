<template>
  <div class="login">
    <div class="title">
     Please Login
    </div>
    <div class="form" @keydown.enter="login" >
      <el-form  :model="user" ref="form" :rules="rules" class="user">
  <el-form-item prop="username" >
    <el-input v-model="user.username" clearable placeholder="User name"> </el-input>
  </el-form-item>
  <el-form-item  prop="password">
    <el-input v-model="user.password" show-password type="password" placeholder="Password" > </el-input>
  </el-form-item>
   <div class="check">
     <el-checkbox class="checked"  v-model="checked">记住密码?</el-checkbox>
     <span>Forgot Password?</span>
   </div>
   <el-form-item class="btns">
      <el-button class="button" @click="login" type="danger">登录</el-button>
      <el-button class="button" @click='reset' type="info">重置</el-button>
   </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
export default {
  // created () {
  //   this.checked = localStorage.getItem('checked')
  //   if (this.checked) {
  //     this.username = localStorage.getItem('username')
  //     this.password = localStorage.getItem('password')
  //   }
  // },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      checked: false,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { pattern: /^[a-z0-9A-Z]{5,11}$/, message: '用户名长度在 5 到 11 字母或数字', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { pattern: /^[a-z0-9A-Z]{3,12}$/, message: '密码长度在 3 到 12 字母或数字', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$refs.form.validate()
      } catch {
        return this.$message.error('密码或用户名不正确')
      }
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, data, message } = res.data
      console.log(res.data)
      if (statusCode === 200) {
        console.log(data)
        this.$message.success(message)
        // 存token
        // if (this.checked) {
        //   localStorage.setItem('checked', true)
        //   localStorage.setItem('username', this.username)
        //   localStorage.setItem('password', this.password)
        // }
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$router.push('/')
      } else {
        this.$message.error(message)
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}

</script>

<style lang='scss' scoped>
.login{
  position: relative;
  background: url('../assets/001.webp') no-repeat ;
  // background-size: cover;
  height: 100%;
}
.title{
  font-size: 60px;
  color: #ffffff;
  text-align: center;
  padding-top: 150px;
}
.form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  .check{
    // display: flex;
    // justify-content: space-around;
    font-size: 12px;
    color: #ffffff;
    height: 30px;
    .checked{
      float: left;
      font-size: 11px;
    color: #ffffff;
    }
    span{
     float: right;
    }
  }
  .btns{
    display: flex;
    justify-content: space-around;
    .button{
      width: 195px;
    }
  }
}
</style>
