<template>
	<view class="">
		<text>{{ text }}</text>
		<navigator url="../next2Page/next2Page" hover-class="c-click">to next2Page</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"text": 'nextpage',
			}
		},
		onLoad(option) {
			this.text = option.id
		}
	}
</script>

<style>
	.c-click {
		cursor: pointer;
		text-decoration: underline;
		color: blue;
	}
</style>
