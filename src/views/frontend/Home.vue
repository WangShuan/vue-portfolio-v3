<template>
  <div>
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <MessageAlert></MessageAlert>

    <header class="navbar lg navbar-expand navbar-light bg-light">
      <router-link class="h4 text-muted mt-2" to="/">
        <img src="@/assets/image/logo.png" alt="Logo" class="logo" />
        拼圖迷
      </router-link>

      <div
        class="collapse navbar-collapse d-flex justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link " to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to="/products/all"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle "
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              用戶選單
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <router-link class="dropdown-item" to="/cart">
                <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>
                購物車頁面
              </router-link>
              <router-link class="dropdown-item" to="/coupon">
                <i class="fa fa-ticket mr-2" aria-hidden="true"></i>優惠券專區
              </router-link>
              <router-link class="dropdown-item" to="/like">
                <i class="fa fa-heart mr-2" aria-hidden="true"></i>喜好的項目
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/login">
                <i class="mr-2 fa fa-sign-in" aria-hidden="true"></i>管理員登入
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </header>

    <header
      class="navbar sm-header sm navbar-expand-lg navbar-light bg-light"
    >
      <router-link class="h4 float-left text-muted mt-2" to="/">
        <img src="@/assets/image/logo.png" alt="Logo" class="logo" />
        拼圖迷
      </router-link>

      <div class="float-right" id="navbarSupportedContent">
        <a
          class="dropdown-toggle text-dark"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          用戶選單
        </a>
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <router-link class="dropdown-item" to="/">
            <i class="fa fa-home mr-2" aria-hidden="true"></i>首頁
          </router-link>
          <router-link class="dropdown-item" to="/about">
            <i class="fa fa-info-circle mr-2" aria-hidden="true"></i>關於我們
          </router-link>
          <router-link class="dropdown-item" to="/products/all">
            <i class="fa fa-list mr-2" aria-hidden="true"></i>產品列表
          </router-link>
          <router-link class="dropdown-item" to="/cart">
            <i class="fa fa-shopping-cart mr-2" aria-hidden="true"></i>購物車
          </router-link>
          <router-link class="dropdown-item" to="/coupon">
            <i class="fa fa-ticket mr-2" aria-hidden="true"></i>優惠券專區
          </router-link>
          <router-link class="dropdown-item" to="/like">
            <i class="fa fa-heart mr-2" aria-hidden="true"></i>喜好項目
          </router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" to="/login">
            <i class="mr-2 fa fa-sign-in" aria-hidden="true"></i>管理員登入
          </router-link>
        </div>
      </div>
    </header>

    <router-view
      class="main-content"
      v-if="this.$route.path !== '/'"
      :key="this.$route.fullPath"
    ></router-view>

    <div class="main-content" v-else>
      <div class="main-img-lg lg">
        <img
          src="https://images.unsplash.com/photo-1590146757941-486a0c8385ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
          class="d-block w-100"
        />
        <div class="main-img-lg-caption bg-light text-dark">
          <h2 class="mt-3">歡迎光臨拼圖迷❤️</h2>
          <p class="h4 font-weight-normal">
            市面上進口拼圖網路商店的銷售冠軍🏆
            <br />
            擁有歐洲三大進口拼圖獨家代理權！
            <br />
            銷量第一產品 ➡️ 紐約天際線-2000片
            <br />
            本公司產品承諾正版保證- 皆附保證書📖
          </p>
        </div>
        <button
          @click="$router.push('/product/-NYXBMCKSLI9cZGSfPj4')"
          class="lg btn main-img-lg-btn btn-dark"
        >
          立即搶購
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>
      </div>

      <div class="main-img-sm sm">
        <img
          src="https://images.unsplash.com/photo-1590146757941-486a0c8385ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
          class="d-block w-100"
        />
        <div class="main-img-sm-caption text-dark">
          <h4 class="my-3">歡迎光臨拼圖迷❤️</h4>
          <p class="h6 font-weight-normal">
            市面上進口拼圖網路商店的銷售冠軍🏆
            <br />
            擁有歐洲三大進口拼圖獨家代理權！
            <br />
            銷量第一產品 ➡️ 紐約天際線-2000片
            <br />
            本公司產品承諾正版保證- 皆附保證書📖
          </p>
        </div>
        <button
          @click="$router.push('/product/-NYXBMCKSLI9cZGSfPj4')"
          class="btn main-img-sm-btn btn-dark btn-sm"
        >
          立即搶購
          <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
        </button>
      </div>

      <div class="container">
        <div class="introduction my-5">
          <h3 class="my-4">⁂ 主要服務項目</h3>
          <div class="row text-dark">
            <div class="col-md-4">
              <i
                class="display-3 text-dark p-2 fa fa-truck"
                aria-hidden="true"
              />
              <h2>特快的出貨</h2>
              <p class="lead">
                當天下訂立即出貨！全店所有商品提供
                <b class="text-danger"> 十二小時 </b>
                內到貨服務！快讓拼圖迷用最快速的服務把你寵壞
              </p>
            </div>
            <div class="col-md-4">
              <i class="display-3 fa fa-key p-2 text-dark" aria-hidden="true" />
              <h2>完善的安全</h2>
              <p class="lead">
                拼圖迷採用全世界最先進的
                <b class="text-danger">SSL傳輸加密</b>
                機制，讓您能夠絕對安全安心地享受網上購物的樂趣
              </p>
            </div>
            <div class="col-md-4">
              <i
                class="display-3 text-dark fa fa-thumbs-o-up p-2"
                aria-hidden="true"
              />
              <h2>簡單的設計</h2>
              <p class="lead">
                <b class="text-danger">一目瞭然</b>
                的排版、分頁，讓您輕鬆知道如何購買、如何結帳，就連第一次瀏覽也不用怕找不到下單方式
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="news lg my-5">
          <h3 class="my-4">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            最新消息
          </h3>
          <div class="row mt-5">
            <div class="col-lg-5 align-self-center">
              <img
                src="@/assets/image/anniversary8.jpg"
                alt="Happy Anniversary 8"
                class="w-75"
              />
            </div>
            <div class="col-lg-7">
              <h2 class="text-muted mt-2">
                拼圖迷八週年慶
                <span class="text-dark">全館八折優惠！</span>
              </h2>
              <button
                type="button"
                class="btn my-4 btn-outline-dark"
                data-toggle="modal"
                data-target="#couponModal"
              >
                週年慶新客戶加碼送！
              </button>
              <p class="lead">
                轉眼間 2020
                年了，您的孩子長大了，您也成熟了，而我們，也老了！感謝這一路上多年來所有不管是新客舊客的支持與陪伴！在此宣佈！
                <b class="font-italic">『拼圖迷』八歲囉！！！</b>
                就讓我們一同歡慶這個美好的節日！感恩回饋不打烊 - 八週年全館
                <u class="text-muted">免運費</u>
                直接送給您！一起買爆拼圖吧😊
              </p>
            </div>
          </div>
        </div>
        <div class="news sm mt-4">
          <h4 class="my-4">
            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
            最新消息
          </h4>
          <div class="mt-5">
            <h3 class="text-muted">
              拼圖迷八週年慶
              <p class="text-dark">全館八折優惠！</p>
            </h3>
            <img
              src="@/assets/image/anniversary8.jpg"
              alt="Happy Anniversary 8"
              class="img-fluid mt-2 mb-4"
            />

            <button
              type="button"
              class="btn mb-4 btn-dark"
              data-toggle="modal"
              data-target="#couponModal"
            >
              週年慶新客戶加碼送！
            </button>

            <p class="text-lg">
              轉眼間 2020
              年了，您的孩子長大了，您也成熟了，而我們，也老了！感謝這一路上多年來所有不管是新客舊客的支持與陪伴！在此宣佈！
              <b class="font-italic">『拼圖迷』八歲囉！！！</b>
              就讓我們一同歡慶這個美好的節日！感恩回饋不打烊 - 八週年全館
              <u class="text-muted">八折活動不限期</u>
              直接送給您！讓您買到手軟停不下來！今年也讓我們用破盤價寵壞您吧😊
            </p>
          </div>
        </div>
        <hr />
        <div class="randomproducts my-5">
          <h3 class="my-4">⚄ 隨機推薦</h3>
          <div class="row text-dark">
            <div class="col-md p-2" v-for="item in randoms" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 200px;background-size: cover;background-position: center;"
                  :style="{
                    backgroundImage: `url(${item.imageUrl || item.image})`,
                  }"
                ></div>
                <div class="card-body">
                  <h5 class="card-title">
                    {{ item.title }}
                    <br />
                    <small>
                      <span class="badge badge-dark p-1">
                        {{ item.category }}
                      </span>
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
                    <div class="h5" v-if="item.price">
                      現在只要 {{ item.price }} 元
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-dark btn-sm"
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
          <div class="my-4 text-secondary">
            不喜歡?
            <a
              class="text-dark"
              href="#"
              @click.prevent="randomProducts('隨機推薦已更新!')"
            >
              點我
            </a>
            換一組試試😊
          </div>
        </div>
      </div>
    </div>
    <footer class="navbar navbar-light bg-light text-dark">
      <div class="w-100 my-2">
        聯絡我們:
        <ul class="nav justify-content-center mb-2">
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-facebook-official" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="https://github.com/WangShuan/vue-portfolio-v3">
              <i class="fa fa-lg fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link p-1 text-dark" href="#">
              <i class="fa fa-lg fa-twitter-square" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
        <div>
          <small class="d-block">
            © Company 2020 Made with
            <a class="text-muted" href="https://bootstrap.hexschool.com/">
              Bootstrap4
            </a>
          </small>
          <i>本網頁僅供學習使用 無任何商業用途</i>
        </div>
      </div>
    </footer>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title" id="couponModalTitle">領取優惠碼</h5>
            <button
              type="button"
              class="close text-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h6 class="mb-0">
              <span>點擊複製</span> ☞
              <input
                class="h4 text-danger copy"
                type="text"
                @focus="copy"
                value="new88"
              />
              <br />不限金額結帳即享88折優惠
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageAlert from '@/components/MessageAlert'

