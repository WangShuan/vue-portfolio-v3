<template>
  <div>
    <nav class="col-md-3 col-lg-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>
            <i class="fa fa-user" aria-hidden="true"></i>
            管理員
          </span>
        </h6>
        <ul class="nav text-left ml-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <i class="fa fa-wrench" aria-hidden="true"></i>
              產品管理
            </router-link>
            <router-link class="nav-link" to="/admin/orders">
              <i class="fa fa-list-ol" aria-hidden="true"></i>
              訂單管理
            </router-link>
            <router-link class="nav-link" to="/admin/coupons">
              <i class="fa fa-ticket" aria-hidden="true"></i>
              優惠碼管理
            </router-link>
          </li>
        </ul>
        <hr />
        <h6
          class="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>
            <i class="fa fa-cogs" aria-hidden="true"></i>
            功能
          </span>
        </h6>
        <ul class="nav text-left ml-3">
          <li class="nav-item">
            <router-link class="nav-link" to="/test/test_orders">
              <i class="fa fa-flask" aria-hidden="true"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
