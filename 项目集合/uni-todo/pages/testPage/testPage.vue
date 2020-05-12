<template>
	<view class="content">
		<!--  常用基础组件： -view -> -div  -text -> -span  -image -> img  -->
		<view class="todo-header" v-if="list.length !== 0">
			<view class="todo-header_left">
				<text class="active-text">{{ text }}</text>
				<text>{{ listData.length }}条</text>
			</view>
			<view class="todo-header_right">
				<view class="todo-header_right-item" :class="{'active-tab': activeIndex === 0}" @click="tab(0)"> 全部 </view>
				<view class="todo-header_right-item" :class="{'active-tab': activeIndex === 1}" @click="tab(1)"> 待办 </view>
				<view class="todo-header_right-item" :class="{'active-tab': activeIndex === 2}" @click="tab(2)"> 已完成 </view>
			</view>
		</view>
		<view class="default" v-if="list.length === 0">
			<view class="image-default">
				<image src="../../static/default.png" mode="aspectFit"></image>
			</view>
			<view class="default-info">
				<view class="default-info__text">你还没有创建任何待办事项</view>
				<view class="default-info__text">点击下方+号创建一个</view>
			</view>
		</view>
		<view class="todo-content" v-else>
			<view class="todo-list" :class="{'todo-finish': item.checked}" 
			v-for="(item, index) in listData" :key=index @click="finish(item.id)">
				<view class="todo-list_checkbox">
					<view class="checkbox"></view>
				</view>
				<view class="todo-list_content">
					{{ item.content }}
				</view>
			</view>
		</view>
		<view class="create-todo" @click="create">
			<text class="iconfont icon-add" :class="{'create-todo-active': textShow}"></text>
		</view>
		<view class="create-content" v-if="active" :class="{'create-show': textShow}">
			<view class="create-content-box">
				<view class="create-input">
					<input type="text" v-model="value" placeholder="请输入你要创建的todo"> 
				</view>
				<view class="create-button" @click="add">
					创建
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				list: [],
				active: false,
				activeIndex: 0,
				text: '全部',
				textShow: false,
			}
		},
		computed:{
			listData() {
				let list = JSON.parse(JSON.stringify(this.list))
				if (this.activeIndex === 0) {
					this.text = "全部"
					return list
				}
				if (this.activeIndex === 1) {
					this.text = "待办"
					list = list.filter(item => !item.checked)
					return list
				}
				if (this.activeIndex === 2) {
					this.text = "已完成"
					list = list.filter(item => item.checked)
					return list
				}
			}
		},
		methods: {
			create() {
				if(this.active) {
					this.close()
				} else {
					this.open()
				}
				// 因为v-if，所以需要元素显示以后才可以，所以需要添加一个延迟是动画效果有效
			},
			open() {
				this.active = true
				this.$nextTick(function(){
					setTimeout(() => {
						this.textShow = true
					}, 50)
				})
			},
			close() {
				this.textShow = false
				this.$nextTick(function(){
					setTimeout(() => {
						this.active = false
					}, 350)
				})
			},
			add() {
				if (this.value === '') {
					uni.showToast({
						title: "请输入内容",
						icon: "none",
						checked: false,
					})
				} else {
					let todoItem = {
						id: 'id' + new Date().getTime(),
						content: this.value,
					}
					this.list = [todoItem, ...this.list]
				}
				this.value = ''
				// this.active = false
				// this.textShow = false
				this.close()
			},
			finish(id) {
				let index = this.list.findIndex(item => item.id === id)
				this.list[index].checked = !this.list[index].checked
				let newItem = this.list[index]
				this.list.splice(index, 1, newItem)
			},
			tab(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style>
	@import "../../common/icon.css";
	.todo-header {
		position: fixed;
		top: 44px;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 15px;
		/* justify-content: space-between; */
		font-size: 12px;
		color: #333333;
		height: 45px;
		/* 偏移量x, 偏移量y, 阴影模糊, 阴影扩散 颜色 */
		box-shadow: -1px 1px 5px 0 rgba(0, 0, 0, 0.1);
		background-color: #FFFFFF;
		z-index: 12;
		box-sizing: border-box;
	}
	.todo-header_left {
		width: 100%;
	}
	.active-text {
		color: #279abf;
		font-size: 14px;
		padding-right: 10px;
	}
	.todo-header_right {
		flex-shrink: 0;
		display: flex;
	}
	
	.todo-header_right-item {
		padding: 0 5px;
	}
	
	.active-tab {
		color: #279abf;
	}
	
	.todo-content {
		position: relative;
		margin-bottom: 100px;
		padding-top: 50px;
	}
	
	.todo-list {
		position: relative;
		display: flex;
		align-items: center;
		padding: 15px;
		margin: 15px;
		border-radius: 10px;
		background-color: #cfebfd;
		color: #0c3854;
		font-size: 14px;
		box-shadow: -1px 1px 5px 1px rgba(0, 0, 0, 0.1), 
			-1px 2px 1px 0 rgb(255, 255, 255) inset;
		overflow: hidden;
	}
	.todo-list:after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 0;
		width: 5px;
		background-color: #91d1e8;
	}
	.todo-list_checkbox {
		padding-right: 15px;
	}
	.checkbox {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: #FFFFFF;
		box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1); 
	}
	
	.todo-finish .checkbox {
		position: relative;
		background-color: #EEEEEE;
	}
	
	.todo-finish .checkbox:after {
		content: '';
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: #CFEBFD;
	}
	.todo-finish .todo-list_content {
		color: #999999;
	}
	
	.todo-finish.todo-list::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		height: 2px;
		margin: auto 0;
		background-color: #bdcdd8;
		left: 40px;
		right: 10px;
	}
	
	.todo-finish.todo-list::after { 
		background-color: #CCCCCC;
	}
	
	.create-todo {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 60px;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #deeff5;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1),
			-1px 1px 1px 0 rgba(255, 255, 255, 1) inset;
		
	}
	
	.icon-add {
		font-size: 30px;
		color: #addbe6;
	}
	.create-content {
		position: fixed;
		bottom: 130px;
		left: 20px;
		right: 20px;
		transition: all 0.3s;
		opacity: 0;
		transform: scale(0) translateY(200%);
	}
	.create-show {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
	.create-content-box {
		display: flex;
		align-items: center;
		padding: 0 15px;
		padding-right: 0;
		border-radius: 50px;
		background-color: #DEEFF5;
		box-shadow: -1px 1px 5px 2px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}
	.create-input {
		width: 100%;
		padding-right: 15px;
		color: #ADDBE6;
	}
	.create-button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		width: 80px;
		height: 50px;
		border-radius: 50px;
		font-size: 16px;
		color: #88d4ec;
		box-shadow: -2px 0px 2px 1px rgba(0, 0, 0, 0.1);
	}
	.create-content::after {
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		bottom: -8px;
		width: 20px;
		height: 20px;
		background-color: #DEEFF5;
		transform: rotate(45deg);
		margin: 0 auto;
		box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
		z-index: -1;
	}
	.create-content-box::after {
		content: '';
		position: absolute;
		right: 0;
		left: 0;
		bottom: -8px;
		width: 20px;
		height: 20px;
		background-color: #DEEFF5;
		transform: rotate(45deg);
		margin: 0 auto;
	}
	.default {
		padding-top: 100px;
	}
	.image-default {
		display: flex;
		justify-content: center;
	}
	
	.image-default image {
		width: 100%;
	}
	
	.default-info {
		text-align: center;
		font-size: 14px;
		color: #CCCCCC;
	}
	
	.icon-add {
		transition: transform 0.3s;
	}
	
	.create-todo-active {
		transform: rotate(135deg);
	}
	
</style>
