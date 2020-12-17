<template>
  <div>
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
    <div class="lg mt-5">
      <div class="float-left">
        <h4 class="mt-3 font-weight-bold">
          <i class="fa fa-th" aria-hidden="true"></i>
          商品列表
        </h4>
      </div>
    </div>

    <div class="sm">
      <div class="float-left">
        <h5 class="mt-3 font-weight-bold">
          <i class="fa fa-th" aria-hidden="true"></i>
          商品列表
        </h5>
      </div>
    </div>

    <Cards
      :products="products"
      @getProducts="getProducts"
      @getOneProduct="getOneProduct"
      @addCart="addCart"
    ></Cards>

    <div
      id="cart-list-lg"
      class="col-md-10 py-2 border-top mx-auto lg"
      v-if="cart.total > 0"
    >
      <h4 class="my-3">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        購物車清單
      </h4>
      <table class="table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th>操作</th>
          <th>品名</th>
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
              {{ item.product.title }}
              <div class="text-muted" v-if="cart.final_total !== cart.total">
                已套用優惠券
              </div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-right">
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
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">
              {{ cart.total | numFormat | dollarSign }}
            </td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-muted">折扣價</td>
            <td class="text-right text-muted">
              {{ cart.final_total | numFormat | dollarSign }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="請輸入優惠碼"
            v-model="couponCode"
        />
        <button class="btn btn-dark w-25" type="button" @click="addCoupon">
          套用優惠碼
        </button>
      </div>
    </div>

    <div id="cart-list-sm" class="sm" v-if="cart.total > 0">
      <h5><i class="fa fa-shopping-cart" aria-hidden="true"></i> 購物車清單</h5>
      <table class="table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th width="80">操作</th>
          <th colspan="2">商品內容</th>
        </thead>
        <tbody v-for="item in cart.carts" :key="item.id">
          <tr>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-dark btn-sm"
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
              <div
                class="text-muted text-left"
                v-if="cart.final_total !== cart.total"
              >
                已套用優惠券
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr :class="{ 'text-muted': cart.final_total !== cart.total }">
            <td class="text-right">總計</td>
            <td colspan="2" class="text-right">
              {{ cart.total | numFormat | dollarSign }}
            </td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td class="pl-0 text-right text-dark">應付金額</td>
            <td class="text-right text-dark">
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
          placeholder="請輸入優惠碼"
          v-model="couponCode"
        />
      </div>
      <button
        class="btn btn-dark rounded-0 w-100 btn-sm font-weight-bold"
        type="button"
        @click="addCoupon"
      >
        套用優惠碼
      </button>
    </div>
    <hr />
    <div class="py-3" v-if="cart.total !== 0">
      <h4 class="my-3">
        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        填寫收件人
        <span class="text-danger my-2">* 為必填項目</span>
      </h4>
      <div class="row justify-content-center mx-3">
        <div class="col-md-8 my-2 mx-auto">
          <ValidationObserver ref="form" v-slot="{ invalid }">
            <form class="text-dark text-left" @submit.prevent="addOrder">
              <div class="form-group">
                <ValidationProvider
                  v-slot="{ failed, errors }"
                  name="email"
                  rules="required|email"
                >
                  <label for="useremail">電子信箱</label>
                  <input
                    type="text"
                    name="email"
                    class="form-control form-control-sm"
                    id="useremail"
                    v-model="form.user.email"
                    :class="{ 'is-invalid': failed }"
                    placeholder="請輸入收件人email"
                  />
                  <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-row">
                <div class="form-group col-md-5">
                  <ValidationProvider
                    v-slot="{ failed, errors }"
                    name="name"
                    rules="required"
                  >
                    <label for="username">姓名</label>
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
                    name="sm"
                    rules="required|numeric"
                  >
                    <label for="usertel">電話號碼</label>
                    <input
                      type="text"
                      name="sm"
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
                  <label for="useraddress">收件地址</label>
                  <input
                    type="text"
                    name="address"
                    v-model="form.user.address"
                    id="useraddress"
                    class="form-control form-control-sm"
                    :class="{ 'is-invalid': failed }"
                    placeholder="請輸入收件人地址"
                  />
                  <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="message">備註</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="5"
                  v-model="form.message"
                  placeholder="商品備註"
                  class="form-control"
                ></textarea>
              </div>
              <div class="text-right">
                <button class="btn mt-3 btn-dark" :disabled="invalid">
                  資料送出
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              class="img-fluid"
              alt
              :src="product.imageUrl || product.image"
            />
            <blockquote class="blockquote mt-3">
              <p class="mb-2">{{ product.content }}</p>
              <pre class="text-muted small">{{ product.description }}</pre>
            </blockquote>
            <hr />
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6 text-muted" v-if="product.price">
                原價 {{ product.origin_price }} 元
              </del>
              <div class="h5 text-dark" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-dark"
              @click="addCart(product.id, product.num)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Cards from '@/components/Cards'

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      product: {},
      status: {
        loadingItem: ''
      },
      cart: [],
      couponCode: '',
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
    getProducts () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.products = res.data.products
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    getOneProduct (id) {
      const vm = this
      vm.isLoading = true
      vm.status.loadingItem = id
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/product/${id}`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product
          vm.product.num = 1
          $('#productModal').modal('show')
          vm.isLoading = false
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.status.loadingItem = ''
      })
    },
    addCart (id, num = 1) {
      const vm = this
      const rel = vm.cart.carts.find((item) => item.product_id === id)
      let obj
      if (rel) {
        obj = { product_id: rel.product_id, qty: num + rel.qty }
        vm.isLoading = true
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
        vm.$http
          .post(api, {
            data: obj
          })
          .then((res) => {
            vm.isLoading = false
            if (res.data.success) {
              vm.delCart(rel.id, true)
            } else {
              vm.$bus.$emit('message:push', res.data.message, 'danger')
            }
          })
      } else {
        obj = { product_id: id, qty: num }
        vm.isLoading = true
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
        vm.$http
          .post(api, {
            data: obj
          })
          .then((res) => {
            vm.isLoading = false
            if (res.data.success) {
              vm.getCart()
              vm.$bus.$emit('message:push', res.data.message, 'dark')
            } else {
              vm.$bus.$emit('message:push', res.data.message, 'danger')
            }
          })
      }
    },
    getCart () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        $('#productModal').modal('hide')
        vm.isLoading = false
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
          } else {
            vm.$bus.$emit('message:push', '購物車清單已更新', 'dark')
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
        vm.getCart()
      })
    },
    addCoupon () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/coupon`
      if (vm.couponCode === '') {
        vm.couponCode = 'false'
      }
      vm.$http.post(api, { data: { code: vm.couponCode } }).then((res) => {
        if (res.data.success) {
          vm.cart.final_total = res.data.final_total
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.getCart()
        vm.isLoading = false
        vm.couponCode = ''
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
              vm.$router.push(`/test/test_checkout/${res.data.orderId}`)
              vm.$bus.$emit('message:push', res.data.message, 'dark')
            } else {
              vm.$bus.$emit('message:push', res.data.message, 'danger')
            }
          })
        } else {
          vm.$bus.$emit('message:push', '欄位不完整', 'danger')
        }
        vm.getCart()
        vm.isLoading = false
      })
    },
    goCart () {
      $('html,body').animate(
        { scrollTop: $('#cart-list-lg').offset().top },
        800
      )
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  components: {
    Cards
  }
}
</script>
