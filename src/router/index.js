import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import memberSheetsRoutes from './member-sheets';
import employeeSheetsRoutes from './employee-sheets';
Vue.use(VueRouter)

const routes = [
  ...memberSheetsRoutes,
  ...employeeSheetsRoutes,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/participant',
    name: 'Participant',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Participant.vue')
  },
  {
    path: '/participant/:id',
    name: 'EditParticipant',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/EditParticipant.vue')
  },
  
  {
    path: '/reciptianist',
    name: 'Reciptianist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Receptionests.vue')
  },
  {
    path: '/sales',
    name: 'Sales',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Sales.vue')
  },
  {
    path: '/alerts',
    name: 'Alerts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Alerts.vue')
  },
  {
    path: '/printsheets',
    name: 'PrintSheet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/PrintSheet.vue')
  },
  {
    path: '/payments',
    name: 'Payments',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Payments.vue')
  },
  {
    path: '/recent-history',
    name: 'RecentHistory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/RecentHistory.vue')
  },
  {
    path: '/offers',
    name: 'Offers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Offers.vue')
  },
  {
    path: '/memberships',
    name: 'Memberships',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Membership.vue')
  },
  {
    path: '/add-reciptianist',
    name: 'AddReciptianist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AddReciptianist.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/add-sales',
    name: 'AddSales',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AddSales.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/add-participant',
    name: 'AddParticipant',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AddParticipant.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/payment-history/:id',
    name: 'UserPaymentHistory',
    component: () => import('../views/UserPaymentHistory')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import('../views/Schedual.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/payments/:id',
    name: 'GetPaymentsMembership',
    component: () => import('../views/GetPaymentsMembership.vue')
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: () => import('../views/EditUser.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/edit-receptionests/:id',
    name: 'EditReceptionest',
    component: () => import('../views/EditReceptionest.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/edit-sales/:id',
    name: 'EditSales',
    component: () => import('../views/EditSales.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/edit-trainee/:id',
    name: 'EditTrainee',
    component: () => import('../views/EditTrinee.vue'),
    
  },

  

  
  {
    path: '/trainees',
    name: 'Trainees',
    component: () => import('../views/Trainees.vue')
  },
  {
    path: '/print-invoice/:id',
    name: 'printInvoice',
    component: () => import('../views/PrintInvoice.vue')
  },

  {
    path: '/session/:id',
    name: 'Session',
    component: () => import('../views/SingleSession.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/add-membership',
    name: 'AddMembership',
    component: () => import('../views/AddMembership'),
    
  },
  {
    path: '/expenses',
    name: 'AllExpense',
    component: () => import('../views/AllExpense')
  },
  

  
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  },
  
  {
    path: '/add-trainer',
    name: 'AddTrainer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AddTrainer.vue'),
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("OxfitGymUser")).role != 'admin') next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/complaint',
    name: 'Complaint',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Complaint.vue')
  },
  {
    path: '/trainers',
    name: 'Trainers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Trainers.vue')
  },
  {
    path:'*',
    redirect: '/'
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
