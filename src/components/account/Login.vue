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
    <br>

    <div class="site-section">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="h3 mb-5 text-black">Login</h2>
                </div>
                <div class="col-md-12">

                    <form name="loginform" action="#" method="post">

                        <div class="p-3 p-lg-5 border">
                            <div style="padding-left: 295px;">
                                <select  id="login" class="login" name="login">
                                    <option value="user" selected> 회원 </option>
                                    <option value="admin"> 관리자 </option>
                                </select>
                            </div>
                            <br>
                            <div class="form-group" style="padding-left: 300px;">
                                <div class="form-group row">
                                    <div class="col-lg-7">
                                        <label for="login_id" class="text-black">아이디</label>
                                        <input type="text" class="form-control" id="login_id" name="login_id"
                                        v-model="login_id">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-lg-7">
                                        <label for="login_pw" class="text-black">비밀번호</label>
                                        <input type="password" class="form-control" id="login_pw" name="login_pw"
                                        v-model="login_pw">
                                    </div>
                                </div>

                            <br>

                                 <div class="form-group row">
                                        <div class="col-md-3">
                                            <b-button id="LoginBtn" 
                                            @click="approveUser"
                                             class="btn btn-primary btn-lg btn-block" variant="primary" >로그인</b-button>
                                        </div>

                                     <div class="col-md-3">
                                         <b-button href = "/register" variant="primary" class="btn btn-primary btn-lg btn-block">회원가입</b-button>
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

</div>
  <!-- Default form login -->
</template>


<script>
import { checkUser } from '@/service'
import {mapMutations} from 'vuex'

export default {
    data() {
        return{
        login_id:'',
        login_pw:'' 
        }       
    },
    methods: {
        ...mapMutations('account',[
            'setId',
            'setPage'
        ]),
        async approveUser() {
            const resp = await checkUser({
                login_id: this.login_id,
                login_pw: this.login_pw
            });
            if(resp.data.data !== null) {
                this.setId(this.login_id);
                this.setPage('Mypage');
                this.$router.push({
                    path: '/board/free'
                })
            }
            else alert('fail');
        },
    }
}
</script>
