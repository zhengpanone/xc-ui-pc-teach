<template>
  <div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#eee"
      text-color="#000"
      active-text-color="#000">
      <router-link class="mui-tab-item" :to="{path:'/course/manage/summary/'+this.courseId}">
      <el-menu-item index="1">课程首页</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/baseinfo/'+this.courseId}">
      <el-menu-item index="2">基本信息</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/picture/'+this.courseId}">
        <el-menu-item index="3">课程图片</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/marketinfo/'+this.courseId}">
      <el-menu-item index="4">课程营销</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/plan/'+this.courseId}">
      <el-menu-item index="5">课程计划</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/teacher/'+this.courseId}">
        <el-menu-item index="6">教师信息</el-menu-item>
      </router-link>
      <router-link class="mui-tab-item" :to="{path:'/course/manage/pub/'+this.courseId}">
        <el-menu-item index="7">发布课程</el-menu-item>
      </router-link>
    </el-menu>
    <router-view class="main"></router-view>
  </div>
</template>
<script>
  import * as courseApi from '../api/course';
  import utilApi from '../../../common/utils';
  export default {
    data() {
      return {
        activeIndex:'2',
        courseId:''
      }
    },
    methods: {

    },
    mounted(){

      //课程id
      this.courseId = this.$route.params.courseId

      console.log("courseId=" + this.courseId)
      //跳转到课程基本信息
      this.$router.push({ path: '/course/manage/baseinfo/'+this.courseId})

    }
  }
</script>
<style scoped>


</style>
