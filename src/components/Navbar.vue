<template>
  <div>
    <loading :active.sync="isLoading">
      <h4>登出中 請稍候...</h4>
    </loading>

    <nav
      class="navbar lg navbar-dark fixed-top bg-secondary flex-md-nowrap p-0 shadow"
    >
      <router-link
        class="navbar-brand col-md-3 text-white col-lg-2 mr-0 font-weight-bold"
        to="/"
      >
        <i class="fa fa-cog" aria-hidden="true"></i>
        拼圖迷後台管理
      </router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a
            class="nav-link text-light font-weight-bold"
            href="#"
            @click.prevent="signout"
          >
            登出
          </a>
        </li>
      </ul>
    </nav>

    <div class="sm">
      <div class="d-flex justify-content-between">
        <div class="navbar w-100 sm-header sm bg-secondary">
          <router-link class="h4 text-light float-left mt-2" to="/">
            <i class="fa fa-cog" aria-hidden="true"></i>
            拼圖迷後台管理
          </router-link>

          <div class="float-right" id="navbarSupportedContent">
            <a
              class="dropdown-toggle text-light"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              選單
            </a>
            <div class="dropdown-menu w-auto dropdown-menu-right">
              <router-link class="dropdown-item text-dark" to="/admin/products">
                <i class="fa-wrench fa" aria-hidden="true"></i>
                產品管理
              </router-link>
              <router-link class="dropdown-item text-dark" to="/admin/orders">
                <i class="fa fa-list-ol" aria-hidden="true"></i>
                訂單管理
              </router-link>
              <router-link class="dropdown-item text-dark" to="/admin/coupons">
                <i class="fa fa-ticket" aria-hidden="true"></i>
                優惠碼管理
              </router-link>
              <router-link
                class="dropdown-item text-dark"
                to="/test/test_orders"
              >
                <i class="fa fa-flask" aria-hidden="true"></i>
                模擬訂單功能
              </router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-dark" @click.prevent="signout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                登出
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    signout () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}logout`
      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.isLoading = false
          vm.$router.push('/login')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    }
  }
}
</script>
