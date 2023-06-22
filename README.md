# vue 出一個電商教學手冊

## 專案說明

該專案使用 `vue-cli v3` 以上版本 並添加了 `ESLint`

  * 若一開始沒有為專案添加 ESLint 可通過以下方式加入：

    1. 開啟終端機 切到當前專案資料夾

    2. 輸入 `vue add eslint`

    3. 選擇風格(不熟悉者建議選擇 Standard 風格)

## 結構說明

### src

主要用到的檔案都在 `src` 這個資料夾中

`src/main.js` 是入口文件 裡面處理各種插件的配置

`src/router/index.js` 專門處理所有路由元件的檔案

`src/App.vue` 是整個 vue 實例

`src/assets/scss` 資料夾存放需要用到的樣式

`src/assets/image` 資料夾存放需要用到的圖片

`src/components` 資料夾存放共用的元件

### views

用來存放要作為頁面的檔案 

 - 這裏為了區別前後台 另外添加了 `backend` `frontend` 兩個資料夾

### public

裡面存放不需要被編譯的檔案 以及最主要的 `index.html`

 - `index.html` 例外 會被編譯

### 其他自行創建的檔案

 - `.env` 用來設定環境變量

 - `webpack.config.js` 用來設定路徑 在該檔案中設定用 `@` 取代 `src` 資料夾路徑

 - `vue.config.js` 用來設定生產環境模式下的 `gh-page` 引用路徑

 - `.editorconfig` 加入 ESLint 後自動創建的檔案

 - `jsconfig.json` 手動設定 ESLint

## 一些比較重要的代碼詳解

### 1. 路由守衛

vue-router 中提供了一個路由守衛的功能，我們可以藉由它來阻止路由跳轉，比如某些頁面需要登入後才能訪問，就可以藉由路由守衛判斷登入狀態再進行頁面訪問。

```js
 
router.beforeEach((to, from, next) => {
  // 這裏更改網頁的 title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 這裏檢查是否登入
  if(to.meta.requiresAuth) {
    const api = process.env.APIPATH + "api/user/check"
    axios.post(api).then((res) => {
      if(!res.data.success) {
        next({ path: '/login' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

```

### 2. 子路由使用方式

 - 通過在需要路由守衛的元件中添加上 `meta: { requiresAuth: true },` 後路由守衛就會幫忙判定登入狀態

 - 通過在路由對象中添加 `children:[]` 就可以增加子路由 子路由會生成在父組件中放有 `<router-view></router-view>` 標籤的位置

 - 在路由中可以添加上 `{path: '*',redirect: '/'}` 即可讓所有沒被定義的路徑都會重定向到首頁

 - 在路由對象中添加 `meta: { title: '拼圖迷 - 進口拼圖專賣店'}` 可以更改`index.html` 的 `title`

 - `vue-cli v3` 以上的版本可以通過新的方法引入 `.vue` 檔 代碼如下：

```js

component: () => import('../views/frontend/About.vue')

```

### 3. vue-loading 用法

在代碼的最上面加入以下內容後即可通過 vue 中 data 下的 `isLoading` 資料狀態 來切換是否為載入中

* 其樣式可到 `https://loading.io/` 中抓取使用

### 4. 切換與判斷路由

* 可以在標籤中直接通過 `@click="$router.push('/')` 跳轉路由到 '/'

* 可以使用 `this.$route.path!=='/'` 判斷路由是否為 '/'

* 可以使用 `this.$route.fullPath` 獲取當前路由的完整路徑

* 假設使用同個路由不同參數要切換時可以通過 `vm.$router.push("/products/" + category).catch((err) => err);` 來阻止報錯與頁面不刷新的問題

### 5. style 相關

* 在元件中的 style 標籤上添加 `scoped` 就可以讓該元件的樣式僅在該元件中被使用

* 可以通過在元件中的 style 標籤上添加 `lang="scss"` 來改變 css 語言

合併使用代碼如下：

```html

<style lang="scss" scoped>

</style>

```

### 6. cookie 相關

該專案使用 cookie 保存了喜好項目與後台的登入狀態

主要代碼分別在 `Login.vue` `Dashboard.vue` `Like.vue`

* 登入的部分

  在 `Login.vue` 中保存了登入的 `token` 主要代碼如下：

  ```js

  this.$http.post(api, vm.user).then((res) => {
    if (res.data.success) {
      const token = res.data.token;
      const expired = res.data.expired;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
    }
  })

  ```

  接下來在 `Dashboard.vue` 中將登入成功後取得的 token 設定於每次 request 中的 header 參數

  如下：

  ```js

  created() {
    // 在登入時我們將 cookie 存到 hexToken 中，這裏就是獲取 hexToken 的值
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");
    // 這句是主要代碼 將 hexToken 的值 設定到 axios 的請求頭中
    this.$http.defaults.headers.common.Authorization = myCookie;
  },

  ```

* 喜好項目

