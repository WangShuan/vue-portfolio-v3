<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="lg row">
      <div class="col-lg-7 mb-3" :class="{ 'col-lg-8': cart.total > 0 }">
        <h4 class="my-4 text-dark">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          購物車清單
        </h4>
        <div v-if="cart.total > 0">
          <table class="table table-striped table-bordered text-dark">
            <thead class="thead">
              <th>操作</th>
              <th>商品連結</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="delCart(item.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td class="align-middle">
                  <u>
                    <router-link
                      class="text-muted"
                      :to="`/product/${item.product.id}`"
                    >
                      {{ item.product.title }}
                    </router-link>
                  </u>
                  <div class="text-muted" v-if="finalTotal !== total">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle">
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click.prevent="lessQty(item.id)"
                    >
                      ﹣
                    </button>
                    <button class="btn btn-outline-secondary" disabled>
                      {{ item.qty }}
                    </button>
                    <button
                      @click.prevent="addQty(item.id)"
                      type="button"
                      class="btn btn-outline-secondary"
                    >
                      ﹢
                    </button>
                  </div>
                </td>
                <td class="align-middle text-right">
                  <del class="text-muted" v-if="finalTotal !== total">
                    {{ item.product.price | numFormat | dollarSign }}
                    /
                    {{ item.product.unit }}
                  </del>
                  <template v-else>
                    {{ item.product.price | numFormat | dollarSign }}
                    /
                    {{ item.product.unit }}
                  </template>
                  <div class="text-dark" v-if="finalTotal !== total">
                    折扣後
                    {{
                      ((item.product.price * cart.carts[0].coupon.percent) /
                        100)
                        | numFormat
                        | dollarSign
                    }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="input-group input-group-sm w-50">
            <input
              type="text"
              class="form-control"
              :placeholder="hint"
              v-model="couponCode"
            />
            <div class="input-group-append">
              <button
                class="btn btn-secondary font-weight-bold"
                type="button"
                @click="addCoupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
        <div v-if="cart.total === 0">
          <p class="lead mt-5">
            您的購物車沒有任何商品，
            <router-link to="/products/all" class="text-muted">
              回商品列表
            </router-link>
            選購。
          </p>
        </div>
      </div>
      <div
        class="col-lg-4 col-md-6 mt-md-5 mt-lg-0 mx-auto"
        v-if="cart.total > 0"
      >
        <h4 class="my-4">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          訂單摘要
        </h4>
        <div class="border p-3">
          <h6>
            <div class="float-left">小計：</div>
            <div class="float-right">NT$ {{ total }}</div>
          </h6>
          <h6 class="py-4">
            <div class="float-left">運費：</div>
            <del class="float-right text-muted">NT$ 200</del>
            <span class="float-right mr-2 text-danger">免運活動</span>
          </h6>
          <h4
            class="mt-5 border-top py-3"
            :class="{ 'h5 text-secondary': finalTotal !== total }"
          >
            <div class="float-left">總計</div>
            <div class="float-right">{{ total | numFormat | dollarSign }}</div>
          </h4>
          <h4 v-if="finalTotal !== total" class="py-3 text-dark">
            <div class="float-left">最終折扣價</div>
            <div class="float-right">
              {{ finalTotal | numFormat | dollarSign }}
            </div>
          </h4>
          <button
            class="btn w-100 mt-2 btn-outline-danger font-weight-bold"
            @click="goCheckout"
          >
            確認結帳
          </button>
        </div>
      </div>
      <div class="col-lg-5 col-md-8 mx-auto" v-if="cart.total === 0">
        <h4 class="my-4 lg">
          <i class="fa fa-star" aria-hidden="true"></i>
          為您推薦
        </h4>
        <ul class="list-unstyled my-4">
          <li
            @click="$router.push(`/product/${item.id}`)"
            class="media p-2 border mb-1"
            v-for="item in randoms"
            :key="item.id"
          >
            <img
              :alt="item.title"
              :src="item.imageUrl"
              class="align-self-center media-img"
            />
            <div class="media-body ml-3 text-left align-self-center">
              <h6 class="mt-2 mb-1">{{ item.title }}</h6>
              {{ item.content }}
              <div class="border-top pt-2 mt-2">
                <template v-if="item.price > 0">
                  <del class="float-left text-muted">
                    <small>原價 {{ item.origin_price }} 元</small>
                  </del>
                  <h4 class="ml-2 mb-0 float-right">
                    <b class="text-dark p-1">{{ item.price }}元</b>
                  </h4>
                </template>
                <template v-else>
                  <small class="float-left">售價</small>
                  <h4 class="ml-2 mb-0 float-right">
                    <b class="text-dark p-1">{{ item.origin_price }}元</b>
                  </h4>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="sm" v-if="cart.total > 0">
      <h5 class="my-4">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        購物車清單
      </h5>
      <table class="table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th width="80">操作</th>
          <th colspan="2">購買清單</th>
        </thead>
        <tbody v-for="item in cart.carts" :key="item.id">
          <tr>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="delCart(item.id)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </td>
            <td class="text-center">
              <div class="float-left">
                {{ item.product.title }} × {{ item.qty }}
              </div>
              <div class="float-right">
                <del class="text-muted" v-if="cart.final_total !== cart.total">
                  {{ item.total | numFormat | dollarSign }}
                </del>
                <template v-else>
                  {{ item.total | numFormat | dollarSign }}
                </template>
                <div class="text-dark" v-if="cart.final_total !== cart.total">
                  折扣後
                  {{ item.final_total | numFormat | dollarSign }}
                </div>
              </div>
              <br />
              <div class="text-muted" v-if="cart.final_total !== cart.total">
                已套用優惠券
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right">總計</td>
            <td colspan="2" class="text-right">
              {{ cart.total | numFormat | dollarSign }}
            </td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td class="pl-0 text-right">應付金額</td>
            <td class="text-right">
              {{ cart.final_total | numFormat | dollarSign }}
            </td>
          </tr>
        </tfoot>
      </table>

      <h5>
        <i aria-hidden="true" class="fa fa-ticket"></i>
        優惠券
      </h5>
      <div class="input-group input-group-sm p-0">
        <input
          type="text"
          class="form-control text-center"
          :placeholder="hint"
          v-model="couponCode"
        /><button
          class="btn border border-dark rounded-0 btn-sm font-weight-bold"
          type="button"
          @click="addCoupon"
        >
          套用優惠碼
        </button>
      </div>
      <button
          class="btn btn-dark w-100 btn-sm my-4 font-weight-bold"
          @click="goCheckout"
        >
          立即結帳
        </button>
      <br />
    </div>
    <div class="sm" v-if="cart.total === 0">
      <h5 class="my-4">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        購物車清單
      </h5>
      <p class="lead">
        您的購物車目前沒有任何商品，
        <br />請
        <router-link to="/products/all" class="text-muted mr-1">
          回商品列表
        </router-link>
        選購。
      </p>
      <hr />
      <h5 class="my-4 sm">
        <i class="fa fa-star" aria-hidden="true"></i>
        為您推薦
      </h5>
      <ul class="list-unstyled my-4">
        <li
          @click="$router.push(`/product/${item.id}`)"
          class="media p-2 border mb-1"
          v-for="item in randoms"
          :key="item.id"
        >
          <img
            :alt="item.title"
            :src="item.imageUrl"
            class="align-self-center media-img"
          />
          <div class="media-body ml-1 text-left align-self-center">
            <h6 class="mt-2 mb-1">{{ item.title }}</h6>
            {{ item.content }}
            <div class="border-top pt-2 mt-2">
              <template v-if="item.price > 0">
                <del class="float-left text-muted">
                  <small>原價 {{ item.origin_price }} 元</small>
                </del>
                <h4 class="ml-2 mb-0 float-right">
                  <b class="text-dark p-1">{{ item.price }}元</b>
                </h4>
              </template>
              <template v-else>
                <small class="float-left">售價</small>
                <h4 class="ml-2 mb-0 float-right">
                  <b class="text-dark p-1">{{ item.origin_price }}元</b>
                </h4>
              </template>
            </div>
          </div>
        </li>
      </ul>
      <div class="row mini text-dark">
        <div class="col-md p-2" v-for="item in randoms" :key="item.id">
          <div class="card border-0 shadow-sm">
            <div
              style="
              height: 200px;
              background-size: cover;
              background-position: center;
            "
              :style="{
                backgroundImage: `url(${item.imageUrl || item.image})`,
              }"
            ></div>
            <div class="card-body">
              <h5 class="card-title">
                {{ item.title }}
                <br />
                <small>
                  <span class="badge badge-dark p-1">{{ item.category }}</span>
                </small>
              </h5>
              <p class="card-text">{{ item.content }}</p>
              <div>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="text-muted" v-if="item.price">
                  原價 {{ item.origin_price }} 元
                </del>

                <div class="h5 text-dark" v-if="item.price">
                  現在只要 {{ item.price }} 元
                </div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn border border-dark btn-sm"
                @click="$router.push(`/product/${item.id}`)"
              >
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-dark btn-sm ml-auto"
                @click="addCart(item.id)"
              >
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>填寫收件資料</span>
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
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form class="text-dark text-left" @submit.prevent="addOrder">
              <div class="modal-body">
                <div class="row justify-content-center mx-3">
                  <span class="text-danger my-2">* 為必填項目</span>
                  <div class="col-md-12 my-2">
                    <div class="form-group">
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        name="email"
                        rules="required|email"
                      >
                        <label for="useremail">
                          電子信箱
                          <i class="text-danger">*</i>
                        </label>
                        <input
                          type="text"
                          name="email"
                          class="form-control form-control-sm"
                          id="useremail"
                          v-model="form.user.email"
                          :class="{ 'is-invalid': failed }"
                          placeholder="請輸入收件人電子郵件"
                        />
                        <span v-if="failed" class="text-danger">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-5">
                        <ValidationProvider
                          v-slot="{ failed, errors }"
                          name="name"
                          rules="required"
                        >
                          <label for="username">
                            姓名
                            <i class="text-danger">*</i>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="username"
                            v-model="form.user.name"
                            class="form-control form-control-sm"
                            :class="{ 'is-invalid': failed }"
                            placeholder="請輸入收件人姓名"
                          />
                          <span v-if="failed" class="text-danger">
                            {{ errors[0] }}
                          </span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group col-md-7">
                        <ValidationProvider
                          v-slot="{ failed, errors }"
                          name="mobile"
                          rules="required|numeric"
                        >
                          <label for="usertel">
                            電話號碼
                            <i class="text-danger">*</i>
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            v-model="form.user.tel"
                            id="usertel"
                            class="form-control form-control-sm"
                            :class="{ 'is-invalid': failed }"
                            placeholder="請輸入收件人聯絡電話"
                          />
                          <span v-if="failed" class="text-danger">
                            {{ errors[0] }}
                          </span>
                        </ValidationProvider>
                      </div>
                    </div>
                    <div class="form-group">
                      <ValidationProvider
                        v-slot="{ failed, errors }"
                        name="address"
                        rules="required|min:3"
                      >
                        <label for="useraddress">
                          收件地址
                          <i class="text-danger">*</i>
                        </label>
                        <input
                          type="text"
                          name="address"
                          v-model="form.user.address"
                          id="useraddress"
                          class="form-control form-control-sm"
                          :class="{ 'is-invalid': failed }"
                          placeholder="請輸入收件人地址"
                        />
                        <span v-if="failed" class="text-danger">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>

                    <div class="form-group">
                      <label for="message">備註</label>
                      <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="4"
                        v-model="form.message"
                        placeholder="商品備註"
                        class="form-control form-control-sm"
                      ></textarea>
                    </div>
                    <div class="text-right"></div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-dismiss="modal"
                >
                  取消
                </button>
                <button class="btn btn-dark" :disabled="invalid">
                  資料送出
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: false,
      cart: [],
      couponCode: '',
      hint: '請輸入優惠碼',
      randoms: [],
      tempCart: [],
      orderId: '',
      form: {
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart (openModal = false) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data
          if (vm.cart.total === 0) {
            vm.getProducts()
          } else if (
            vm.cart.final_total === vm.cart.total &&
            vm.cart.total > 0
          ) {
            vm.hint = '請輸入優惠碼'
          } else if (
            vm.cart.final_total !== vm.cart.total &&
            vm.cart.total > 0
          ) {
            vm.hint = '當前折扣碼：' + vm.cart.carts[0].coupon.code
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
        if (openModal === true) {
          $('#modal').modal('show')
        }
      })
    },
    delCart (id, rep = false) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${id}`
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          if (rep === false) {
            vm.$bus.$emit('message:push', res.data.message, 'dark')
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
        vm.getCart()
      })
    },
    addCoupon (changeLoading = true) {
      const vm = this
      if (vm.couponCode === '') {
        vm.$bus.$emit('message:push', '請輸入優惠碼', 'danger')
        return
      }
      if (changeLoading === false) {
        vm.isLoading = true
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/coupon`
        vm.$http.post(api, { data: { code: vm.couponCode } }).then((res) => {
          if (res.data.success) {
            vm.cart.final_total = res.data.final_total
            vm.$bus.$emit('message:push', '已套用優惠券', 'dark')
            if (changeLoading === true) {
              vm.isLoading = false
            }
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger')
          }
          vm.getCart(true)
        })
      } else {
        vm.isLoading = true
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/coupon`
        vm.$http.post(api, { data: { code: vm.couponCode } }).then((res) => {
          if (res.data.success) {
            vm.cart.final_total = res.data.final_total
            vm.$bus.$emit('message:push', '已套用優惠券', 'dark')
            if (changeLoading === true) {
              vm.isLoading = false
            }
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger')
          }
          vm.getCart()
        })
      }
    },
    addQty (id) {
      const vm = this
      vm.cart.carts.forEach((item) => {
        if (item.id === id) {
          item.qty = item.qty + 1
        }
      })
    },
    lessQty (id) {
      const vm = this
      vm.cart.carts.forEach(function (item) {
        if (item.id === id) {
          if (item.qty === 1) {
            vm.delCart(id)
          } else {
            item.qty = item.qty - 1
          }
        }
      })
    },
    goCheckout () {
      const vm = this
      if (JSON.stringify(vm.cart) === JSON.stringify(vm.tempCart)) {
        $('#modal').modal('show')
      } else {
        vm.isLoading = true
        vm.tempCart.carts = vm.cart.carts
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
        vm.$http.get(api).then((res) => {
          if (res.data.success) {
            vm.cart = res.data.data
            let times = vm.cart.carts.length
            vm.cart.carts.forEach((item) => {
              times--
              let code = ''
              if (vm.cart.carts[0].coupon) {
                code = vm.cart.carts[0].coupon.code
              }
              const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${item.id}`
              vm.$http.delete(api).then()
              if (times === 0) {
                const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
                let times = vm.tempCart.carts.length
                vm.tempCart.carts.forEach((item) => {
                  const obj = { product_id: item.product_id, qty: item.qty }
                  vm.$http.post(api, { data: obj }).then((res) => {
                    if (res.data.success) {
                      times--
                      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
                      vm.$http.get(api).then((res) => {
                        if (res.data.success) {
                          vm.cart = res.data.data
                          vm.tempCart = vm.cart
                          if (code !== '') {
                            vm.couponCode = code
                            if (times === 0) {
                              vm.addCoupon(false)
                              vm.isLoading = false
                            }
                          } else {
                            vm.getCart(true)
                          }
                        }
                      })
                    }
                  })
                })
                vm.$bus.$emit('message:push', '購物車清單已更新', 'dark')
              }
            })
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger')
          }
        })
      }
    },
    getProducts () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.randoms = []
          const products = res.data.products.filter(
            (item) => item.is_enabled === 1
          )
          const arr = products
          const ranNum = 4
          for (let i = 0; i < ranNum; i++) {
            const ran = Math.floor(Math.random() * arr.length)
            vm.randoms.push(arr.splice(ran, 1)[0])
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    addOrder () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/order`
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$http.post(api, { data: vm.form }).then((res) => {
            if (res.data.success) {
              $('#modal').modal('hide')
              vm.$router.push(`/checkout/${res.data.orderId}`)
              vm.$bus.$emit('message:push', res.data.message, 'dark')
            } else {
              vm.$bus.$emit('message:push', res.data.message, 'danger')
            }
          })
        } else {
          vm.$bus.$emit('message:push', '欄位不完整', 'danger')
        }
        vm.isLoading = false
      })
    }
  },
  computed: {
    total () {
      const vm = this
      let total = 0
      vm.cart.carts.forEach((item) => {
        total += item.qty * item.product.price
      })
      return total
    },
    finalTotal () {
      const vm = this
      let finalTotal = 0
      if (vm.cart.carts[0].coupon) {
        vm.cart.carts.forEach((item) => {
          finalTotal +=
            (item.qty * item.product.price * vm.cart.carts[0].coupon.percent) /
            100
        })
      } else {
        vm.cart.carts.forEach((item) => {
          finalTotal += item.qty * item.product.price
        })
      }
      return finalTotal
    }
  },
  created () {
    const vm = this
    vm.isLoading = true
    const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
    vm.$http.get(api).then((res) => {
      if (res.data.success) {
        vm.tempCart = res.data.data
      }
    })
    vm.getCart()
  }
}
</script>

<style scoped>
.media {
  border-radius: 5px;
}

.media:hover {
  background-color: #f2fff8;
  cursor: pointer;
}

.media-img {
  width: 140px;
  height: 100px;
  object-fit: cover;
}

.mini {
  display: none;
}

@media screen and (max-width: 375px) {
  .list-unstyled {
    display: none;
  }
  .mini {
    display: block;
  }
}
</style>
