<template>
  <div class="header-wrap">
    <b-navbar toggleable="sm">
      <b-navbar-brand to="/"
        ><img src="../../assets/logo.png" style="width: 50px; height: 50px;"
      /></b-navbar-brand>
      <h1>CoinNet</h1>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse
        is-nav
        id="nav_collapse"
        class="collapse navbar-collapse justify-content-end"
      >
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item :to="getLoginState ? '/mypage' : '/login'">{{
            getPage
          }}</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
          <b-nav-item-dropdown text="Board">
            <b-dropdown-item href="#">Notice</b-dropdown-item>
            <b-dropdown-item to="/board/free">Free</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/chatroom">Chatroom</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from "vuex";
// import request from './request.js'
=======
import {mapGetters} from 'vuex'
>>>>>>> f44338d59ce1164c3f387c4ea8cbc262e06a93c1
export default {
  name: "Header",
  data() {
    return {
      page: "Login",
    };
  },
  computed: {
    ...mapGetters("account", ["getLoginState", "getPage"]),
  },
};
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  position: relative;
  height: 120px;
  border-bottom: 1px solid #35495e;
}
header h1 {
  position: absolute;
  top: 0;
  left: 100px;
}
header ul.menu:after {
  display: block;
  clear: both;
  content: "";
}
header ul.menu {
  position: absolute;
  top: 20px;
  right: 50px;
}
header ul.menu li {
  float: left;
  padding: 10px 20px;
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}

.header-wrap {
  background-image: url(//www.toptal.com/designers/subtlepatterns/patterns/symphony.png);
  /* background-position: bottom; */
  /* animation: 4s linear 0s infinite bp; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
}
</style>
