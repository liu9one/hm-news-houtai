import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// const Home = () => ('../views/Home.vue')
// const Login = () => ('../views/Login.vue')
import List from '../views/List.vue'
import Publish from '../views/Publish.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      { path: '/', component: List },
      { path: '/publish', component: Publish }
    ]
  },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
