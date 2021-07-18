<template>
	<div class="w3-content w3-container w3-margin-top">
		<div class="w3-container w3-card-4 w3-auto" style="width: 382px;height: 456.3px;">
			<div class="w3-center w3-large w3-margin-top">
				<h3>비밀번호 찾기</h3>
			</div>
			<div>
				<p>
					<label>아이디</label>
					<input v-model="member_id" class="w3-input" type="text" id="id" name="id" placeholder="회원가입한 아이디를 입력하세요" required>
				</p>
				<p>
					<label>이메일</label>
					<input v-model="member_email" class="w3-input" type="text" id="email" name="email" placeholder="회원가입한 이메일주소를 입력하세요" required>
				</p>
				<p class="w3-center">
					<button type="button" @click="findPw" class="w3-button w3-hover-white w3-ripple w3-margin-top w3-round mybtn">찾기</button>
					<button type="button" onclick="history.go(-1);" class="w3-button w3-hover-white w3-ripple w3-margin-top w3-round mybtn">로그인으로</button>
				</p>
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

            if(resp != null){
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
</style>