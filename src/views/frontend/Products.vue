<template>
  <div class="container text-dark">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>

    <div class="row mb-3">
      <CategoryList
        class="pc col-lg-3"
        :categories="categories"
        :active="active"
        @getProducts="getProducts"
      ></CategoryList>

      <div class="col-lg-9">
        <h4 class="my-lg-4 mt-4 text-left">商品列表</h4>
        <div class="btn-group mobile pad text-dark mb-2">
          當前商品類別：
          <a
            class="text-primary h6"
            data-toggle="dropdown"
            data-display="static"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{active.name}}
            <i class="fa fa-caret-down text-warning" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-lg-right">
            <button
              v-for="item in categories"
              :key="item.title"
              :class="{active: item.title === active.name}"
              @click.prevent="getProducts(item.path)"
              class="dropdown-item"
              type="button"
            >{{item.title}}</button>
          </div>
        </div>

        <div class="card-columns">
          <div
            :class="{ 'd-none': item.is_enabled !== 1 }"
            class="card p-1"
            v-for="item in products"
            :key="item.id"
            @click="getProduct(item)"
          >
            <img :src="item.imageUrl" :alt="item.title" class="card-img-top" />
            <div class="card-body p-2">
              <h5>{{ item.title }}</h5>
              <p class="card-text text-primary">{{ item.content }}</p>
            </div>
            <div class="mb-2">
              <h4 v-if="item.is_enabled == 1" class="text-center">
                <template v-if="item.price > 0">
                  <del class="h6 text-muted">原價 {{ item.origin_price }} 元</del>
                  <h3 class="ml-2">
                    <b class="text-danger p-1">{{ item.price }}元</b>
                  </h3>
                </template>
                <h3 v-else>
                  <b class="text-danger p-1">定價 {{ item.origin_price }}元</b>
                </h3>
                <button @click.stop="addCart(item.id)" class="btn w-100 btn-danger">加入購物車</button>
              </h4>

              <h5 class="text-danger" v-if="item.is_enabled !== 1">
                <i>
                  商品未啟用
                  <br />
                  <small>(缺貨/已售完)</small>
                </i>
              </h5>
            </div>
          </div>
        </div>

        <Pagination v-if="active.path=='all'" :pages="pagination" @event="getPage"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      categories: [],
      active: { name: "", path: "" },
      pagination: {},
      cart: [],
    };
  },
  components: { Pagination, CategoryList },
  methods: {
    getProducts(category = this.$route.params.category) {
      const vm = this;
      vm.isLoading = true;
      vm.$router.push("/products/" + category).catch((err) => err);
      vm.active.path = category;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          if (category == "all") {
            vm.products = res.data.products;
            vm.active.name = "全部";
            vm.pagination.current_page = 1;
          } else if (category == "Castorland") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "Castorland";
            });
            vm.active.name = "Castorland";
          } else if (category == "Clementoni") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "Clementoni";
            });
            vm.active.name = "Clementoni";
          } else if (category == "Ravensburger") {
            vm.products = res.data.products.filter(function (item) {
              return item.category === "Ravensburger";
            });
            vm.active.name = "Ravensburger";
          }
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
      });
    },
    getPage(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products?page=${page}`;
      this.$http.get(api).then((res) => {
        vm.isLoading = false;
        if (res.data.success) {
          vm.products = res.data.products;
          vm.pagination = res.data.pagination;
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
      });
    },
    // addCart(id, num = 1) {
    //   const vm = this;
    //   vm.isLoading = true;
    //   const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
    //   this.$http
    //     .post(api, { data: { product_id: id, qty: num } })
    //     .then((res) => {
    //       vm.isLoading = false;
    //       if (res.data.success) {
    //         vm.$bus.$emit("message:push", res.data.message, "success");
    //       } else {
    //         vm.$bus.$emit("message:push", res.data.message, "danger");
    //       }
    //     });
    // },
    getProduct(item) {
      if (item.is_enabled !== 1) {
        this.$bus.$emit("message:push", "無法前往未啟用之商品頁面", "danger");
        return false;
      }
      this.$router.push(`/product/${item.id}`);
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
              vm.$bus.$emit("message:push", "購物車清單已更新", "success");
            } else {
              vm.$bus.$emit("message:push", res.data.message, "danger");
            }
          });
      }
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${id}`;
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit("message:push", "購物車清單已更新", "success");
        } else {
          vm.$bus.$emit("message:push", res.data.message, "danger");
        }
        vm.isLoading = false;
        vm.getCart();
      });
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
    this.$http.get(api).then((res) => {
      if (res.data.success) {
        let arr = res.data.products;
        const set = new Set();
        arr.filter((item) =>
          !set.has(item.category) ? set.add(item.category) : false
        );
        let temCategory = [...set];
        temCategory.forEach(function (item) {
          vm.categories.push({ title: item, num: 0, path: "" });
        });
        vm.categories.unshift({ title: "全部", num: 0, path: "" });
        let arr2 = [];
        for (let i = 1; i < vm.categories.length; i++) {
          let arr = res.data.products.filter(function (item) {
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
        vm.getProducts();
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
    });
    vm.getPage();
    vm.getCart();
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}

.media-img {
  width: 35%;
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