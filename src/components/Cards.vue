<template>
  <div>
    <div class="row d-inline-flex text-dark">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="item in products"
        :key="item.id"
      >
        <div class="card border-0 shadow-sm">
          <img
            :src="`${item.imageUrl || item.image}`"
            alt
            style="width:100%;height:250px;object-fit:contain "
          />
          <div class="card-body">
            <h5 class="card-title m-0">{{ item.title }}</h5>
            <span class="badge badge-secondary p-1">{{ item.category }}</span>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6 text-muted m-auto" v-if="item.price">
                原價${{ item.origin_price }}
              </del>
              <div class="h5 text-dark m-auto" v-if="item.price">
                現在只要${{ item.price }}
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn border border-dark btn-sm"
              @click="getOneProduct(item.id)"
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
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['products'],
  methods: {
    getProducts () {
      this.$emit('getProducts')
    },
    getOneProduct (id) {
      this.$emit('getOneProduct', id)
    },
    addCart (id) {
      this.$emit('addCart', id)
    }
  },
  created () {
    this.$emit('getProducts')
  }
}
</script>
