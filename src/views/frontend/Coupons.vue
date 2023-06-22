<template>
  <div class="container text-dark">
    <div class="lg mb-5">
      <h3 class="py-4 border-bottom">
        <i class="fa fa-ticket"></i>
        優惠券專區
      </h3>
      <i>
        <h4 class="pt-3 text-muted">新客優惠</h4>
      </i>
      <div class="row">
          <div
          class="col-lg-4 col-md-6 m-auto"
        >
          <div class="sawtooth bg-warning p-2 my-4">
            <div class="float-left pt-2 sawtooth-big">
              <h1 class="m-0 mb-2">
                88
                <small>折</small>
              </h1>
              <button
                class="btn rounded px-1 py-0 btn-sm btn-danger"
                @click="copyBtn('new88')"
              >
                點擊領取
              </button>
              <input
                type="text"
                class="mt-5 text-center input-bg"
                id="new88"
                value="new88"
              />
            </div>
            <div class="float-right pt-3 border-left sawtooth-content">
              <h5 class="text-dark">新客專屬優惠碼</h5>
              <p>
                全館不限金額皆享優惠
                <br />
                <u class="text-dark">
                  無使用期限 - 限首購
                </u>
              </p>
            </div>
            <div class="bg-icon">
              <div class="icon-big">🎁</div>
            </div>
          </div>
        </div>
      </div>
      <i>
        <h4 class="pt-3 text-muted">其他優惠</h4>
      </i>
      <div class="row">
        <div
          class="col-lg-4 col-md-6 m-auto"
          v-for="item in coupons"
          :key="item.id"
        >
          <div class="sawtooth bg-light p-2 my-4">
            <div class="float-left pt-2 sawtooth-big">
              <h1 class="m-0 mb-2">
                {{ item.percent }}
                <small>折</small>
              </h1>
              <button
                class="btn rounded px-1 py-0 btn-sm btn-danger"
                @focus="copyBtn(item.code)"
              >
                點擊領取
              </button>
              <input
                type="text"
                class="mt-5 text-center input-bg"
                :id="item.code"
                :value="item.code"
              />
            </div>
            <div class="float-right pt-3 border-left sawtooth-content">
              <h5 class="text-dark">{{ item.title }}</h5>
              <p>
                全館不限金額皆享優惠
                <br />使用期限至
                <u class="text-dark">
                  {{ new Date(item.due_date).toLocaleDateString() }}
                </u>
              </p>
            </div>
            <div class="bg-icon">
              <div class="icon-big">🎊</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-3 sm">
      <h5 class="my-3">
        <i class="fa fa-ticket"></i>
        優惠券專區
      </h5>
      <div>
        <div class="card mb-5 bg-white">
          <div class="card-body index">
            <h5 class="card-title h6 text-dark">新客加碼送！</h5>
            <hr />
            <p class="card-text text-dark">
              全館不限金額享
              <span class="text-danger font-width-bolder">88 折</span>
              優惠
              <br />無使用期限
              <br />
              <br />
              <span>立即點擊複製下方優惠碼並在結帳時使用</span>
            </p>
            <input
              type="text"
              class="text-center text-muted input-bg"
              value="new88"
              @focus="copy"
            />
          </div>
          <div class="sm-bg-icon">
            <div class="icon-big">🎁</div>
          </div>
        </div>
      </div>
      <div v-for="item in coupons" :key="item.id">
        <div class="card mb-5 border-0 bg-light">
          <div class="card-body index">
            <h5 class="card-title h6 text-secondary">{{ item.title }}</h5>
            <hr />
            <p class="card-text text-dark">
              全館不限金額享
              <span class="text-danger font-width-bolder">
                {{ item.percent }} 折
              </span>
              優惠
              <br />
              使用期限至 {{ new Date(item.due_date).toLocaleDateString() }}
              <br />
              <br />
              <span class="text-muted">
                立即點擊複製下方優惠碼並在結帳時使用
              </span>
            </p>
            <input
              type="text"
              class="text-center text-secondary input-bg"
              @focus="copy"
              v-model="item.code"
            />
          </div>
          <div class="sm-bg-icon">
            <div class="icon-big">🎊</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coupons: [
        {
          code: 'GAMESKY9',
          due_date: 1631750400000,
          num: 1,
          percent: 9,
          title: '週年慶優惠券'
        },
        {
          code: '8YEARS8',
          due_date: 1665878400000,
          id: 2,
          percent: 8,
          title: '開幕八週年優惠券'
        },
        {
          code: 'LOVEYOUTHX75',
          due_date: 1613865600000,
          id: 3,
          percent: 75,
          title: '佛心優惠券限時搶購'
        }
      ]
    }
  },
  methods: {
    copy (e) {
      e.currentTarget.select()
      document.execCommand('Copy')
      this.$bus.$emit('message:push', '複製成功', 'dark')
    },
    copyBtn (id) {
      const ipt = document.getElementById(id)
      ipt.select()
      document.execCommand('copy')
      this.$bus.$emit('message:push', '複製成功', 'dark')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_coupons.scss";
</style>
