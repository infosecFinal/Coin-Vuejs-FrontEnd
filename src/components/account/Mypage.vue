<template>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black"> Mypage </strong>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">Mypage</h2>
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
            정보수정을 원하시면 비밀번호 입력 후,
            <a class="text-decoration-none">수정하기</a>를 눌러주세요.
          </p>
          <br />
          <div
            class="form-group row"
            style="
              background-color: #f1f5f8;
              border-radius: 50px;
              display: block;
              margin: 0 auto;
            "
          >
            <br />
            <div class="form-group row">
              <div class="col-md-8" style="display: block; margin: 0 auto">
                <br /><br />
                <div
                    class="imagePreviewWrapper"
                    :style="{ 'background-image': `url(http://localhost:8083/file/profile/${getLoginId}?nocache=${rand})` }"
                  ></div>
                <br />
              </div>
              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black">아이디</label>
                  <input
                    disabled
                    class="form-control input-field row"
                    id="login_id"
                    name="login_id"
                    v-model="user_id"
                  />
                </div>
              </div>

              <form name="umpform" class="form-horizontal">
                <div class="form-group">
                  <div class="col-md-8" style="display: block; margin: 0 auto">
                    <label class="text-black">비밀번호</label>

                    <div class="col input-group">
                    <input
                      type="password"
                      class="form-control input-field"
                      id="login_pw"
                      name="login_pw"
                      v-model="user_pw"
                      style="border: none"
                    />
                    <span class="input-group-btn">
                    <b-button
                      class="text-decoration-none"
                      id="userDuplicateBtn"
                      @click="upwUpdateConfirm"
                      variant="warning"
                      style="border-top-right-radius: 50px;
                              border-bottom-right-radius: 50px;
                              height: 47px; font-size:85%; width:85px;"
                      >수정하기
                    </b-button>
                    </span>
                    </div>
                  </div>
                </div>
              </form>

              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black">이름</label>
                  <input
                    disabled
                    class="form-control input-field"
                    id="login_name"
                    name="login_name"
                    v-model="user_name"
                    style="border: none"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black">휴대폰 번호</label>
                  <input
                    disabled
                    class="form-control input-field"
                    id="login_phone"
                    name="login_phone"
                    v-model="user_phone"
                    style="border: none"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black">주소</label>
                  <input
                    disabled
                    class="form-control input-field"
                    id="login_address"
                    name="login_address"
                    v-model="user_address"
                    style="border: none"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black mid">이메일</label>
                  <input
                    disabled
                    class="form-control input-field"
                    id="login_email"
                    name="login_email"
                    v-model="user_email"
                    style="border: none"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-8" style="display: block; margin: 0 auto">
                  <label class="text-black">성별</label>
                  <input
                    disabled
                    class="form-control input-field"
                    id="login_gender"
                    name="login_gender"
                    v-model="user_gender"
                    style="border: none"
                  />
                  <br /><br />
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { getUserInfo, checkUser } from "@/service";
import { mapGetters } from "vuex";

export default {
  name: "Mypage",
  data() {
    return {
      user_id: "",
      user_pw: "",
      user_name: "",
      user_address: "",
      user_email: "",
      user_gender: "",
      user_phone: "",
      previewImage: null,
      rand : Math.random()
    };
  },
  created() {
    this.userInfoPrint();
    if (!this.getLoginState) {
      alert("로그인 후 이용해주세요");
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters("account", ["getLoginId", "getLoginState"]),
  },
  methods: {
    async userInfoPrint() {
      const resp = await getUserInfo();
      console.log(resp);
      if (resp.data.data !== null) {
        const userData = resp.data.data;
        this.user_pw = userData.user_pw;
        this.user_name = userData.user_name;
        this.user_address = userData.user_address;
        this.user_email = userData.user_email;
        this.user_gender = userData.user_gender;
        this.user_phone = userData.user_phone;
        this.user_id = userData.user_id;
      }
    },
    async upwUpdateConfirm() {
      const resp = await checkUser({
        login_id: this.getLoginId,
        login_pw: this.user_pw,
      });

      if (resp.data.data !== null) {
        this.$router.push({
          path: "/mypage/update",
        });
      } else alert("비밀번호가 틀렸습니다.");
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
  display: block;
  margin: 0 auto;
}
.imagePreviewWrapper {
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: contain;
  background-position: center center;
}
</style>
