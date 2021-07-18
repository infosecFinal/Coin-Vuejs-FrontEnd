<template>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black"> Mypage </strong>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">Delete account</h2>
        </div>
        <div class="col-lg-2">
          <b-nav vertical class="w-15">
            <b-nav-item to="/mypage">개인정보</b-nav-item>
            <b-nav-item to="/mypage/delete">회원탈퇴</b-nav-item>
          </b-nav>
        </div>
        <div class="col-lg-8" style="display: block; margin: 0 auto">
          <p
            class="mb-0 bg-light p-3"
            style="border-radius: 50px; display: block; margin: 0 auto"
          >
            계정을 삭제를 원하시면 비밀번호 입력 후,
            <a class="text-decoration-none">회원탈퇴</a>를 눌러주세요.
          </p>
          <br />
          <form name="deleteform" action="#" method="post">
            <div
              class="p-4 p-lg-4"
              style="
                background-color: #f1f5f8;
                border-radius: 50px;
                border: none;
              "
            >
              <div
                class="col-md-7 col-sm-7"
                style="border: none; display: block; margin: 0 auto"
              >
                <br /><br />
                <label class="text-black">아이디</label>
                <input
                  disabled
                  class="form-control input-field"
                  id="login_id"
                  name="login_id"
                  v-model="getLoginId"
                  style="border: none"
                />
              </div>
              <div
                class="col-md-7 col-sm-7"
                style="border:none display:block; margin: 0 auto;"
              >
                <br />
                <label for="login_pw" class="text-black">비밀번호</label>
                <input
                  type="password"
                  class="form-control input-field"
                  id="login_pw"
                  name="login_pw"
                  v-model="login_pw"
                  style="border: none"
                />
              </div>
              <br /><br />
              <b-button
                pill
                id="DeleteBtn"
                @click="userDelete"
                class="btn btn-primary btn-block"
                variant="warning"
                style="display: block; margin: 0 auto"
              >
                회원탈퇴</b-button
              >
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { deleteUser } from "@/service";
import { mapGetters, mapMutations } from "vuex";
import VueCookies from "vue-cookies";

export default {
  name: "Delete",
  data() {
    return {
      login_pw: "",
    };
  },
  computed: {
    ...mapGetters("account", ["getLoginId"]),
  },
  methods: {
    ...mapMutations("account", ["setId", "setLoginState"]),
    async userDelete() {
      console.log("id:", this.getLoginId);
      const resp = await deleteUser({
        login_id: this.getLoginId,
        login_pw: this.login_pw,
      });
      console.log(resp.data);
      if (resp.data.code > 0) {
        alert("계정이 삭제되었습니다!");
        VueCookies.remove("access_token");
        this.setId("");
        this.setLoginState(false);
        this.$router.push({
          path: "/",
        });
      } else {
        alert("게정 삭제 실패");
      }
    },
  },
};
</script>

<style scoped>
.table {
  max-width: 900px;
  left: 0;
  right: 0;
  margin-left: 10%;
  margin-right: 10%;
  top: 0;
  bottom: 0;
  margin-top: 0%;
  margin-bottom: 0%;
}
.wrapmid {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.mid {
  min-width: 800px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.input-field {
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  color: #252a32;
  background: #fff;
}
</style>
