<template>
  <div>
    <loading :active.sync="isLoading">
      <div class="loadingio-spinner-spin-ur5grgaunp">
        <div class="ldio-dwsbgiuamos">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </loading>

    <div class="lg mt-5">
      <div class="float-left">
        <h4 class="mt-3 font-weight-bold">
          <i class="fa fa-ticket" aria-hidden="true"></i>
          優惠碼管理
        </h4>
      </div>
      <div class="float-right">
        <button
          class="btn btn-dark font-weight-bold mt-2 mb-3"
          @click="openModal(true)"
        >
          添加新優惠券
        </button>
      </div>
      <table class="table table-striped table-bordered mt-4 text-dark">
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">到期日</th>
            <th scope="col">是否啟用</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td scope="row">
              {{ item.title }} - {{ item.percent }}% off
              <br />
              <i class="text-muted">
                優惠碼 -
                <b class="text-secondary">{{ item.code }}</b>
              </i>
            </td>
            <td>{{ new Date(item.due_date).toLocaleDateString() }}</td>
            <td class="font-weight-bold">
              <span v-if="item.is_enabled" class="text-dark">已啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td>
              <button
                class="btn btn-outline-dark btn-sm mr-lg-2 font-weight-bold"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-dark btn-sm font-weight-bold"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="sm">
      <div class="float-left">
        <h5 class="font-weight-bold">
          <i class="fa fa-ticket"></i>
          優惠碼管理
        </h5>
      </div>
      <div class="float-right mb-3">
        <button
          class="btn btn-dark font-weight-bold btn-sm"
          @click="openModal(true)"
        >
          添加新優惠券
        </button>
      </div>
      <table class="table table-striped table-bordered text-dark">
        <thead>
          <tr>
            <th scope="col">操作</th>
            <th scope="col">優惠券 - click to edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>
              <button
                @click="openDelModal(item)"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                <i class="fa fa-trash"></i>
              </button>
            </td>
            <td scope="row" @click="openModal(false, item)">
              {{ item.title }} - {{ item.percent }}% off
              <br />
              <i>
                優惠碼 -
                <b>{{ item.code }}</b>
              </i>
              <br />
              <i class="text-muted">
                {{ new Date(item.due_date).toLocaleDateString() }} 截止
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pages="pagination" @event="getCoupons"></Pagination>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">優惠券名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入名稱"
                    v-model="tempCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      placeholder="請輸入百分比"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      placeholder="請輸入到期日"
                      v-model="tempCoupon.due_date"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="請輸入優惠碼"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-dark"
              @click="updateCoupon(tempCoupon)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-light" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body lead">
            是否刪除<br />
            <strong class="text-light bg-dark p-1">
              {{ tempCoupon.title }}
            </strong>
            <br />
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-dark" @click="deleteCoupon()">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupons?page=${page}`
      vm.$http.get(api).then((res) => {
        vm.isLoading = false
        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.pagination = res.data.pagination
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      vm.isLoading = true

      let httpMethod = 'post'
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupon`
      if (!vm.isNew) {
        api = `${api}/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.tempCoupon.due_date = Date.parse(vm.tempCoupon.due_date)
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          $('#couponModal').modal('hide')
        } else {
          $('#couponModal').modal('hide')
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        vm.isLoading = false
        vm.getCoupons()
      })
    },
    openDelModal (item) {
      this.tempCoupon = { ...item }
      $('#delCouponModal').modal('show')
    },
    deleteCoupon () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit('message:push', res.data.message, 'dark')
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
        }
        $('#delCouponModal').modal('hide')
        vm.isLoading = false
        vm.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  },
  components: {
    Pagination
  }
}
</script>
