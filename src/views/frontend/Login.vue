<template>
  <div>
    <loading :active.sync="isLoading">
      <h4>載入中 請稍候...</h4>
    </loading>
    <form class="form-signin text-dark" @submit.prevent="signin">
      <b class="text-danger">***限管理員操作***</b>
      <h1 class="h3 my-3 font-weight-normal">後台登入</h1>
      <label for="inputEmail" class="sr-only">請輸入信箱</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入信箱"
        required
        v-model="user.username"
      />
      <label for="inputPassword" class="sr-only">請輸入密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        required
        v-model="user.password"
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" v-model="remember" value="remember-me" />
          自動填入
        </label>
      </div>
      <button class="btn btn-lg btn-dark mt-3 btn-block" type="submit">
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      remember: false
    }
  },
  methods: {
    signin () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}admin/signin`
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token
          const expired = res.data.expired
          vm.$router.push('/admin/products')
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
      })
    }
  },
  watch: {
    remember: function (newV) {
      const vm = this
      if (newV) {
        vm.user = { username: 'test@foo.bar', password: 'qweqwe' }
      } else {
        vm.user = { username: '', password: '' }
      }
    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  padding-top: 60px;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
