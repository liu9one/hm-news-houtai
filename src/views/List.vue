<template>
  <div class="List">
    <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 文章列表显示表格 -->
<el-card class="box-card">

 <el-table
 stripe
 border
      :data="post"
      style="width: 100%">
      <el-table-column
        type="index"
        :index='indexMethod'
        label="序号"
        width="70"
        align='center'
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align='center'
        >
      </el-table-column>
      <el-table-column
      align='center'
        prop="user.nickname"
        label="作者"
        >
      </el-table-column>
      <el-table-column
      align='center'
        prop="create_date"
        label="创建时间">
        <!-- 使用到作用域插槽 要把数据传到插槽使用v-slot='scope' -->
        <template v-slot="scope">
          {{scope.row.user.create_date | time}}
        </template>
      </el-table-column>
      <el-table-column
      align='center'
        prop="cover[0].url"
        label="封面">
        <!-- 使用到作用域插槽 要把数据传到插槽使用v-slot='scope' -->
        <template v-slot="scope">
          <img :src="$url(scope.row.cover[0].url)" alt="">
        </template>
      </el-table-column>
      <el-table-column
      align='center'
        prop="create_date"
        label="操作">
        <!-- 使用到作用域插槽 要把数据传到插槽使用v-slot='scope' -->
        <template >
          <el-button type="primary">编辑</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>

    <!-- 分页器的应用部分 -->
    <br>
       <el-pagination
       background
        @size-change="sizeChange"
       :page-sizes="[3, 6, 9, 12]"
       :current-page="pageIndex"
       :page-size="pageSize"
        @current-change="currentChange"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
</template>

<script>
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      post: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0
    }
  },
  methods: {
    async getList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.post = data
        this.total = total
        console.log(this.post)
      }
    },
    indexMethod (index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },
    currentChange (val) {
      this.pageIndex = val
      this.getList()
    },
    sizeChange (val) {
      console.log(val)
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
.el-breadcrumb{
  margin-bottom: 25px;
}
.el-table{
   img{
    width: 210px;
    height: 120px;
    object-fit: cover;
  }
}
</style>
