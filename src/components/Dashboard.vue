<template>
  <div>
    <div class="container-fluid">
      <Navbar></Navbar>
      <MessageAlert></MessageAlert>
      <div class="row mt-3">
        <Sidebar></Sidebar>
        <main role="main" class="mt-1 ml-sm-auto col-md-9 col-lg-10 px-4 pt-0">
          <router-view :key="this.$route.name"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MessageAlert from '@/components/MessageAlert'

export default {
  components: {
    Sidebar,
    Navbar,
    MessageAlert
  },
  created () {
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>

<style>
@media screen and (max-width: 420px) {
  .container-fluid {
    padding: 0;
    max-width: 100vw;
    overflow: hidden;
  }
}
</style>
