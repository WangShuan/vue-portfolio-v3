<template>
  <div class="container">
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>

    <div class="row mb-3">
      <CategoryList
        class="lg col-lg-3"
        :categories="categories"
        :active="active"
        @getProducts="getProducts"
      ></CategoryList>

      <div class="col-lg-9">
        <h4 class="my-lg-4 mt-4 text-left">商品列表</h4>
        <div class="dropdown sm md">
          當前商品類別：
          <button class="btn btn-sm border-dark mb-1 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ active.name }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              v-for="item in categories"
              href="#"
              :key="item.title"
              :class="{ active: item.title === active.name }"
              @click.prevent="getProducts(item.path)"
              class="dropdown-item"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4" v-for="item in products" :key="item.id">
            <div class="card my-2"
                @click="$router.push(`/product/${item.id}`)"
            >
              <div
                class="card-img"
                :style="{
                  backgroundImage: `url(${item.imageUrl || item.image})`
                }"
              ></div>
              <div class="card-body">
                <h5 class="card-title">
                  {{ item.title }}
                  <br />
                  <small>
                    <span class="badge badge-secondary">
                      {{ item.category }}
                    </span>
                  </small>
                </h5>
                {{ item.content }}
                <div class="mt-2">
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
            </div>
          </div>
        </div>

        <Pagination
          v-if="active.path === 'all'"
          :pages="pagination"
          @event="getPage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CategoryList from '@/components/CategoryList'

export default {
  data () {
    return {
      isLoading: false,
      products: [],
      categories: [],
      active: { name: '', path: '' },
      pagination: {}
    }
  },
  components: { Pagination, CategoryList },
  watch: {
    products: () => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  methods: {
    getProducts (category = this.$route.params.category) {
      const vm = this
      vm.isLoading = true
      vm.$router.push('/products/' + category).catch((err) => err)
      vm.active.path = category
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          if (category === 'all') {
            vm.getPage()
            vm.active.name = '全部'
          } else {
            vm.products = res.data.products.filter((item) => {
              return item.category === category
            })
            vm.active.name = category
          }
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
      })
    },
    getPage (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products?page=${page}`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.products = res.data.products
          vm.pagination = res.data.pagination
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    getProduct (item) {
      this.$router.push(`/product/${item.id}`)
    },
    getCategory () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/products/all`
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          const arr = res.data.products
          const set = new Set()
          arr.filter((item) =>
            !set.has(item.category) ? set.add(item.category) : false
          )
          const temCategory = [...set]
          temCategory.forEach((item) => {
            vm.categories.push({ title: item, num: 0, path: '' })
          })
          vm.categories.unshift({ title: '全部', num: 0, path: '' })
          const arr2 = []
          for (let i = 1; i < vm.categories.length; i++) {
            const arr = res.data.products.filter((item) => {
              return item.category === vm.categories[i].title
            })
            arr2.push(arr.length)
          }
          arr2.unshift(arr.length)
          for (let j = 0; j < arr2.length; j++) {
            vm.categories[j].num = arr2[j]
          }
          const arr4 = ['all', 'Castorland', 'Clementoni', 'Ravensburger']
          for (let i = 0; i < vm.categories.length; i++) {
            vm.categories[i].path = arr4[i]
          }
          vm.getProducts()
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getCategory()
    this.getProducts()
    this.getPage(1)
  }
}
</script>

<style lang="scss" scoped>
.media-img {
  width: 35%;
}

.card-img{
  height: 200px;
  background-size: cover;
  background-position: center;
}

.card:hover{
  cursor: pointer;
  background-color: #343a40;
  color: #f8f9fa;
}

@media screen and (min-width: 420px) and (max-width: 992px) {
  .lg {
    display: none;
  }

  .md {
    display: block;
  }
}
</style>
