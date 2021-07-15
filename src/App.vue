<template>
  <div>
    <Header />
    <div class="position-hc">
      <b-nav align="left" vertical class="w-25">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item active to="/login">login</b-nav-item>
        <b-nav-item active to="/Register">Register</b-nav-item>
        <b-nav-item active to="/Board/free">Board</b-nav-item>
        <b-nav-item active to="/Chatroom">Chatroom</b-nav-item>
      </b-nav>
    </div>
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
.position-hc {
  position: absolute;
  top: auto;
  nav-left:inherit;
}
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
.home {
  position:absolute;
  left: 100px;}
</style>
