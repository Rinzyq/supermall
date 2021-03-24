import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/home'
import Cart from 'views/cart/cart'
import Category from 'views/category/category'
import Profile from 'views/profile/profile'
import Detail from "views/detail/detail"

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path:"/detail/:id",
    name:"Detail",
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
