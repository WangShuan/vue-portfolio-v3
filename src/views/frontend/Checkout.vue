<template>
  <div v-if="order.id">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="container text-dark">
      <div class="my-3">
        <h4 class="my-3">結帳</h4>
        <form
          class="row justify-content-md-center"
          @submit.prevent="payOrder(times)"
        >
          <div class="col-lg-4 col-md-6" v-if="!order.is_paid">
            <div class="border p-3 mb-3">
              <h5 class="mb-4">
                <i class="fa fa-pencil" aria-hidden="true"></i> 訂單摘要
              </h5>
              <h6>
                <div class="float-left">小計：</div>
                <div class="float-right">NT$ {{ order.total | numFormat }}</div>
              </h6>
              <br />
              <h6>
                <div class="float-left">
                  運費
                  <i class="small text-muted">(週年慶 - 免運費)</i> ：
                </div>
                <div class="float-right">
                  <del class="text-secondary mr-2">NT$ 200</del> NT$ 0
                </div>
                <br />
              </h6>
              <h4
                class="mt-5 border-top py-3"
                :class="{ h5: order.final_total !== order.total }"
              >
                <div class="float-left">總計</div>
                <div class="float-right">NT$ {{ order.total | numFormat }}</div>
              </h4>
              <h3
                v-if="paymethods === '2' && order.is_paid"
                class="bg-dark text-light p-2 my-3"
              >
                請於三日內完成匯款🙏
              </h3>
              <h3
                v-else-if="paymethods === '1' && order.is_paid"
                class="bg-dark text-light p-2 my-3"
              >
                已完成結帳手續😊
              </h3>
            </div>
            <div class="border p-3">
              <h5 class="mb-3">
                <i class="fa fa-list-ol" aria-hidden="true"></i> 購物車內容
              </h5>
              <hr />
              <table class="table table-borderless text-dark">
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <th>
                      <img
                        class="cart-img"
                        :src="item.product.imageUrl"
                        :alt="item.product.title"
                      />
                    </th>
                    <td class="text-left">
                      <p>
                        {{ item.product.title }}
                        <br />
                        <span class="text-muted">
                          NT${{ item.product.price }}
                        </span>
                        x
                        {{ item.qty }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-8 col-md-6">
            <div class="p-2">
              <div class="row my-3 text-muted">
                <div class="col-4">1.確認資料</div>
                <div class="col-4">2.付款方式</div>
                <div class="col-4">3.完成</div>
              </div>
              <div class="progress mx-lg-5">
                <div class="progress-bar" :class="step"></div>
              </div>
              <div v-if="times === 1" class="my-3">
                <div class="border p-3 mx-lg-5">
                  <h5 class="my-3">收件人資料</h5>
                  <table class="table text-dark m-0">
                    <tbody>
                      <tr>
                        <th class="border-0" width="120">Email :</th>
                        <td class="border-0" width>{{ order.user.email }}</td>
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
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else-if="times === 2" class="my-3">
                <div class="border p-3 mx-lg-5">
                  <h5 class="my-3">付款方式</h5>
                  <div class="my-3">
                    <div class="custom-control custom-radio">
                      <input
                        id="getandpay"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required
                        value="1"
                        v-model="paymethods"
                      />
                      <label class="custom-control-label" for="getandpay">
                        取貨付款
                      </label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="transfer"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required
                        v-model="paymethods"
                        value="2"
                      />
                      <label class="custom-control-label" for="transfer">
                        銀行轉帳
                      </label>
                    </div>
                  </div>
                  <div class="bank" :class="{ 'd-none': paymethods === '1' }">
                    <p class="my-3">ATM 轉帳繳款資料如下</p>
                    <table class="table table-striped table-bordered text-dark">
                      <tbody>
                        <tr>
                          <th>◆ 銀行名稱：</th>
                          <td>012 台北富邦銀行</td>
                        </tr>
                        <tr>
                          <th>◆ 戶 名：</th>
                          <td>拼圖迷股份有限公司</td>
                        </tr>
                        <tr>
                          <th>◆ 帳 號：</th>
                          <td>123-321-123456-7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="my-3 px-lg-5 down" :class="{ 'd-none': times !== 3 }">
                <h3 v-if="order.is_paid" class="my-4 text-success">
                  ☑️ 結帳成功
                </h3>
                <table class="table table-striped text-dark m-0">
                  <tbody>
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
                      <th>
                        購買品項 :
                      </th>
                      <td>
                        <span v-for="item in order.products" :key="item.id">
                          {{ item.product.title }} x {{ item.qty }}
                          <br />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款方式 :</th>
                      <td v-if="paymethods === '1'">貨到付款</td>
                      <td v-else-if="paymethods === '2'">ATM 匯款</td>
                    </tr>
                    <tr>
                      <th>付款狀態 :</th>
                      <td
                        class="text-muted"
                        v-if="paymethods === '1' && order.is_paid"
                      >
                        已選擇貨到付款
                      </td>
                      <td
                        class="text-muted"
                        v-else-if="paymethods === '2' && order.is_paid"
                      >
                        已選擇ATM 匯款
                      </td>
                      <td class="text-muted" v-if="order.is_paid === false">
                        <i>等待付款中</i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button v-if="times !== 3" class="btn btn-dark my-3">
                下一步
              </button>
              <button
                v-if="times === 3"
                class="btn btn-dark my-3"
                @click="$router.push('/products/all')"
              >
                再去逛逛
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      order: {},
      orderId: "",
      isLoading: false,
      step: {
        "w-50": false,
        "w-100": false,
      },
      times: 1,
      paymethods: "1",
      card: {
        name: "",
        num: "",
        key: "",
        mm: "",
        yy: "",
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order/${vm.orderId}`;
      vm.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.order = res.data.order;
          if (vm.order.is_paid) {
            vm.times = 3;
            vm.step["w-100"] = true;
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    payOrder(times) {
      const vm = this;
      vm.isLoading = true;
      vm.times++;
      if (times === 1) {
        vm.step["w-50"] = true;
      } else if (times === 2) {
        vm.step["w-100"] = true;
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/pay/${vm.orderId}`;
        vm.$http.post(api).then((res) => {
          if (res.data.success) {
            vm.$bus.$emit("message:push", "結帳確認完成", "dark");
            vm.getOrder();
            $(".down").show();
          } else {
            vm.$bus.$emit("message:push", res.data.message, "danger");
          }
        });
      }
      vm.isLoading = false;
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
  watch: {
    paymethods: function() {
      const vm = this;
      if (vm.paymethods === "1") {
        $(".bank").hide();
      } else if (vm.paymethods === "2") {
        $(".bank").show();
      }
    },
  },
};
</script>

<style scoped>
.cart-img {
  width: 100px;
}

p {
  margin: 5px;
  font-size: 16px;
  line-height: 32px;
}
</style>
