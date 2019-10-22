<template>
	<div>
		<ul class='list'>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
			<li>
				<image  mode=""></image>
				<div>撒大搞哈撒大</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		onLoad(){
			
		}
	}
</script>

<style>
	.list{
		width: 680upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.list li{
		width: 200upx;
		
	}
	.list li image{
		background: #000000;
		width: 200upx;
		height: 300upx;
	}
	.list li div{
		font-size: 25upx;
		text-align: center;
		line-height: 40upx;
		height: 40upx;
	}
</style>
