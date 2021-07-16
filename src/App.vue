<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// import Chat from '@/components/Chat.vue';
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
.sr-only {
  display: none;
}
.background {
  z-index: -1;
  position: absolute;
  font: 900 100px/0.65 system-ui;
  margin: 0;
  overflow: hidden;
  width: 100%;
}
</style>
