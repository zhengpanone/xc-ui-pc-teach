<template>
  <div>
    <el-button type="primary" @click="teachplayFormVisible = true">添加课程计划</el-button>
    <el-tree
      :data="teachplanList"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>

    <el-dialog title="添加课程计划" :visible.sync="teachplayFormVisible" >

      <el-form ref="teachplanForm"  :model="teachplanActive" label-width="140px" style="width:600px;" :rules="teachplanRules" >
        <el-form-item label="上级结点" >
          <el-select v-model="teachplanActive.parentId" placeholder="不填表示根结点">
            <el-option
              v-for="item in teachplanList"
              :key="item.id"
              :label="item.pName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="章节/课时名称" prop="pName">
          <el-input v-model="teachplanActive.pName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" >
          <el-radio-group v-model="teachplanActive.pType">
            <el-radio class="radio" label='1'>视频</el-radio>
            <el-radio class="radio" label='2'>文档</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学习时长（分钟）  请输入数字" >
          <el-input type="number" v-model="teachplanActive.timeLength" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="排序字段" >
          <el-input v-model="teachplanActive.orderBy" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="章节/课时介绍" prop="description">
          <el-input type="textarea" v-model="teachplanActive.description" ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="teachplanActive.status" >
            <el-radio class="radio" label="0" >未发布</el-radio>
            <el-radio class="radio" label='1'>已发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  >
          <el-button type="primary" v-on:click="addTeachplan">提交</el-button>
          <el-button type="primary" v-on:click="resetForm">重置</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <el-dialog title="选择媒资文件" :visible.sync="mediaFormVisible">
      <media-list v-bind:ischoose="true" @choosemedia="choosemedia"></media-list>
    </el-dialog>
  </div>
</template>
<script>
  let id = 1000;
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  import * as systemApi from '../../../../base/api/system';
  import mediaList from '@/module/media/page/media_list.vue';

  export default {
    components:{
      mediaList
    },
    data() {
      return {
        mediaFormVisible:false,
        teachplayFormVisible:false,//控制添加窗口是否显示
        teachplanList : [{
          id: 1,
          pName: '一级 1',
          children: [{
            id: 4,
            pName: '二级 1-1',
            children: [{
              id: 9,
              pName: '三级 1-1-1'
            }, {
              id: 10,
              pName: '三级 1-1-2'
            }]
          }]
        }],
        defaultProps:{
          children: 'children',
          label: 'pName'
        },
        teachplanRules: {
          pName: [
            {required: true, message: '请输入课程计划名称', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
        },
        teachplanActive:{},
        teachplanId:''
      }
    },
    methods: {
        //选择视频，打开窗口
      choosevideo(data){
          //得到当前的课程计划
          this.teachplanId = data.id
//        alert(this.teachplanId)
          this.mediaFormVisible = true;//打开窗口
      },
      //保存选择的视频
      choosemedia(mediaId,fileOriginalName,mediaUrl){
        //保存视频到课程计划表中
        let teachplanMedia ={}
        teachplanMedia.mediaId =mediaId;
        teachplanMedia.mediaFileOriginalName =fileOriginalName;
        teachplanMedia.mediaUrl =mediaUrl;
        teachplanMedia.courseId =this.courseId;
        //课程计划
        teachplanMedia.teachplanId=this.teachplanId

        courseApi.savemedia(teachplanMedia).then(res=>{
            if(res.success){
                this.$message.success("选择视频成功")
              //查询课程计划
              this.findTeachplan()
            }else{
              this.$message.error(res.message)
            }
        })
      },
      //提交课程计划
      addTeachplan(){
        //校验表单
        this.$refs.teachplanForm.validate((valid) => {
            if (valid) {
                //调用api方法
              //将课程id设置到teachplanActive
              this.teachplanActive.courseId = this.courseId
              courseApi.addTeachplan(this.teachplanActive).then(res=>{
                console.log(res)
                if(res.success){
                    this.$message.success("添加成功")
                    //刷新树
                    this.findTeachplan()
                }else{
                  this.$message.error(res.message)
                }

              })
            }
        })
      },
  //重置表单
      resetForm(){
        this.teachplanActive = {}
      },

      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);

      },
      edit(data){
        //alert(data.id);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);

      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.choosevideo(data) }>{data.mediaFileOriginalName}&nbsp;&nbsp;&nbsp;&nbsp; 选择视频</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.edit(data) }>修改</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      findTeachplan(){
        this.teachplanList = []
        //查询课程计划
        courseApi.findTeachplanList(this.courseId).then(res=>{
          
            if(res && res.code===200){
              this.teachplanList = res.data.children;
            }


        })
      }
    },
    mounted(){
      //课程id
      this.courseId = this.$route.params.courseId;
      //查询课程计划
      this.findTeachplan()

    }
  }
</script>
<style>

</style>
