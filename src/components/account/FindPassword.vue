<template>
<div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">FindPassword</strong>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">FindPassword</h2>
        </div>
	<div class="w3-content w3-container w3-margin-top">
		<div class="w3-container w3-card-4 w3-auto" style="width: 382px;height: 456.3px;">
			<div>
				<p>
                    <label class="text-black">아이디</label>
                <input
                  class="form-control input-field"
                  id="member_id" 
                  name="member_id" 
                  v-model="member_id" 
                  placeholder="회원가입한 아이디를 입력하세요"
                  style="border:none" 
                />
				</p>
				<p>
                    <label class="text-black">이메일</label>
                <input 
                  class="form-control input-field"
                  id="member_email" 
                  name="member_email" 
                  v-model="member_email" 
                  placeholder="회원가입한 이메일주소를 입력하세요"
                  style="border:none" 
                />
				</p>
				<p class="w3-center">
					<b-button pill type="button" @click="findPw" 
                  variant="warning">임시 비밀번호 발급</b-button>
                    &nbsp;
                <b-button pill
                  to="/login"
                  variant="warning"
                  class=" btn-block"
                  >로그인</b-button
                >
				</p>                
			</div>
		</div>
	</div>
      </div>
    </div>
</div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css"
import { updatePw } from '@/service'

export default {

    name: "FindPassword",
    data(){
        return {
            member_id: '',
            member_email: ''
        }
    },
    methods:{
        async findPw(){
            const resp = await updatePw({
                member_id : this.member_id,
                member_email : this.member_email
            });
            console.log(resp)

            if(resp.data.msg != 'fail'){
                alert("이메일로 임시 비밀번호를 발송하였습니다.")
            }
            else
                alert("정보를 다시 확인해주세요.")
            }
        }
}
</script>

<style>
.mybtn{
  width:150px;
  height:40px;
  padding:0;
  display:inline; 
  border-radius: 4px; 
  background: #212529;
  color: #fff;
  margin-top: 20px;
  border: solid 2px #212529; 
  transition: all 0.5s ease-in-out 0s;
}
.mybtn:hover .mybtn:focus {
  background: white;
  color: #212529;
  text-decoration: none;
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