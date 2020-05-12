<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="default" @click="open">跳转</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(e) {
			// 接受上个页面传递的参数
			// 请求后台接口
			// 渲染前操作
		},
		onReady() {
			// 获取节点信息
		},
		onShow() {
			
		},
		onHide() {
			
		},
		onUnload() {
			
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '../nextPage/nextPage?id=nexpage'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
