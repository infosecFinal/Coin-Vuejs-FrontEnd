<template>
  <div class="header-wrap">
    <b-navbar toggleable="sm">
      <b-navbar-brand to="/"
        ><img src="../../assets/logo.png" style="width: 50px; height: 50px;"
      /></b-navbar-brand>
      <h1>CoinNet</h1>
      <div>
        <b-button circle variant="layout-warning" v-b-toggle.sidebar-1><img src="../../assets/menu.png" style="width: 25px; height: 25px;" alt="Image 1"/></b-button>
        <b-sidebar id="sidebar-1" title=" " shadow width=20%>
          <div class="px-3 py-2">
            <b-dropdown-item to="/">Home</b-dropdown-item>
            <b-dropdown-item to="/login">Login</b-dropdown-item>
            <b-dropdown-item to="/register">Register</b-dropdown-item>
            <b-dropdown-item to="/board/free">Board</b-dropdown-item>
            <b-dropdown-item to="/chatroom">Chatroom</b-dropdown-item>
          </div>
        </b-sidebar>
      </div>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse
        is-nav
        id="nav_collapse"
        class="collapse navbar-collapse justify-content-end"
      >
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item :to="getLoginState ? '/' : '/login'">{{
            getLogout
          }}</b-nav-item>
          <b-nav-item :to="getLoginState ? '/mypage' : '/register'"
            >{{ getMypage }}
          </b-nav-item>
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
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      login: "Login",
      register: "Register",
    };
  },
  computed: {
    ...mapGetters("account", ["getLoginState", "getLogout", "getMypage"]),
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
}
</style>
