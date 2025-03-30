import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/department',
    name: 'department',
    component: () => import('../views/department.vue')
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
    component: () => import('../views/role.vue')
  },
  {
    path: '/permission',
    name: 'permission',
    component: () => import('../views/permission.vue')
  },
  {
    path: '/vehicle',
    name: 'vehicle',
    component: () => import('../views/vehicle.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
