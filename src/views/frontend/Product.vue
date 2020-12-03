<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <div class="row">
      <div class="col-lg-12">
        <div class="mobile">
          <div class="btn-group text-dark mt-4 mb-2">
            <h6>當前商品類別：</h6>
            <a
              class="text-muted h6"
              data-toggle="dropdown"
              data-display="static"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ active.name }}
              <i class="fa fa-caret-down" aria-hidden="true"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg-right">
              <button
                v-for="item in categories"
                :key="item.title"
                :class="{ active: item.title === active.name }"
                @click.prevent="getProducts(item.path)"
                class="dropdown-item"
                type="button"
              >
                {{ item.title }}
              </button>
            </div>
          </div>
          <h5 class="my-2 text-left">商品內容</h5>
        </div>
        <h4 class="py-4 text-left pc pad">商品內容</h4>
        <div class="row mb-3 media">
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="mobile media-mobile-img mb-3"
          />
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="border ml-3 media-pc-img pc pad col-md-6 align-self-center"
          />
          <div class="media-body px-3">
            <div class="text-justify">
              <h4 class="text-dark">
                {{ product.title }}
                <span
                  v-if="product.id === '-MN1R8dGkdl9mtI2viKd'"
                  class="badge badge-danger small"
                  >銷售冠軍</span
                >
              </h4>
              <p class="text-dark">{{ product.content }}</p>
              <div class="input-group mb-2">
                <button
                  v-if="isLiked"
                  class="btn btn-sm btn-danger"
                  @click="liked(product.id)"
                >
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  喜歡 ( 987 )
                </button>
                <button
                  v-else
                  class="btn btn-sm btn-outline-danger"
                  @click="liked(product.id)"
                >
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  喜歡 ( 986 )
                </button>
              </div>
              <div
                v-if="product.id === '-MN1R8dGkdl9mtI2viKd'"
                class="text-dark"
              >
                已售出 9897 {{ product.unit }} | 剩餘數量 102
              </div>
              <div v-else class="text-dark">
                已售出 876 {{ product.unit }} | 剩餘數量 9999
              </div>
              <hr />

              <div class="mt-2 mb-3">
                <select class="input-group p-2" v-model="product.num">
                  <option v-for="num in 10" :key="num" :value="num"
                    >選購 {{ num }} {{ product.unit }}</option
                  >
                </select>
                <div class="input-group m-0 row">
                  <button
                    class="btn border border-dark col-6 rounded-0"
                    @click="addCart(product.id, product.num)"
                  >
                    加入購物車
                  </button>
                  <button
                    @click="buyNow(product.id, product.num)"
                    class="btn btn-dark col-6 rounded-0"
                  >
                    立即購買
                  </button>
                </div>
              </div>

              <div>
                <h5 class="text-right" v-if="product.price > 0">
                  <del class="text-muted h6"
                    >原價 {{ product.origin_price }} 元</del
                  >
                  <br />

                  <h2 class="float-right ml-2">
                    <b class="text-dark p-1">
                      <span class="small">現在只要</span>
                      {{ product.price }}元
                    </b>
                  </h2>
                </h5>
                <h3 class="text-right" v-else>
                  <b>售價 {{ product.origin_price }} 元</b>
                </h3>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-2 text-left">
            <h5 class="bg-light text-dark p-2">商品描述：</h5>
            <pre v-html="product.description" class="m-3 text-dark"></pre>
            <p class="mt-3 text-center text-muted">
              ***溫馨提醒：所有產品皆有提供七天鑑賞期***
            </p>
          </div>
          <div class="col-md-12 mt-2">
            <a
              href="#"
              @click.prevent="$router.push(`/products/${product.category}`)"
              class="float-right m-2"
              >更多>></a
            >
            <h5 class="bg-light text-left text-dark p-2">類似商品：</h5>
            <div class="row text-dark">
              <div
                class="col-md-3 mb-4"
                v-for="item in products"
                :key="item.id"
              >
                <div
                  @click="getProduct(item.id)"
                  class="card border-0 shadow-sm"
                >
                  <div
                    style="height: 200px;background-size: cover;background-position: center;"
                    :style="{
                      backgroundImage: `url(${item.imageUrl || item.image})`,
                    }"
                  ></div>
                  <div class="card-body">
                    <h5 class="text-dark">{{ item.title }}</h5>
                    <b class="h6 text-muted">優惠價 {{ item.price }}元</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: "",
      isLoading: false,
      products: [],
      isLiked: false,
      categories: [],
      cart: [],
      active: { name: "", path: "" },
    };
  },
  methods: {
    getProducts(item) {
      this.$router.push("/products/" + item);
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${id}`;
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", "購物車清單已更新", "dark");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
        vm.getCart();
      });
    },
    getProduct(id = this.$route.params.id) {
      const vm = this;
      vm.isLoading = true;
      vm.$router.push("/product/" + id).catch((err) => err);
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/product/${id}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.product = res.data.product;
          vm.product.num = 1;
          vm.active.name = vm.product.category;
          const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`;
          this.$http.get(api).then((res) => {
            vm.isLoading = false;
            if (res.data.success) {
              let arr = res.data.products.filter(function(item) {
                return item.category === vm.product.category;
              });
              arr.forEach((item) => {
                if (vm.products.length < 4 && item.id !== vm.product.id) {
                  vm.products.push(item);
                }
              });
              if (document.cookie.indexOf(vm.$route.params.id) !== -1) {
                vm.isLiked = true;
              }
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    addCart(id, num = 1) {
      const vm = this;
      let rel = vm.cart.find((item) => {
        return item.product_id === id;
      });
      let obj;
      if (rel) {
        obj = { product_id: rel.product_id, qty: num + rel.qty };
        vm.isLoading = true;
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
        vm.$http
          .post(api, {
            data: obj,
          })
          .then((res) => {
            vm.isLoading = false;
            if (res.data.success) {
              vm.delCart(rel.id);
              vm.$bus.$emit("message:push", "購物車清單已更新", "dark");
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
      } else {
        obj = { product_id: id, qty: num };
        vm.isLoading = true;
        const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
        vm.$http
          .post(api, {
            data: obj,
          })
          .then((res) => {
            vm.isLoading = false;
            if (res.data.success) {
              vm.getCart();
              vm.$bus.$emit("message:push", "購物車清單已更新", "dark");
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
      }
    },
    buyNow(id, num = 1) {
      const vm = this;
      let rel = vm.cart.find((item) => {
        return item.product_id === id;
      });
      let obj;
      if (rel) {
        obj = { product_id: rel.product_id, qty: num + rel.qty };
        vm.delCart(rel.id);
      } else {
        obj = { product_id: id, qty: num };
      }
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      this.$http.post(api, { data: obj }).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.getCart();
          vm.$bus.$emit("message:push", res.data.message, "dark");
          vm.$router.push("/cart");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    liked(id = this.$route.params.id) {
      const vm = this;
      let cookieAry = document.cookie.split(";");
      let cookie;
      let arr;
      for (let i = 0, l = cookieAry.length; i < l; ++i) {
        cookie = cookieAry[i].trim();
        cookie = cookie.split("=");
        if (cookie[0] === "like") {
          arr = cookie[1];
          if (arr.indexOf(id) !== -1) {
            arr = arr.split(",");
            if (arr.length <= 1) {
              document.cookie = "like=;expires=7;path=/";
            } else {
              arr.splice(arr.indexOf(id), 1);
              document.cookie = `like=${arr};expires=7;path=/`;
            }
            vm.$bus.$emit("message:push", "已移除喜好項目", "danger");
            vm.isLiked = false;
          } else if (arr.indexOf(id) == -1) {
            if (arr.length !== 0) {
              arr = arr + "," + id;
            } else {
              arr = id;
            }
            document.cookie = `like=${arr};expires=7;path=/`;
            vm.$bus.$emit("message:push", "已加入喜好項目", "dark");
            vm.isLiked = true;
          }
        } else if (document.cookie.indexOf("like") == -1) {
          document.cookie = `like=${id};expires=7;path=/`;
          vm.$bus.$emit("message:push", "已加入喜好項目", "dark");
          vm.isLiked = true;
        }
      }
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data.carts;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`;
    vm.$http.get(api).then((res) => {
      if (res.data.success) {
        let arr = res.data.products;
        const set = new Set();
        arr.filter((item) =>
          !set.has(item.category) ? set.add(item.category) : false
        );
        let temCategory = [...set];
        temCategory.forEach(function(item) {
          vm.categories.push({ title: item, num: 0, path: "" });
        });
        vm.categories.unshift({ title: "全部", num: 0, path: "" });
        let arr2 = [];
        for (let i = 1; i < vm.categories.length; i++) {
          let arr = res.data.products.filter(function(item) {
            return item.category === vm.categories[i].title;
          });
          arr2.push(arr.length);
        }
        arr2.unshift(arr.length);
        for (let j = 0; j < arr2.length; j++) {
          vm.categories[j].num = arr2[j];
        }
        let arr3 = vm.categories;
        let arr4 = ["all", "Castorland", "Clementoni", "Ravensburger"];
        for (let i = 0; i < arr3.length; i++) {
          arr3[i].path = arr4[i];
        }
        vm.categories = arr3;
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
    });
    vm.getProduct();
    vm.getCart();
  },
};
</script>

<style lang="scss" scoped>
p,
pre {
  font-size: 16px !important;
}

.media {
  &-pc-img {
    object-fit: contain;
    height: 330px;
    width: 100%;
  }
  &-mobile-img {
    width: 90vw;
    height: auto;
    margin: 0 auto;
  }
}

.card {
  cursor: pointer;
}

@media screen and (min-width: 420px) and (max-width: 992px) {
  .pc {
    display: none;
  }

  .pad {
    display: block;
  }
}
</style>
