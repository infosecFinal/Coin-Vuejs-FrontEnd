<template>
  <!-- Default form login -->
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Login</strong>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">Login</h2>
        </div>
        <div class="col-lg-8" style="display:block; margin: 0 auto;">
        <form name="loginform" action="#" method="post">
          <div
            class="p-4 p-lg-4"
            style="background-color:#f1f5f8;  border-radius: 50px; border:none;"
          >
            <br /><br />
            <div
              class="col-md-7 col-sm-7"
              style="border:none display:block; margin: 0 auto;"
            >
              <select id="login" class="login" name="login" style="display:block; margin: 0 auto;">
                <option value="user" selected> 회원 </option>
                <option value="admin"> 관리자 </option>
              </select>
              <br />
              <div
                class="col-md-7 col-sm-7"
                style="border:none display:block; margin: 0 auto;"
              >
                <label for="login_id" class="text-black ">아이디</label>
                <input
                  type="text"
                  class="form-control input-field"
                  id="login_id"
                  name="login_id"
                  v-model="login_id"
                  placeholder="ID"
                  style="border:none"
                />
              </div>
              <div
                class="col-md-7 col-sm-7"
                style="border:none display:block; margin: 0 auto;"
              >
                <label for="login_pw" class="text-black">비밀번호</label>
                <input
                  type="password"
                  class="form-control input-field"
                  id="login_pw"
                  name="login_pw"
                  v-model="login_pw"
                  placeholder="PW"
                  style="border:none"
                />
              </div>
              <br />
              <div
                class="content-detail-button"
                style="border:none; text-align:center;"
              >
                <b-button
                  pill
                  id="LoginBtn"
                  @click="approveUser"
                  class="btn btn-block"
                  variant="warning"
                  >로그인</b-button
                >
                &nbsp;
                <b-button
                  pill
                  href="/findpw"
                  variant="warning"
                  class=" btn-block"
                  >비밀번호찾기</b-button
                >
                &nbsp;
                <b-button
                  pill
                  href="/register"
                  variant="warning"
                  class=" btn-block"
                  >회원가입</b-button
                >
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUser } from "@/service";
import { mapMutations } from "vuex";
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      login_id: "",
      login_pw: "",
    };
  },
    methods: {
        ...mapMutations('account',[
            'setId',
            'setLogout',
            'setMypage',
            'setLoginState'
        ]),
        async approveUser() {
            const resp = await checkUser({
                login_id: this.login_id,
                login_pw: this.login_pw
            });
            if(resp.data.code > 0) {
                VueCookies.set('access_token', resp.data.data);
                console.log(VueCookies.get('access_token'));
            
                this.setId(this.login_id);
                this.setLogout('Logout');
                this.setMypage('Mypage');
                this.setLoginState(true);
                this.$router.push({
                    path: '/board/free'
                })
            }
            else alert('로그인 실패. 다시 입력해주세요');
        }
    }
}
</script>

<style scoped>
.table {
  max-width: 800px;
  left: 0;
  right: 0;
  margin-left: 20%;
  margin-right: 20%;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.wrapmid {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
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
