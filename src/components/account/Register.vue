<template>
  <!-- Default form register -->
<div class="site-wrap">
    <div class="bg-light py-3">
        <div class="container">
            <div class="row">
                <div class="col-md-12 mb-0">
                    <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
                    <strong class="text-black">Register</strong>
                </div>
            </div>
        </div>
    </div>
<br>
    <div class="site-section">
        <div class="container">
            <div class="row">
                <div class="col-md-12 mid wrapmid">
                    <h2 class="h3 mb-5 text-black ">Register</h2>
                </div>
                <div class="col-md-12 mid">

                    <form name="regiform" action="#" method="post" class="mid">

                        <div class="p-3 p-lg-5 border table" style="background-color: #f1f5f8">
                            <div class="form-group mid" style="padding-left: 250px;">
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_id" class="text-black mid "> 아이디 <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control input-field" id="user_id" name="user_id"
                                               required="required" v-model="user_id" style="border:none ">

                                        <b-button class="text-decoration-none" id="userDuplicateBtn" @click="userDuplicate" variant="link" style="float: right; color:#75b239; padding:0px; margin:0px;">중복확인
                                        </b-button>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_pw" class="text-black "> 비밀번호 <span class="text-danger">*</span></label>
                                        <input type="password" class="form-control input-field" id="user_pw" name="user_pw"
                                               required="required" v-model="user_pw" style="border:none">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_name" class="text-black"> 이름 <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control input-field" id="user_name" name="user_name"
                                               required="required" v-model="user_name" style="border:none">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_phone" class="text-black"> 휴대폰 번호 <span
                                                class="text-danger">*</span></label>
                                        <input type="tel" class="form-control input-field" id="user_phone" name="user_phone"
                                               required="required" v-model="user_phone" style="border:none">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_address" class="text-black"> 주소 <span
                                                class="text-danger">*</span></label>
                                        <input type="email" class="form-control input-field" id="user_address" name="user_address"
                                               required="required" v-model="user_address" style="border:none">
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label for="user_email" class="text-black"> 이메일 <span
                                                class="text-danger">*</span></label>
                                        <input type="text" class="form-control input-field" id="user_email" name="user_email"
                                               required="required" v-model="user_email" style="border:none">
                                    </div>
                                </div>
                                <br>
                                <div class="form-group row">
                                    <div class="col-md-8">
                                        <label class="text-black"> 성별 <span
                                                class="text-danger">*</span>
                                            <input type="radio" v-model="user_gender" name="user_gender" value="남자">남자
                                            <input type="radio" v-model="user_gender" name="user_gender" value="여자">여자
                                        </label>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <br>
                            <div class="form-group row ">
                                    <div class="col-lg-6 " style="padding-left: 150px;">
                                        <b-button pill id="userRegiBtn" @click="registerUser" variant="warning" class="btn btn-primary btn-block wrapmid" >회원가입</b-button>
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
  <!-- Default form register -->
</template>

<script>
import { insertUser, getUserIDList } from '@/service'


export default {
    name: 'Register',
    data() {
        return{
        user_id:'',
        user_pw:'' ,
        user_name:'',
        user_phone:'',
        user_address:'',
        user_email:'',
        user_gender:''
        }       
    },
    methods: {
        async registerUser() {
            const resp = await insertUser({
                user_id: this.user_id,
                user_pw: this.user_pw,
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_address: this.user_address,
                user_email: this.user_email,
                user_gender: this.user_gender
            });
            if(resp.data.data !== null) {
                alert('회원가입이 완료되었습니다. '+this.user_id+'님 환영합니다!')
                this.$router.push({
                    path: '/login'
                });
            }
            else alert('정보를 다시 확인해주세요')
        },
        async userDuplicate() {
            const resp = await getUserIDList({
                user_id: this.user_id
            });
            if(resp.data.data != null){
                alert('아이디를 변경하세요. 사용할 수 없는 아이디 입니다.')
            }
            else alert('사용할 수 있는 아이디입니다.')
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