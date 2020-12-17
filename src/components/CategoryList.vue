<template>
  <div class="col-md pr-0">
    <h4 class="my-4 text-left lg">商品分類</h4>
    <ul class="p-0 m-0">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="item in categories"
        :key="item.title"
        :class="{ 'bg-secondary text-light': item.title === active.name }"
        @click="getProducts(item.path)"
      >
        {{ item.title }}
        <span class="badge badge-secondary badge-pill">{{ item.num }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['categories', 'active'],
  methods: {
    getProducts (item) {
      this.$emit('getProducts', item)
    }
  }
}
</script>