export default {
  data () {
    return {
      isLoading: false,
      randoms: [],
      cart: [],
      screenWidth: document.documentElement.clientWidth
    }
  },
  components: { MessageAlert },
  methods: {
    copy (e) {
      e.currentTarget.select()
      document.execCommand('Copy')
      this.$bus.$emit('message:push', '複製成功', 'dark')
    },
    randomProducts (msg) {
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
          let ranNum = 3
          if (vm.screenWidth > 768) {
            ranNum = 4
          }
          for (let i = 0; i < ranNum; i++) {
            const ran = Math.floor(Math.random() * arr.length)
            vm.randoms.push(arr.splice(ran, 1)[0])
          }
          if (msg) {
            vm.$bus.$emit('message:push', msg, 'dark')
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    addCart (id, num = 1) {
      const vm = this
      let rel = vm.cart.find((item) => item.product_id === id)
      let obj
      if (rel) {
        obj = { product_id: rel.product_id, qty: rel.qty + 1 }
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
              rel = ''
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
    }
  },
  created () {
    const vm = this
    vm.randomProducts('歡迎光臨拼圖迷～❤️')
    vm.getCart()
  },
  watch: {
    $route: function (to, from) {
      if (to.path === '/' && from.path !== '/') {
        this.getCart()
      }
    }
  }
}
</script>
