<template>
  <div>
    <div class="message-alert">
      <div
        class="alert alert-dismissible"
        :class="`alert-${item.status}`"
        v-for="(item, i) in messages"
        :key="i"
      >
        {{ item.message }}
        <button
          type="button"
          class="close"
          @click="removeMessage(i)"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

    <div v-if="this.$route.path.indexOf('admin') === -1 && this.$route.path !== '/login' && this.$route.path !== '/cart'  ">
      <router-link
        v-if="this.$route.path.indexOf('test') === -1 && cart.num > 0"
        to="/cart"
      >
        <div class="cart">
          <span v-if="cart.num > 0" class="badge cart-badge badge-danger">
            {{ cart.num }}
          </span>
          <i
            :class="{ 'text-muted': cart.num === 0, 'text-dark': cart.num > 0 }"
            class="fa fa-shopping-cart"
            aria-hidden="true"
          ></i>
        </div>
      </router-link>
      <a
        href="#"
        @click.prevent="goCart"
        v-if="this.$route.path.indexOf('test_order') !== -1"
      >
        <div class="cart">
          <span class="badge cart-badge badge-danger">
            {{ cart.num }}
          </span>
          <i
            class="fa fa-shopping-cart text-dark"
            aria-hidden="true"
          ></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Navbar',
  data () {
    return {
      messages: [],
      cart: { num: 0 }
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    getCart () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.cart.num = res.data.data.carts.length
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    goCart () {
      const screenWidth = document.documentElement.clientWidth
      if (screenWidth < 768) {
        $('html,body').animate(
          { scrollTop: $('#cart-list-sm').offset().top },
          800
        )
      } else {
        $('html,body').animate(
          { scrollTop: $('#cart-list-lg').offset().top },
          800
        )
      }
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.getCart()
      vm.updateMessage(message, status)
    })
  },
  watch: {
    $route: function () {
      this.getCart()
    }
  }
}
</script>

<style lang="scss" scope>
.message-alert {
  position: fixed;
  max-width: 80%;
  top: 56px;
  right: 10px;
  z-index: 1100;
  & .close {
    line-height: 16px;
  }
}

.cart {
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  right: 30px;
  position: fixed;
  z-index: 99999;
  bottom: 50px;
  border: 1px solid #aaa;
  &-badge {
    position: absolute;
    top: 3px;
    right: 3px;
  }
  & i {
    font-size: 25px;
    line-height: 50px;
  }
}
</style>
