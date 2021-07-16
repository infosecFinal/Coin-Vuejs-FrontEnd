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
    <br>


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
            <div class="col-lg-10" style="padding-left:40px;">
                <div class="bg-light rounded p-3">
                    <p class="mb-0"> 계정을 삭제를 원하시면 비밀번호 입력 후, <a class="text-decoration-none">회원탈퇴</a>를 눌러주세요.
                    </p>
                </div>
                <br>
                <form name="deleteform" action="#" method="post">
                    <div class="p-3 p-lg-5 border">
                        <div class="form-group" style="padding-left: 250px;">

                            <div class="form-group row">
                                <div class="col-md-6">
                                    <label class="text-black">아이디</label>
                                    <input disabled
                                    class="form-control" id="login_id" name="login_id"
                                    v-model="getLoginId">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6">
                                    <label for="login_pw" class="text-black">비밀번호</label>
                                    <input type="password" class="form-control" id="login_pw" name="login_pw" v-model="login_pw">
                                </div>
                            </div>
                            <div>
                                <div class="form-group row"></div>
                            </div>
                            <br>
                            <div class="form-group row">
                                <div class="col-md-3">
                                            <b-button id="DeleteBtn"                                
                                            @click="userDelete"
                                             class="btn btn-primary btn-lg btn-block" variant="primary">
                                             회원탈퇴</b-button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    </div>
    <br>
</div>
</template>

<script>
import { deleteUser } from '@/service'
import {mapGetters } from 'vuex'

export default {
    name: 'Delete',
    data() {
        return{
        
        login_pw:'' 
        }  
    },
    computed: {
        ...mapGetters('account',[
            'getLoginId'
        ])
    },
    methods: {
        async userDelete(){
            const resp = await deleteUser({
                login_id: this.getLoginId,
                login_pw: this.login_pw
            });

            if(resp.data.data !== 0){
                alert('계정이 삭제되었습니다!')
                this.$router.push({
                    path: '/'
                })
            } else {
                alert('게정 삭제 실패')
            }
        }
    }
}
</script>
