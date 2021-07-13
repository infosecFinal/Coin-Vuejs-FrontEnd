<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand to='/'><img src='../../assets/logo.png' style="width: 50px; height: 50px;"></b-navbar-brand>

			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav>
					<b-nav-item href='#'>notice</b-nav-item>
					<b-nav-item to='/login'>{{page}}</b-nav-item>
					<b-nav-item to='/register'>register</b-nav-item>
					<b-nav-item to='/board/free'>board</b-nav-item>
					<b-nav-item to='/chatroom'>chatroom</b-nav-item>
				</b-navbar-nav>
			</b-collapse>

		</b-navbar>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
// import request from './request.js'
export default {
    name: "Header",
	data() {
		return {
		page: 'login'
		}
	},
	computed: {
		...mapGetters('account', [
			'getLoginState'
		])
	},
	updated() {
		console.log("id: ",this.login_id)
		if(this.login_id !== undefined) this.page='mypage';
		
	}
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;}
</style>