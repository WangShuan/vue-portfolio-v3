<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <h3 class="my-4 text-dark">
      <i class="fa fa-heart-o" aria-hidden="true"></i>
      喜好項目
    </h3>
    <div v-if="hasLiked == false">
      <h4 class="my-5">
        您的喜好項目為空，
        <br />
        將在
        <span class="h3 text-danger" v-if="time >= 0"> {{ time }} </span>
        秒後跳轉回商品列表
      </h4>
    </div>
    <div id="cart-list" v-else>
      <table class="lg table table-striped table-bordered text-dark mt-4">
        <thead class="thead">
          <th>操作</th>
          <th>品名</th>
          <th>單價</th>
          <th>商品連結</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="align-middle">
              <button
                @click="removeLike(item.id)"
                type="button"
                class="btn btn-outline-danger mr-2 btn-sm"
              >
                <i class="fa fa-trash" aria-hidden="true"></i> 取消收藏
              </button>
              <button
                @click="addCart(item.id)"
                type="button"
                class="btn-outline-dark btn-sm btn"
              >
                加入購物車
                <i class="fa fa-shopping-basket" aria-hidden="true"></i>
              </button>
            </td>
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle">
              {{ item.price | numFormat | dollarSign }} / {{ item.unit }}
            </td>
            <td class="align-middle">
              <router-link class="text-secondary" :to="`/product/${item.id}`">
                查看更多
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="sm">
        <table class="table table-striped table-bordered text-dark my-2">
          <thead class="thead">
            <th>操作</th>
            <th>瀏覽商品</th>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td class="align-middle">
                <button
                  @click="removeLike(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm mr-2"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button
                  @click="addCart(item.id)"
                  type="button"
                  class="btn-outline-dark btn-sm btn"
                >
                  <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                </button>
              </td>
              <td class="align-middle">
                <router-link class="text-muted" :to="`/product/${item.id}`">
                  {{ item.title }}
                </router-link>
                <i
                  class="fa ml-2 text-muted fa-arrow-circle-right"
                  aria-hidden="true"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-dark my-3" @click="addCart(products)">
        全部加入購物車
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      isLoading: false,
      hasLiked: true,
      cookie: '',
      time: 0
    }
  },
  methods: {
    getLikes (arr) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.hasLiked = true
          if (arr.length > 20) {
            arr = arr.split(',')
          } else {
            arr = [arr]
          }
          vm.isLoading = false
          vm.products = vm.products.filter(
            (item) => arr.indexOf(item.id) !== -1
          )
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    removeLike (id) {
      const vm = this
      vm.isLoading = true
      let arr = vm.cookie
      if (arr.length === 20) {
        document.cookie = 'like=;expires=7;path=/'
      } else if (arr.length > 20) {
        arr = arr.split(',')
        const i = arr.indexOf(id)
        arr.splice(i, 1)
        const str = arr.toString()
        document.cookie = `like=${str};expires=7;path=/`
      }
      vm.isLoading = false
      vm.hasLikes()
    },
    hasLikes () {
      const vm = this
      const cookieAry = document.cookie.split(';')
      let cookie
      for (let i = 0; i < cookieAry.length; ++i) {
        cookie = cookieAry[i].trim()
        cookie = cookie.split('=')
        if (cookie[0] === 'like') {
          vm.cookie = cookie[1]
        }
      }
      if (vm.cookie) {
        if (vm.cookie.length > 0) {
          vm.getLikes(vm.cookie)
          vm.getCart()
        } else {
          vm.hasLiked = false
          vm.time = 3
          setInterval(vm.countDown, 1000)
        }
      } else {
        vm.hasLiked = false
        vm.time = 3
        setInterval(vm.countDown, 1000)
      }
    },
    addCart (id, num = 1) {
      const vm = this
      if (typeof id === 'string') {
        const rel = vm.cart.find((item) => item.product_id === id)
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
      } else {
        id.forEach(function (item) {
          const rel = vm.cart.find((cart) => cart.product_id === item.id)
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
            obj = { product_id: item.id, qty: 1 }
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
        })
      }
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
    getCart () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data.carts
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    countDown () {
      this.time--
    }
  },
  watch: {
    time: function (newVal) {
      if (newVal === 0) {
        this.$router.push('/products/all')
      }
    }
  },
  created () {
    this.hasLikes()
  }
}
</script>
