<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div id="section-holdem" class="programinfo">
    <div class="container">
      <div id="texas" class="two_third_contact lastcolumn">
        <div id="blockTitle1" class="block_title uk-animation-scale-down">
          <h2>Texas <span class="secondtxt">Hold 'em</span></h2>
          <div class="g-hr type_short">
            <span class="g-hr-h"><i class="fa fa-dot-circle-o"></i></span>
          </div>
          <h3 class="subtitle_poker">
            Texas Hold’em is the most popular of all poker variations.
          </h3>
        </div>

        <p>
          Texas Hold’em is the most popular of all poker variations. Whether
          you’re a seasoned player or a beginner, understanding the basic rules
          of Texas Hold’em is essential. Let’s dive into the details.
        </p>
      </div>
    </div>
    <div class="container texas-space">
      <div class="grid_item content-item fadeInUp my-5">
        <img
          style="max-width: 40%"
          class="img_holdem"
          src="/assets/images/2.jpg"
          alt=""
        />
      </div>
      <div class="clear"></div>
      <!-- tabs -->
      <div class="more">
        <ul class="ca-menu">
          <li
            @click="
              router.push({ name: 'Details', params: { title: 'pokerRake' } })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="/public/assets/images/rake1.jpg"
                    alt=""
                  />
                </div>

                <div class="ca-content">
                  <h2 class="ca-main">What is Rake?</h2>
                  <p>
                    Rake refers to the scaled commission taken by a casino to
                    pay for its operating costs. Rake is collected in
                    tournaments
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
          <li
            @click="
              router.push({
                name: 'Details',
                params: { title: 'howToPlayPoker' },
              })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="../../assets/home/images/1.jpg"
                    alt=""
                  />
                </div>

                <div class="ca-content">
                  <h2 class="ca-main">How to Play Poker?</h2>
                  <p>
                    Learning poker is easy. But have you ever wondered why not
                    everyone wins at poker? The reason is that poker is a
                    skill-based card game.
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
          <li
            @click="
              router.push({
                name: 'Details',
                params: { title: 'howToPlayBackgammon' },
              })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="../../assets/home/images/howToPlayBackgammon.jpg"
                    alt=""
                  />
                </div>

                <div class="ca-content">
                  <h2 class="ca-main">How to Play Backgammon</h2>
                  <p>
                    Players take turn rolling the dice. A player may move his
                    checkers based on the number rolled by the dice.
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
          <li
            @click="
              router.push({
                name: 'Details',
                params: { title: 'pokerVsBackgammon' },
              })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="../../assets/home/images/pokerVsBackgammon.jpg"
                    alt=""
                  />
                </div>
                <div class="ca-content">
                  <h2 class="ca-main">Backgammon vs Poker</h2>
                  <p>
                    Is there a Big Difference? Backgammon and poker have often
                    been shown as games of a similar nature.
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
          <li
            @click="
              router.push({
                name: 'Details',
                params: { title: 'pokerHistory' },
              })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="../../assets/home/images/pokerHistory.jpg"
                    alt=""
                  />
                </div>
                <div class="ca-content">
                  <h2 class="ca-main">Poker History</h2>
                  <p>
                    The game we know as poker is believed to have ancient roots
                    that go back nearly 1,000 years,
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
          <li
            @click="
              router.push({
                name: 'Details',
                params: { title: 'BackGammonHistory' },
              })
            "
            class="select"
          >
            <div class="box-content">
              <div class="box-info">
                <div class="img-content">
                  <img
                    class="ca-icon"
                    src="../../assets/home/images/3.jpg"
                    alt=""
                  />
                </div>
                <div class="ca-content">
                  <h2 class="ca-main">Backgammon History</h2>
                  <p>
                    Backgammon has been played for almost 5,000 years, which is
                    proof enough that it is a lot of fun.
                  </p>
                  <h3 class="ca-sub">See More</h3>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- <div class="content-counter">
        <h2 class="section_title_white">
          SOME <span class="secondtxt">FUN FACTS</span>
        </h2>
        <div class="facts">
          <div class="fact">
            <a class="fact-icon"><i class="fa fa-briefcase"></i></a>
            <div class="fact-number" data-perc="630">
              <h1 class="factor light">630</h1>
              <h3 class="light uppercase">Project Finished</h3>
            </div>
          </div>
          <div class="fact">
            <a class="fact-icon"><i class="fa fa-pagelines"></i></a>
            <div class="fact-number" data-perc="250">
              <h1 class="factor">250</h1>
              <h3 class="light uppercase">Clients Worked</h3>
            </div>
          </div>
          <div class="fact">
            <a class="fact-icon"><i class="fa fa-comments"></i></a>
            <div class="fact-number" data-perc="320">
              <h1 class="factor light">320</h1>
              <h3 class="light uppercase">Pizza Ordered</h3>
            </div>
          </div>
          <div class="last fact">
            <a class="fact-icon"><i class="fa fa-coffee"></i></a>
            <div class="fact-number" data-perc="840">
              <h1 class="factor light">840</h1>
              <h3 class="light uppercase">Coffee Cups</h3>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  <!-- <section id="top_banner" class="paralax1">
    <div class="background-black"></div>
    <div class="quote-icon">
      <img src="../../assets/home/images/icon_logo2.png" alt="" />
    </div>
    <article>
      <div class="container img_arrow">
        <div class="one_third_banner holdem_banner">
          <p class="title_ban"><span class="">Italian Chanpionship! </span></p>
          <hr />
          <div class="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1a">
            <a href="#" class="ita"></a>
          </div>
          <p class="desc_ban">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>
        <div class="one_third_banner holdem_banner">
          <p class="title_ban"><span class="">France Chanpionship! </span></p>
          <hr />
          <div class="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1a">
            <a href="#" class="fr"></a>
          </div>
          <p class="desc_ban">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>
        <div class="one_third_banner holdem_banner last">
          <p class="title_ban"><span class="">Poland Chanpionship! </span></p>
          <hr />
          <div class="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1a">
            <a href="#" class="gr"></a>
          </div>
          <p class="desc_ban">
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas.
          </p>
        </div>
      </div>
    </article>
    <div class="parallax"></div>
  </section> -->
</template>

<style scoped>
@import url(../../assets/home/css/base_style.css);
@import url(../../assets/home/css/share_style.css);
@import url(../../assets/home/css/layout1_style.css);
@import url(../../assets/home/css/font-awesome-4.0.1/css/font-awesome.min.css);

h3 {
  color: #000 !important;
}
</style>
