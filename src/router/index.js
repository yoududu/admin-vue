import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 引入组件   懒加载
const Login = () => import("@/views/Login/index.vue");
const LayOut = () => import("@/Layout/index.vue");

// home
const Home = () => import("@/views/Home/index");
// title
const Title = () => import("@/views/Title/index");
// chapter
const Chapter = () => import("@/views/Chapter/index");
// video
const Video = () => import("@/views/Video/index");
// model
const Model = () => import("@/views/Model/index");
// vip
const Vip = () => import("@/views/Vip/index");
// zfb
const ZfbOrder = () => import("@/views/ZfbOrder/index");
// wx
const WxOrder = () => import("@/views/WxOrder/index");
// logs
const Logs = () => import("@/views/Logs/index");
//个人主页
const PersonHome = () => import("@/views/PersonHome/index");
// 管理员
const AdminIstrator = () => import("@/views/AdminIstrator/index");
// 查询管理员
const AdminIstratorAdd = () => import("@/views/AdminIstrator/Add");
const routes = [
  {
    path:'/',
    component:LayOut,
    redirect:'/home',
    children:[
      {
        path:'home',
        component:Home,
        meta:{   //原信息
          title:'首页'
        }
      },
    ]
  },
  {
    path:'/title',
    component:LayOut,
    children:[
      {
        path:'',
        component:Title,
        meta:{   //原信息
          title:'大标题管理'
        }
      },
    ]
  },
  {
    path:'/chapter',
    component:LayOut,
    children:[
      {
        path:'',
        component:Chapter,
        meta:{   //原信息
          title:'章节管理'
        }
      },
    ]
  },
  {
    path:'/video',
    component:LayOut,
    children:[
      {
        path:'',
        component:Video,
        meta:{   //原信息
          title:'视频管理'
        }
      },
    ]
  },
  {
    path:'/model',
    component:LayOut,
    children:[
      {
        path:'',
        component:Model,
        meta:{   //原信息
          title:'模块管理'
        }
      },
    ]
  },
  {
    path:'/vip',
    component:LayOut,
    children:[
      {
        path:'',
        component:Vip,
        meta:{   //原信息
          title:'会员管理'
        }
      },
    ]
  },
  {
    path:'/zfborder',
    component:LayOut,
    children:[
      {
        path:'',
        component:ZfbOrder,
        meta:{   //原信息
          title:'支付宝订单'
        }
      },
    ]
  },
  {
    path:'/wxorder',
    component:LayOut,
    children:[
      {
        path:'',
        component:WxOrder,
        meta:{   //原信息
          title:'微信订单'
        }
      },
    ]
  },
  {
    path:'/logs',
    component:LayOut,
    children:[
      {
        path:'',
        component:Logs,
        meta:{   //原信息
          title:'登录日志'
        }
      },
    ]
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/administrator',
    component:LayOut,
    children:[
      {
        path:'index',
        component:AdminIstrator,
        meta:{   //原信息
          title:'查询管理员'
        },
      },
      {
        path:'add',
        component:AdminIstratorAdd,
        meta:{   //原信息
          title:'新增管理员'
        },
      },
    ]
  },
  {
    path:'/personhome',
    component:LayOut,
    children:[
      {
        path:'',
        component:PersonHome,
        meta:{   //原信息
          title:'个人信息'
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
