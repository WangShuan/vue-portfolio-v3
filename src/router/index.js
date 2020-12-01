import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/frontend/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/frontend/Cart.vue')
      },
      {
        path: 'products/:category',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/frontend/Login.vue')
      },
      {
        path: 'coupon',
        name: 'Coupons',
        component: () => import('../views/frontend/Coupons.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue')
      },
      {
        path: 'like',
        name: 'Like',
        component: () => import('../views/frontend/Like.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/backend/AdminProducts.vue'),
        meta: { requiresAuth: true },
      }, {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/backend/AdminOrders.vue'),
        meta: { requiresAuth: true },
      }, {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/backend/AdminCoupons.vue'),
        meta: { requiresAuth: true },
      }
    ]
  },
  {
    path: '/test',
    component: () => import('../components/Dashboard.vue'),
    children: [
      {
        path: 'test_orders',
        name: 'TestOrders',
        component: () => import('../views/backend/TestOrders.vue'),
      },
      {
        path: 'test_checkout/:orderId',
        name: 'TestCheckout',
        component: () => import('../views/backend/TestCheckout.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
