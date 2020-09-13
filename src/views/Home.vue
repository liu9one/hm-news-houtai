<template>
  <div class="home">
      <el-container>
  <el-aside width="200px">
    <div class="logo">
      黑马News
    </div>
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      router
     >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>

  </el-aside>
  <el-container>
    <el-header>
      <div class="user">
        <div class="avatar">
          <img :src=" $base + user.head_img " alt="">
        </div>
        <span>{{user.nickname}}</span>
        <a href="#" @click.prevent='logout'>退出</a>
      </div>
    </el-header>
    <el-main>
     <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        console.log(this.user)
      }
    },
    async logout () {
      try {
        await this.$confirm('您确定要退出账号吗?', '提示', {
          type: 'warning'
        })
      } catch {
        return this.$message.info('取消操作')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$message.success('退出成功')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='scss' scoped>
.home{
  height: 100%;
  .el-container{
  height: 100%;
}
}
.el-aside{

  background-color: rgb(71, 76, 81);
  .logo {
    width: 200px;
    height: 60px;
    background-color: #333333;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
  }
}
.el-header{
  background-color: rgb(143, 155, 172);
  .user{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 50px;
    span{
      margin-right: 10px;
      font-size: 14px;
    }
    a{
      text-decoration: none;
      color: rgb(199, 188, 188);
      font-size: 14px;
    }
    .avatar{
       display: flex;
    align-items: center;
    margin-right: 10px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }
}
.el-main {
  background-color: rgb(233, 238, 243);
}
</style>
