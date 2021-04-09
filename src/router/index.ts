import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import jwt_decode from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ top: 500, behavior: 'smooth' })
      }, 3000)
    })
  }
})

interface MyToken {
  id: string
  role: string
  iat: string
  jti: number
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt')) {
      if (to.meta.salesman) {
        const jwtPayload = jwt_decode<MyToken>(
          localStorage.getItem('jwt') || ''
        )
        if (jwtPayload.role === 'salesman' || jwtPayload.role === 'owner')
          next()
        else next({ name: 'About' })
      } else if (to.meta.owner) {
        const jwtPayload = jwt_decode<MyToken>(
          localStorage.getItem('jwt') || ''
        )
        if (jwtPayload.role === 'owner') next()
        else next({ name: 'About' })
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt')) {
      const jwtPayload = jwt_decode<MyToken>(localStorage.getItem('jwt') || '')
      if (jwtPayload.role === 'salesman') next({ name: 'stufforders' })
      else if (jwtPayload.role === 'owner') next({ name: 'stufforders' })
      else next({ name: 'About' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
