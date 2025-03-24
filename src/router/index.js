import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/department',
    name: 'department',
    // component: () => import('../views/department.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import('../views/employee.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user.vue')
  },
  {
    path: '/role',
    name: 'role',
    // component: () => import('../views/department.vue')
  },
  {
    path: '/permission',
    name: 'permission',
    // component: () => import('../views/department.vue')
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    // component: () => import('../views/department.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
