<template>
  <div style="padding-bottom: 0.5em">
    <div class='zindex'>
        <h4 align="center">Chatting room</h4>
        <b-list-group>
          <b-list-group-item id="container" class="list-group mb-9 zindex">
            <p v-for="(msg, idx) in msgs" :key="idx">{{ msg.content }}</p>
          </b-list-group-item>
        </b-list-group>
    </div>
    <css-doodle class="background1">
      :doodle { @grid: 15 / 100vmax; background: #fff; cursor: pointer; }
      :doodle(:hover) { --s: 1 ; } :after { content:
      @pick(DOGE,BTC,ETH,ETC,XRP); font-size: 4vmax; color: #ececec; transform:
      scale(@rand(.2, .9)); } transition: .5s cubic-bezier(.175, .885, .32,
      1.275); transition-delay: @rand(650ms); transform:
      translateY(calc(var(--s) * 100%)) rotate(calc(var(--s) * 360deg));
    </css-doodle>
  </div>
</template>

<script>
export default {
  props: ["msgs"],
};
</script>

<style>
.zindex {
  z-index: 2;
  position: absolute;
  top: 100px;
  left: auto;
  bottom: auto;
  /* right: auto; */
}
.list-group {
  top: 300px;
  height: 300px;
  max-height: 300px;
  max-width: 300px;
  margin-bottom: 10px;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
}
.background1 {
  z-index: 1;
  position: absolute;
  font: 900 100px/0.65 system-ui;
  margin: 0;
  overflow: hidden;
  width: 100%;
}
/* span {
  display: inline-block;
  text-indent: 0rem;
  position: relative;
} */
/* .abs1 {
  position: absolute;
  margin-top: 130px;
  left: auto;
  bottom: auto;
  right: auto;
} */
</style>
