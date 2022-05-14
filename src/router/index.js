import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/register.vue'
import EditBlog from '../views/EditBlog.vue'
import Index from '../views/Index.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogManage from '../views/BlogManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/editBlog',
    name: 'EditBlog',
    component: EditBlog
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/blogDetail',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blogManage',
    name: 'BlogManage',
    component: BlogManage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to, from, next) => {
  //定义需要拦截的路由
  const handleRouters = ['/', 'blogManage'];
  if (handleRouters.indexOf(to.path) !== -1) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({ path: '/login' })
    }
  }else {
    next()
  }
})

export default router
