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

    <br>

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

               <div class="bg-light rounded p-3 table">
                   <p class="mb-0"> 정보수정을 원하시면 비밀번호 입력 후, <a class="text-decoration-none">수정하기</a>를 눌러주세요.
                   </p>
               </div>
               <div class="col-lg-10" style="padding-left:40px; background-color: #f1f5f8;  border-radius: 50px;">
                <div class="container" >
                    <br>
                    <div class=" form-group row" style="padding:50px; border:1px solid #f3f3f3;">
                        <div>
                            <img src="../../assets/profile.jpg"  width="200px" height="200px" style="border:2px solid #f3f3f3;"/>
                        </div>
                        <div class="custom-file b-form-file is-invalid" id="__BVID__95__BV_file_outer_" style="margin: 50px;"><input type="file" multiple="multiple" class="custom-file-input is-invalid" id="__BVID__95" style="z-index: -5;"><label data-browse="Browse" class="custom-file-label" for="__BVID__95"><span class="d-block form-file-text" style="pointer-events: none;">Choose a file or drop it here...</span></label></div>
                        <div class="col-lg-7" style="padding-left: 50px;">

                                <div class="form-group ">
                                    <div class="col-md-25">
                                        <label class="text-black">아이디</label>
                                        <input disabled
                                        class="form-control" id="login_id" name="login_id"
                                        v-model="getLoginId">
                                    </div>
                                </div>

                            <form name="umpform" class="form-horizontal">
                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">비밀번호</label>
                                        <input type="password"
                                        class="form-control" id="login_pw" name="login_pw"
                                        v-model="user_pw">
                                    </div>

                                    <div style="float:right;">
                                        <b-button class="text-decoration-none" id="userDuplicateBtn" @click="upwUpdateFinish" variant="link" style="float: right; color:#75b239; padding:0px; margin:0px;">수정완료
                                        </b-button>
                                    </div>
                                </div>
                            </form>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">이름</label>
                                        <input disabled
                                        class="form-control" id="login_name" name="login_name"
                                        v-model="user_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">휴대폰 번호</label>
                                        <input
                                        class="form-control" id="login_phone" name="login_phone"
                                        v-model="user_phone">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">주소</label>
                                        <input
                                        class="form-control" id="login_address" name="login_address"
                                        v-model="user_address">
                                    </div>
                                </div>

                            <div class="form-group">
                                <div class="col-md-25">
                                        <label class="text-black">이메일</label>
                                        <input disabled
                                        class="form-control" id="login_email" name="login_email"
                                        v-model="user_email">
                                    </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-25">
                                        <label class="text-black">성별</label>
                                        <input disabled
                                        class="form-control" id="login_gender" name="login_gender"
                                        v-model="user_gender">
                                    </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>
</template>


<script>
import { getUserInfo, updateUser } from '@/service'
import { mapGetters } from 'vuex'

export default {
    name: 'Update',
    data() {
        return{
        user_pw:'',
        user_name:'',
        user_address:'',
        user_email:'',
        user_gender:'',
        user_phone:''
        }
    },
    computed: {
        ...mapGetters('account',[
            'getLoginId'
        ])
    },
    created() {
        this.userInfoPrint();
    },
    methods: {
        async userInfoPrint(){
            const resp = await getUserInfo(this.getLoginId);
            console.log(resp);
            if(resp.data.data !== null){
               const userData = resp.data.data;
               this.user_pw = userData.user_pw;
               this.user_name = userData.user_name;
               this.user_phone = userData.user_phone;
               this.user_address = userData.user_address;
               this.user_email = userData.user_email;
               this.user_gender = userData.user_gender;
                }
            },
        async upwUpdateFinish(){
            const resp = await updateUser({
                user_id: this.getLoginId,
                user_pw: this.user_pw,
                user_name: this.user_name,
                user_phone:this.user_phone,
                user_address:this.user_address,
                user_email:this.user_email,
                user_gender:this.user_gender
            });

            if(resp.data.data !== null){
                this.$router.push({
                    path: '/mypage'
                })
            }
            else alert("비밀번호가 틀렸습니다.")
        }
    }
}
</script>

<style scoped>
.table {
   max-width: 900px; 
   left:0; 
   right:0; 
   margin-left:10%; 
   margin-right:10%; 
   top: 0; 
   bottom:0; 
   margin-top:0%; 
   margin-bottom:0%;
   }
.wrapmid{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}
.mid{
   min-width: 800px; left:0; right:0; margin-left:auto; margin-right:auto; top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
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