<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a
            class="page-link text-secondary"
            href="#"
            @click.prevent="getPages(pages.current_page - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="item in pages.total_pages" :key="item">
          <a
            class="page-link text-secondary"
            href="#"
            @click.prevent="getPages(item)"
          >
            {{ item }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a
            class="page-link text-secondary"
            href="#"
            @click.prevent="getPages(pages.current_page + 1)"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['pages'],
  methods: {
    getPages (num) {
      this.$emit('event', num)
    }
  }
}
</script>
