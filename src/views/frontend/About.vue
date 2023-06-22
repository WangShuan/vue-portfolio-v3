<template>
  <div class="container ">
    <h2 class="my-4 text-dark">
      <i aria-hidden="true" class="fa fa-info mr-2"></i>
      關於拼圖迷
    </h2>
    <div class="lead">
      <p>
        本公司成立於2012年，由一群特別喜愛進口拼圖的同仁們合力創建，經過不斷接洽後，最終取得了三大品牌授權:
      </p>
      <div class="row lg">
        <div class="col-md-4 border my-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('castorland')"
            class="text-muted h2 mb-2"
          >
            <span class="small">波蘭</span>
            <br />Castorland
          </a>
        </div>
        <div class="col-md-4 border my-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('clementoni')"
            class="text-muted h2 mb-2"
          >
            <span class="small">義大利</span>
            <br />Clementoni
          </a>
        </div>
        <div class="col-md-4 border my-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('ravensburger')"
            class="text-muted h2 mb-2"
          >
            <span class="small">德國</span>
            <br />Ravensburger
          </a>
        </div>
      </div>
      <div class="row sm">
        <div class="border m-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('castorland')"
            class="text-muted h2 mb-2"
          >
            <span class="small">波蘭</span>
            <br />Castorland
          </a>
        </div>
        <div class="border m-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('clementoni')"
            class="text-muted h2 mb-2"
          >
            <span class="small">義大利</span>
            <br />Clementoni
          </a>
        </div>
        <div class="border m-3 py-3">
          <a
            href="#"
            @click.prevent="goBrand('ravensburger')"
            class="text-muted h2 mb-2"
          >
            <span class="small">德國</span>
            <br />Ravensburger
          </a>
        </div>
      </div>
      <p>
        並開始經營電商平台，致力於給進口拼圖迷們最好的服務，讓客戶們不必再到處尋求總是要等超級霹靂久的代購！
      </p>
    </div>
    <hr />
    <h3 class="py-3 text-dark">
      <i class="fa fa-quote-right"></i>
      各家品牌介紹
    </h3>
    <div class="card-group">
      <div class="card" id="castorland">
        <img
          alt="該品牌介紹圖"
          src="@/assets/image/castorland.jpg"
          class="card-img-top"
        />
        <div class="card-body">
          <h4 class="card-title">
            波蘭 - Castorland
          </h4>
          <p class="card-text text-lg">
            公司成立於1989年，拼圖切割方式是採規則切割，刀膜跟heye類似，拼片較薄，也因此形狀的辨識程度很不錯，結合程度分明。但其實若與美系的軟拼片比較，該品牌還是算較硬實的拼片，其拼片聲音清脆，手感很好，且拼圖的屑屑量並不多，拼組時只要滑進去即可。其印刷色澤也很棒，就算靠近去看也完全不會有模糊感。是波蘭有名的拼圖品牌！
          </p>
          <router-link to="/products/Castorland" class="btn btn-secondary"
            >搶購去 >></router-link
          >
        </div>
        <div class="card-footer">
          <span class="text-muted">最後更新於 2020/10/03</span>
        </div>
      </div>
      <div class="card" id="clementoni">
        <img
          alt="該品牌介紹圖"
          src="@/assets/image/clementoni.jpg"
          class="card-img-top"
        />
        <div class="card-body">
          <h4 class="card-title">
            義大利 - Clementoni
          </h4>
          <p class="card-text text-lg">
            Clementoni 拼圖公司是著名的義大利拼圖公司，
            以高雅藝術和優級質材製作， 頂級採景角度展現出優美的拼圖圖案，
            產品包括全球名勝地風景、博物館收藏的名畫，和兒童動畫圖，
            不愧是來自藝術之國義大利的拼圖廠牌。
            其迷人的原版拼圖擁有著紙材佳印刷清晰，
            色彩鮮明，刀切變化明顯不易錯放位置，
            打印、密和的精密度都是沒話說的高品質。 千萬不要錯過了！
          </p>
          <router-link to="/products/Clementoni" class="btn btn-secondary"
            >搶購去 >></router-link
          >
        </div>
        <div class="card-footer">
          <span class="text-muted">最後更新於 2020/10/03</span>
        </div>
      </div>
      <div class="card" id="ravensburger">
        <img
          alt="該品牌介紹圖"
          src="@/assets/image/ravensburger.jpg"
          class="card-img-top"
        />
        <div class="card-body">
          <h4 class="card-title">
            德國 - Ravensburger
          </h4>
          <p class="card-text text-lg">
            創始於1833年來自德國的百年拼圖品牌，該品牌在德國家喻戶曉。其名字
            Ravensburger
            是一個德國小鎮的名字，中文名“睿思”，取意於“睿智地思考”。該公司的每個拼圖畫面都是通過手工切割的，因此每幅拼圖的拼片都不一樣，每個拼片也只有在原生的圖畫中可以完全契合。該公司目前最多片數的拼圖有4萬多片，已打破世界紀錄。
          </p>
          <router-link to="/products/Ravensburger" class="btn btn-secondary"
            >搶購去 >></router-link
          >
        </div>
        <div class="card-footer">
          <span class="text-muted">最後更新於 2020/10/03</span>
        </div>
      </div>
    </div>
    <hr />
    <h3 class="py-3 text-dark"><i class="fa fa-map-signs"></i> 我們的追求</h3>
    <li class="media row">
      <img
        src="https://images.unsplash.com/photo-1472457847783-3d10540b03d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        class="col-lg-5 lg align-self-center"
        alt="飛高高圖片"
      />
      <div class="media-body col-lg-7 align-self-center">
        <h4 class="m-3">透過拼圖促進親子間的關係 ❤️</h4>
        <img
          alt="飛高高圖片"
          src="https://images.unsplash.com/photo-1472457847783-3d10540b03d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          class="col-lg-5 sm align-self-center"
        />
        <p class="lead">
          讓大人與小孩透過我們的產品獲得更多親子同樂時光，促進交流，
          <br />更可以提升小孩子的發展，活在拼圖與父母愛下成長的更好！
          <br />本公司販賣的各項益智拼圖都能幫助孩子提升專注力、觀察力，
          <br />還能促進大家靈活思考！手腦並用，使大人小孩都能玩得不亦樂乎 🎉
        </p>
      </div>
    </li>
    <li class="media my-3 row">
      <div class="media-body col-lg-7 align-self-center">
        <h4 class="m-3">陪伴您與您的子孫一同長大 ❤️</h4>
        <img
          src="https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
          alt="一起玩圖片"
          class="col-lg-5 sm align-self-center"
        />
        <p class="lead">
          我們從 2012 年開幕至今，已經擁有許多像家人般存在的老顧客了，
          <br />希望未來的八年、十八年、二十八年都能一路相伴到老！
          <br />您們的陪伴就是我們持續走下去的動力！感謝一路上有您義氣相挺！
          <br />我們還要繼續走過下一個金融風暴、繼續看您與您的子孫成長 ✨
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
        alt="一起玩圖片"
        class="col-lg-5 lg align-self-center"
      />
    </li>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {}
  },
  methods: {
    goBrand (id) {
      $('html,body').animate({ scrollTop: $(`#${id}`).offset().top }, 800)
    }
  }
}
</script>

<style scope>
.card-img-top {
  height: 240px;
}
</style>
