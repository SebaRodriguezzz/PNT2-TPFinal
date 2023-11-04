import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HomeAdmin from '../views/InicioAdminView.vue'
import Alumnos from '../views/AlumnosView.vue'
import HomeAlumno from '../views/HomeAlumnoView.vue'
import HomeProfe from '../views/HomeProfeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    }
    ,
    {
      path: '/homeAdmin',
      name: 'homeadmin',
      component: HomeAdmin,
    }
    ,
    {
      path: '/alumnos',
      name: 'alumnos',
      component: Alumnos,
    }
    ,
    {
      path: '/alumno/inicio',
      name: 'inicio alumno',
      component: HomeAlumno,
    }
    ,
    {
      path: '/profe/inicio',
      name: 'inicio profe',
      component: HomeProfe,
    }
    
   
  ]
})

router.beforeEach( (to,from,next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if( to.matched.some(r => r.meta.RequireAuth) && !usuarioLog ) {
    next('/')
  }
  next()
})
  
export default router
