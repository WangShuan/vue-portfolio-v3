import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/frontend/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: '拼圖迷 - 進口拼圖專賣店'
  },
  children: [{
    path: 'about',
    name: 'About',
    component: () => import('../views/frontend/About.vue'),
    meta: {
      title: '拼圖迷 - 關於我們'
    }
  },
  {
    path: 'cart',
    name: 'Cart',
    component: () => import('../views/frontend/Cart.vue'),
    meta: {
      title: '拼圖迷 - 購物車'
    }
  },
  {
    path: 'products/:category',
    name: 'Products',
    component: () => import('../views/frontend/Products.vue'),
    meta: {
      title: '拼圖迷 - 產品列表'
    }
  },
  {
    path: 'product/:id',
    name: 'Product',
    component: () => import('../views/frontend/Product.vue'),
    meta: {
      title: '拼圖迷 - 產品內容'
    }
  },
  {
    path: 'login',
    name: 'Login',
    component: () => import('../views/frontend/Login.vue'),
    meta: {
      title: '拼圖迷 - 後台管理登入'
    }
  },
  {
    path: 'coupon',
    name: 'Coupons',
    component: () => import('../views/frontend/Coupons.vue'),
    meta: {
      title: '拼圖迷 - 優惠券專區'
    }
  },
  {
    path: 'checkout/:orderId',
    name: 'Checkout',
    component: () => import('../views/frontend/Checkout.vue'),
    meta: {
      title: '拼圖迷 - 結帳'
    }
  },
  {
    path: 'like',
    name: 'Like',
    component: () => import('../views/frontend/Like.vue'),
    meta: {
      title: '拼圖迷 - 喜好項目'
    }
  }
  ]
},
{
  path: '/admin',
  name: 'Dashboard',
  component: () => import('../components/Dashboard.vue'),
  meta: {
    requiresAuth: true
  },
  children: [{
    path: 'products',
    name: 'AdminProducts',
    component: () => import('../views/backend/AdminProducts.vue'),
    meta: {
      requiresAuth: true,
      title: '拼圖迷 - 產品管理'
    }
  }, {
    path: 'orders',
    name: 'AdminOrders',
    component: () => import('../views/backend/AdminOrders.vue'),
    meta: {
      requiresAuth: true,
      title: '拼圖迷 - 訂單管理'
    }
  }, {
    path: 'coupons',
    name: 'AdminCoupons',
    component: () => import('../views/backend/AdminCoupons.vue'),
    meta: {
      requiresAuth: true,
      title: '拼圖迷 - 優惠券管理'
    }
  }]
},
{
  path: '/test',
  component: () => import('../components/Dashboard.vue'),
  children: [{
    path: 'test_orders',
    name: 'TestOrders',
    component: () => import('../views/backend/TestOrders.vue'),
    meta: {
      title: '拼圖迷 - 模擬訂單'
    }
  },
  {
    path: 'test_checkout/:orderId',
    name: 'TestCheckout',
    component: () => import('../views/backend/TestCheckout.vue'),
    meta: {
      title: '拼圖迷 - 模擬結帳'
    }
  }
  ]
},
{
  path: '*',
  redirect: '/',
  meta: {
    title: '拼圖迷 - 進口拼圖專賣店'
  }
}
]

const router = new VueRouter({
  routes
})

export default router
