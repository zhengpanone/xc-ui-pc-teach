
import Home from '@/module/home/page/home.vue';
import course_list from '@/module/course/page/course_list.vue';
import course_add from '@/module/course/page/course_add.vue';
import course_manage from '@/module/course/page/course_manage.vue';
import course_summary from '@/module/course/page/course_manage/course_summary.vue';
import course_picture from '@/module/course/page/course_manage/course_picture.vue';
import course_baseinfo from '@/module/course/page/course_manage/course_baseinfo.vue';
import course_marketinfo from '@/module/course/page/course_manage/course_marketinfo.vue';
import course_teacher from '@/module/course/page/course_manage/course_teacher.vue';
import course_plan from '@/module/course/page/course_manage/course_plan.vue';
import course_pub from '@/module/course/page/course_manage/course_pub.vue';
export default [
  {
    path: '/course',
    component: Home,
    name: '课程管理',
    hidden: false,
    iconCls: 'el-icon-document',
    children: [
      { path: '/course/list', name: '我的课程', component: course_list, hidden: false },
      { path: '/course/add/base', name: '新增课程', component: course_add, hidden: true },
      // eslint-disable-next-line object-property-newline
      { path: '/course/manager/:courseId', name: '管理课程', component: course_manage, hidden: true,
        children: [
          { path: '/course/manage/plan/:courseId', name: '课程计划', component: course_plan, hidden: false },
          { path: '/course/manage/baseinfo/:courseId', name: '基本信息', component: course_baseinfo, hidden: false },
          { path: '/course/manage/picture/:courseId', name: '课程图片', component: course_picture, hidden: false },
          { path: '/course/manage/marketinfo/:courseId', name: '营销信息', component: course_marketinfo, hidden: false },

          { path: '/course/manage/teacher/:courseId', name: '教师信息', component: course_teacher, hidden: false},
          // eslint-disable-next-line standard/object-curly-even-spacing
          { path: '/course/manage/pub/:courseId', name: '发布课程', component: course_pub, hidden: false},
          { path: '/course/manage/summary/:courseId', name: '课程首页', component: course_summary, hidden: false }
        ]}
    ]
  }
]
