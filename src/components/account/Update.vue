<template>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <a href="/mypage" class="text-black">Mypage</a>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black"> Update </strong>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">Update</h2>
        </div>

        <div class="col-lg-2">
          <b-nav vertical class="w-15">
            <b-nav-item to="/mypage">개인정보</b-nav-item>
            <b-nav-item to="/mypage/delete">회원탈퇴</b-nav-item>
          </b-nav>
        </div>

        <div class="col-lg-8" style=" display:block; margin: 0 auto;">
          <div
            lass="bg-light p-3 table mid"
            style="width:700px; border-radius: 50px; display:block; margin: 0 auto;"
          >
            <p class="mb-0">
              정보수정을 원하시면 비밀번호 입력 후,
              <a class="text-decoration-none">수정하기</a>를 눌러주세요.
            </p>
          </div>
          <br />
          <div
            class="form-group row "
            style="background-color: #f1f5f8;  border-radius: 50px; display:block; margin: 0 auto;"
          >
            <div class="form-group row">
              <div class="App container mt-4">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <br />
                  <label for="formFile" class="form-label">Upload Image:</label>
                  <div
                    class="imagePreviewWrapper"
                    :style="{ 'background-image': `url(${previewImage})` }"
                    @click="selectImage"
                  ></div>
                  <input
                    accept=".jpg, .png, .gif"
                    class="form-control col-md-8"
                    style="display:block; margin: 0 auto; "
                    ref="fileInput"
                    type="file"
                    @input="pickFile"
                  />

                  <br /><br />
                </div>
              </div>
              <div class="form-group ">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">아이디</label>
                  <input
                    disabled
                    class="form-control input-field2 row"
                    id="login_id"
                    name="login_id"
                    v-model="getLoginId"
                  />
                </div>
              </div>

              <form name="umpform" class="form-horizontal">
                <div class="form-group">
                  <div class="col-md-8" style="display:block; margin: 0 auto; ">
                    <label class="text-black">비밀번호</label>
                    <input
                      type="password"
                      class="form-control input-field"
                      id="login_pw"
                      name="login_pw"
                      v-model="user_pw"
                    />
                    <b-button
                      class="text-decoration-none"
                      id="userDuplicateBtn"
                      @click="upwUpdateFinish"
                      variant="link"
                      style="float: right; color:#75b239;  padding:0px; margin:0px;"
                      >수정완료
                    </b-button>
                  </div>
                </div>
              </form>

              <div class="form-group">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">이름</label>
                  <input
                    disabled
                    class="form-control input-field2"
                    id="login_name"
                    name="login_name"
                    v-model="user_name"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">휴대폰 번호</label>
                  <input
                    class="form-control input-field"
                    id="login_phone"
                    name="login_phone"
                    v-model="user_phone"
                  />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">주소</label>
                  <input
                    class="form-control input-field"
                    id="login_address"
                    name="login_address"
                    v-model="user_address"
                  />
                  <b-button pill style="float:right;">찾기</b-button>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">이메일</label>
                  <input
                    disabled
                    class="form-control input-field2"
                    id="login_email"
                    name="login_email"
                    v-model="user_email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-8" style="display:block; margin: 0 auto; ">
                  <label class="text-black">성별</label>
                  <input
                    disabled
                    class="form-control input-field2"
                    id="login_gender"
                    name="login_gender"
                    v-model="user_gender"
                  />
                </div>
                <br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

import { getUserInfo, updateUser } from "@/service";
import { mapGetters } from "vuex";

export default {
  name: "Update",
  data() {
    return {
      user_pw: "",
      user_name: "",
      user_address: "",
      user_email: "",
      user_gender: "",
      user_phone: "",
      user_image: "",
      file: "",
      previewImage: null,
    };
  },
  computed: {
    ...mapGetters("account", ["getLoginId", "getLoginState", "getImagePath"]),
  },
  created() {
    this.userInfoPrint();
    if (!this.getLoginState) {
      alert("로그인 후 이용해주세요");
      this.$router.go(-1);
    }
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async userInfoPrint() {
      const resp = await getUserInfo(this.getLoginId);
      console.log(resp);
      if (resp.data.data !== null) {
        const userData = resp.data.data;
        this.user_pw = userData.user_pw;
        this.user_name = userData.user_name;
        this.user_phone = userData.user_phone;
        this.user_address = userData.user_address;
        this.user_email = userData.user_email;
        this.user_gender = userData.user_gender;
        this.user_image = this.previewImage;
      }
    },
    async upwUpdateFinish() {
      const resp1 = await updateUser({
        user_id: this.getLoginId,
        user_pw: this.user_pw,
        user_name: this.user_name,
        user_phone: this.user_phone,
        user_address: this.user_address,
        user_email: this.user_email,
        user_gender: this.user_gender,
        user_image: this.previewImage,
      });
      // const resp2 = await uploadImage({
      //     user_id:this.getLoginId,
      //     user_image:this.
      // });
      // if(resp2.data.data === null) {
      //     this.setImgaePath("../../assets/profile.jpg")
      // }
      // else
      //     this.setImgaePath(this.pickFile())

      if (resp1.data.data !== null) {
        this.$router.push({
          path: "/mypage",
        });
      } else alert("수정한 정보를 다시 확인해주세요.");
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
.input-field2 {
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
  background: #e9ecef;
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
