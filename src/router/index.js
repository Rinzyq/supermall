import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/home'
import Cart from '@/views/cart/cart'
import Category from '@/views/category/category'
import Profile from '@/views/profile/profile'

const routes = [
  {
    path: '/',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
