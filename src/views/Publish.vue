<template>
  <div class="publish">
<!-- 面包屑导航 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章管理</el-breadcrumb-item>
</el-breadcrumb>

<!-- 发布新文章表单 -->
<el-card class="box-card">
<el-form ref="form" :model="form" >
  <el-form-item label="文章标题:" label-width="80px" >
    <el-input v-model="form.title"  placeholder="请输入文章标题"></el-input>
  </el-form-item>
  <el-form-item label="文章内容:" label-width="80px" >
    <quill-editor v-model="form.content"></quill-editor>
  </el-form-item>
 <el-form-item label="栏目" label-width="80px">
<el-checkbox-group v-model="form.categories">
            <el-checkbox
              :label="item.id"
              name="type"
              v-for="item in tabList"
              :key="item.id"
            >
              {{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
  </el-form-item>
  <el-form-item label="封面" label-width="80px">
    <el-upload
  :action="$base + '/upload'"
  list-type="picture-card"
  :headers="headers"
  multiple
  :on-success='success'
  :on-remove="remove"
  >
  <i class="el-icon-plus"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="类型" label-width="80px">
    <el-radio v-model="form.type" :label="1">文章</el-radio>
  <el-radio v-model="form.type" :label="2">类型</el-radio>
  </el-form-item>
  <el-form-item label-width="80px
  ">
          <el-button type="primary" @click="publish">发布</el-button>
        </el-form-item>
</el-form>
</el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getTabList()
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: ''
      },
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      // console.log(res)
      if (statusCode === 200) {
        this.tabList = data.filter(item => item.name !== '关注' && item.name !== '头条')
        console.log(this.tabList)
      }
    },
    success (res, file, fileList) {
      // console.log(res, file, fileList)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.form.cover.push(data)
        // console.log(this.form.cover)
      }
    },
    remove (file, fileList) {
      console.log('file', file)
      // console.log('fileList', fileList)
      this.form.cover = this.form.cover.filter(item => item.id !== file.response.data.id)
      console.log(this.form.cover)
    },
    parseCategories (arr) {
      return arr.map(item => ({ id: item }))
    },
    async publish () {
      const res = await this.$axios.post('/post', {
        ...this.form,
        categories: this.parseCategories(this.form.categories)
      })
      console.log(res)
      this.$router.push('/')
    }
  }
}
</script>

<style lang='scss' scoped>
.el-breadcrumb{
  margin-bottom: 25px;
}

</style>