在 `Product.vue` 中直接判斷 cookie 裡面是否含有產品的 id 如果有代表該產品是喜好項目

在 `Like.vue` 中把所有 cookie 分成鍵對值然後判斷是否有 `like` 這個鍵 再獲取它對應的值從而取得所有喜好項目的產品 id

取得後再將所有 id 渲染成一個個的產品顯示於喜好項目列表中

主要代碼如下：

```js

let cookieObj = {};
let cookieAry = document.cookie.split(";");
let cookie;
let arr;
for (var i = 0, l = cookieAry.length; i < l; ++i) {
  cookie = cookieAry[i].trim();
  cookie = cookie.split("=");
  // cookie[0] => key ; cookie[1] => value
  if (cookie[0] === "like") {
    arr = cookie[1];
    // 如果有人添加過喜好項目又清空的話 arr 就會是空字符串
    // 所以這裡要判斷它的長度大於零確定 cookie 中有產品 id 
    if (arr.length !== 0) {
      // 這裡就是渲染喜好項目的 methods
      vm.getLikes(arr);
    }
  }
}

```

### 7. event Bus 使用

主要代碼在 `messageAlert.vue` 中 我將該專案中通過 event bus 建立提示訊息的同時生成購物車的數量

如下：

```js

vm.$bus.$on("message:push", (message, status = "warning") => {
  // 獲取購物車數量
  vm.getCart();
  // 生成互動訊息提示窗
  vm.updateMessage(message, status);
});

```

### 8. 添加購買品項時判斷是否重複

如果重複的產品想添加 就更新產品數量 不要讓購物車有兩個一樣的品項

實現方法為：

1. 用 `find` 方法判斷是否有重複的對象

2. 重複的對象提取出來 將其產品 id 數量記下 並刪除該對象

3. 當有重複的對象時 添加產品的 api 參數就傳入剛才記下的對象

主要代碼範例如下：

```js

addCart(id, num = 1) {
  const vm = this;
  let rel = vm.cart.find((item) => {
    return item.product_id === id;
  });
  let obj;
  if (rel) {
    obj = { product_id: rel.product_id, qty: num + rel.qty };
    vm.delCart(rel.id);
  } else {
    obj = { product_id: id, qty: num };
  }
  vm.isLoading = true;
  const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`;
  vm.$http.post(api, {data: obj,})
    .then((res) => {
      vm.isLoading = false;
      if (res.data.success) {
        vm.$bus.$emit("message:push", "購物車清單已更新", "success");
      } else {
        vm.$bus.$emit("message:push", res.data.message, "danger");
      }
    });
}

```

## 9. 結帳前重新確認品項

在購物車頁面中可以修改產品購買數量與添加優惠券

在最後按下確認結帳時才將剛才修改的數量與優惠券重新傳送

整個過程會先刪除原本購物車的內容 再添加更新後的數量與優惠券 

ajax 跑完後會開啟 modal 讓用戶填寫資料 按下送出後才跳轉至結帳頁面

主要代碼如下：

```js

goCheckout () {
  const vm = this
  // 判斷購物車內容是否更新過
  if (JSON.stringify(vm.cart) === JSON.stringify(vm.tempCart)) {
    $('#modal').modal('show')
  } else {
    vm.isLoading = true
    // 讓 tempCart 為更新後的購買內容
    vm.tempCart.carts = vm.cart.carts
    const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
    vm.$http.get(api).then((res) => {
      if (res.data.success) {
        // 重新獲取購買內容
        vm.cart = res.data.data
        let times = vm.cart.carts.length
        vm.cart.carts.forEach((item) => {
          times--
          let code = ''
          // 判斷是否有折價券
          if (vm.cart.carts[0].coupon) {
            code = vm.cart.carts[0].coupon.code
          }
          const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart/${item.id}`
          // 刪除所有購買產品
          vm.$http.delete(api).then()
          if (times === 0) {
            const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
            let times = vm.tempCart.carts.length
            // 重新添加更新後的購買產品、數量
            vm.tempCart.carts.forEach((item) => {
              const obj = { product_id: item.product_id, qty: item.qty }
              vm.$http.post(api, { data: obj }).then((res) => {
                if (res.data.success) {
                  times--
                  const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_MYPATH}/cart`
                  vm.$http.get(api).then((res) => {
                    if (res.data.success) {
                      vm.cart = res.data.data
                      vm.tempCart = vm.cart
                      // 判斷是否使用優惠券並添加優惠券
                      if (code !== '') {
                        vm.couponCode = code
                        if (times === 0) {
                          vm.addCoupon(false)
                          vm.isLoading = false
                        }
                      } else {
                        vm.getCart(true)
                      }
                    }
                  })
                }
              })
            })
            vm.$bus.$emit('message:push', '購物車清單已更新', 'dark')
          }
        })
      } else {
        vm.$bus.$emit('message:push', res.data.message, 'danger')
      }
    })
  }
}

```