<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// import Chat from '@/components/Chat.vue';
import Header from '@/components/common/Header.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>