import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '/src/layouts/default.vue'
import MainLayout from '/src/layouts/main.vue'

const routes = [
  {
    path: '/',
    name: 'Default',
    component: MainLayout,
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
      },
    ]
  },
  {
    path: '/App',
    name: 'App',
    component: DefaultLayout,
    redirect: '/App/department',
    children: [
      {
        path: '/App/ticket',
        name: 'ticket',
        component: () => import('../views/ticket.vue')
      },
      {
        path: '/App/department',
        name: 'department',
        component: () => import('../views/department.vue')
      },
      {
        path: '/App/employee',
        name: 'employee',
        component: () => import('../views/employee.vue')
      },
      {
        path: '/App/user',
        name: 'user',
        component: () => import('../views/user.vue')
      },
      {
        path: '/App/role',
        name: 'role',
        component: () => import('../views/role.vue')
      },
      {
        path: '/App/permission',
        name: 'permission',
        component: () => import('../views/permission.vue')
      },
      {
        path: '/App/vehicle',
        name: 'vehicle',
        component: () => import('../views/vehicle.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
