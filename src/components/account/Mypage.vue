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



            <div class="col-lg-10" style="padding-left:40px;">
               <div class="bg-light rounded p-3">
                   <p class="mb-0"> 정보수정을 원하시면 비밀번호 입력 후, <a class="text-decoration-none">수정하기</a>를 눌러주세요.
                   </p>
               </div>
                <div class="container">
                    <br>
                    <div class=" form-group row" style="padding:50px; border:1px solid #f3f3f3;">
                        <div>
                            <image src="images/profile.jpg" width="200px" height="200px" style="border:2px solid #f3f3f3;"></image>
                        </div>
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
                                        v-model="login_pw">
                                    </div>

                                    <div style="float:right;">
                                        <b-button class="text-decoration-none" id="userDuplicateBtn" @click="upwUpdateConfirm" variant="link" style="float: right; color:#75b239; padding:0px; margin:0px;">수정하기
                                        </b-button>
                                    </div>
                                </div>
                            </form>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">이름</label>
                                        <input disabled
                                        class="form-control" id="login_name" name="login_name"
                                        v-model="login_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">휴대폰 번호</label>
                                        <input disabled
                                        class="form-control" id="login_phone" name="login_phone"
                                        v-model="login_phone">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-25">
                                        <label class="text-black">주소</label>
                                        <input disabled
                                        class="form-control" id="login_address" name="login_address"
                                        v-model="login_address">
                                    </div>
                                </div>

                            <div class="form-group">
                                <div class="col-md-25">
                                        <label class="text-black">이메일</label>
                                        <input disabled
                                        class="form-control" id="login_email" name="login_email"
                                        v-model="login_email">
                                    </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-25">
                                        <label class="text-black">성별</label>
                                        <input disabled
                                        class="form-control" id="login_gender" name="login_gender"
                                        v-model="login_gender">
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
import { getUserInfo, checkUser  } from '@/service'
import { mapGetters } from 'vuex'

export default {
    name: 'Mypage',
    data() {
        return{
        login_name:'',
        login_address:'',
        login_email:'',
        login_gender:'',
        login_phone:''
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
               this.login_name = userData.user_name;
               this.login_address = userData.user_address;
               this.login_email = userData.user_email;
               this.login_gender = userData.user_gender;
               this.login_phone = userData.user_phone;
                }
            },
        async upwUpdateConfirm(){
            const resp = await checkUser({
                login_id: this.getLoginId,
                login_pw: this.login_pw
            });

            if(resp.data.data !== null){
                this.$router.push({
                    path: '/mypage/update'
                })
            }
            else alert("비밀번호가 틀렸습니다.")
        }
    }
}
</script>