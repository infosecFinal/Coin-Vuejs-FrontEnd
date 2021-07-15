<template>
  <footer>
    <pre></pre>
    <p>CopyRight CoinNet</p>
    <css-doodle class="background">
      :doodle { @grid: 15 / 100vmax; background: #fff; cursor: pointer; }
      :doodle(:hover) { --s: 1 ; } :after { content:
      @pick(DOGE,BTC,ETH,ETC,XRP); font-size: 4vmax; color: #ececec; transform:
      scale(@rand(.2, .5)); } transition: .5s cubic-bezier(.175, .885, .32,
      1.275); transition-delay: @rand(650ms); transform:
      translateY(calc(var(--s) * 100%)) rotate(calc(var(--s) * 360deg));
    </css-doodle>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  border-top: 1px solid #35495e;
  text-align: center;
  font-size: 16px;
  color: #000000;
  margin: 200px 0 0 0;
}
</style>
