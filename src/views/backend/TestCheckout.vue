<template>
  <div v-if="order.id">
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
    <div class="container mb-4 mt-md-5">
      <div>
        <h4 class="my-3">
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
          結帳確認
        </h4>
        <form class="row justify-content-md-center" @submit.prevent="payOrder">
          <div class="col-lg-7">
            <h5 class="my-3">購物車內容</h5>
            <table class="table table-striped table-bordered text-dark">
              <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle text-left">
                    {{ item.product.title }}
                  </td>
                  <td class="align-middle">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    {{ item.final_total | numFormat | dollarSign }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-right">總計</td>
                  <td class="text-right">
                    {{ order.total | numFormat | dollarSign }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="col-lg-5">
            <h5 class="my-3">收件人資料</h5>
            <div class="border list-bg p-3">
              <table class="table text-dark m-0">
                <tbody>
                  <tr>
                    <th class="border-0" width="120">Email :</th>
                    <td class="border-0">{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>姓名 :</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>收件人電話 :</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址 :</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態 :</th>
                    <td class="font-weight-bolder">
                      <i v-if="!order.is_paid" class="text-muted">尚未付款</i>
                      <span v-else class="text-dark">付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="order.is_paid === false">
              <button class="btn btn-dark my-3">確認付款</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {},
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order/${vm.orderId}`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.order = res.data.order
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/pay/${vm.orderId}`
      vm.$http.post(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.$bus.$emit('message:push', res.data.message, 'dark')
          vm.getOrder()
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
