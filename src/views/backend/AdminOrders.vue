<template>
  <div class="text-dark">
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-ur5grgaunp">
        <div class="ldio-dwsbgiuamos">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </loading>

    <div>
      <div class="mt-5 lg">
        <div class="float-left">
          <h4 class="mt-3 font-weight-bold">
            <i class="fa fa-list-ol" aria-hidden="true"></i>
            訂單管理
          </h4>
        </div>
      </div>
      <table class="table lg table-striped table-bordered mt-4 text-dark">
        <thead>
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">付款狀態</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>
              {{ item.id }}
              <br />
              <i class="text-muted small">
                成立於:
                {{ new Date(item.create_at * 1000).toLocaleDateString() }}
              </i>
            </td>
            <td :class="{ 'text-muted': !item.is_paid }">
              {{ item.total | numFormat | dollarSign }} /
              <b v-if="item.is_paid"> 已付款</b>
              <i v-else> 未付款</i>
            </td>
            <td>
              <button
                class="btn btn-dark btn-sm"
                @click="openModal(item)"
              >查看購買項目</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="sm">
      <div class="float-left">
        <h5 class="mb-3 font-weight-bold">
          <i class="fa fa-list-ol"></i>
          訂單管理
        </h5>
      </div>
      <table class="table table-striped table-bordered text-dark">
        <thead>
          <tr>
            <th scope="col">訂單編號 - click to see more</th>
            <th scope="col">付款狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>
              <button
                @click="openModal(item)"
                class="btn btn-sm btn-outline-dark border-0"
              >
                {{ item.id }}
              </button>
            </td>
            <td
              class="text-dark"
              :class="{ 'text-muted': item.is_paid === false }"
            >
              <span v-if="item.is_paid">☑️ 已付款</span>
              <span v-else>✖️ 未付款</span>
              <br />
              {{ item.total | numFormat | dollarSign }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pages="pagination" @event="getOrders"></Pagination>

    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>訂單明細</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-10 mx-auto my-2">
                <div class="text-muted">訂單編號:</div>
                <div>{{ order.id }}</div>
              </div>
              <div class="col-10 mx-auto my-2">
                <div class="text-muted">成立時間:</div>
                <i>
                  {{ new Date(order.create_at * 1000).toLocaleDateString() }}
                </i>
              </div>
              <div class="col-12 my-2">
                <div class="text-muted">購買清單:</div>
                <div
                  class="w-75 mx-auto"
                  v-for="product in order.products"
                  :key="product.id"
                >
                  {{ product.product.title }}
                  {{ product.product.price | numFormat | dollarSign }} x
                  {{ product.qty }}{{ product.product.unit }}
                </div>
              </div>
              <div class="col-10 mx-auto my-2">
                <div class="text-muted">付款狀態:</div>
                <div
                  class="text-dark"
                  :class="{ 'text-muted': order.is_paid === false }"
                >
                  <b v-if="order.is_paid">已付款</b>
                  <i v-else>未付款</i>
                  {{ order.total | numFormat | dollarSign }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import $ from 'jquery'

export default {
  data () {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      order: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/orders?page=${page}`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.orders = res.data.orders
          vm.pagination = res.data.pagination
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    copy (e) {
      e.currentTarget.select()
      document.execCommand('Copy')
      this.$bus.$emit('message:push', '複製成功', 'dark')
    },
    openModal (item) {
      this.order = item
      $('#orderModal').modal('show')
    }
  },
  created () {
    this.getOrders()
  },
  components: {
    Pagination
  }
}
</script>

<style scoped>
.input {
  border: 0;
  background: transparent;
}
</style>
