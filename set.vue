<template>
	<div class="tmpl">
		<ul>
			<li v-for="url in imglist">
				<img v-lazy="url">
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>
	ul {
		list-style: none;
		li {
			height: 300px;
			margin-top: 20px;
			border: 2px solid red;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	img[lazy=loading] {
		width: 70px;
		height: 45px;
		animation:animations .5s infinite linear;
	}
	img[lazy=error] {
		width: 100%;
		height: 100%;
	}
	img[lazy=loaded] {
		width: 100%;
		height: 100%;
	}
	@keyframes animations{
		from {
			transform:rotatez(0);
		}
		to {
			transform:rotatez(360deg);
		}
	}
</style>

<script>
	// main.js
	// import VueLazyload from 'vue-lazyload';
	// Vue.use(VueLazyload, {
	// 	error: '../statics/images/error.png',
	// 	loading: '../statics/images/timg.png',
	// 	try: 1
	// });
	// 如果需要导入样式时
	// //导入该第三方插件需要Vue.use引入
	// import Mint from 'mint-ui';
	// Vue.use(Mint);
	// import 'mint-ui/lib/style.min.css';
	export default {
		data () {
			return {
				
			}
		},
		//刷新自执行
		created () {
			
		},
		//定义各种方法
		methods: {
			
		},
		//注册子组件
		components: {
			
		},
		//接收父组件传过来的参数
		props:[]
	}
</script>