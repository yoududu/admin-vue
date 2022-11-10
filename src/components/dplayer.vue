// dplayer.vue
 
<template>
	<div>
		<div id="dplayer" :style="dplayerData.style"></div>
	</div>
</template>
 
<script>
import DPlayer from 'dplayer'
export default {
	name: 'dplayer',
	props: {
		dplayerData: Object,
	},
	data() {
		return {}
	},
	mounted() {
		this.dp = new DPlayer({
			container: document.getElementById('dplayer'),
			theme: '#b7daff', // 风格颜色，例如播放条，音量条的颜色
			// loop: false, // 是否自动循环
			lang: 'zh-cn', // 语言，'en', 'zh-cn', 'zh-tw'
			hotkey: true, // 是否支持热键，调节音量，播放，暂停等
			preload: 'auto', // 自动预加载
			mutex: true,
			video: {
				url: '', // 播放视频的路径
				defaultQuality: 0, // 默认是HD
				// pic: '', // 视频封面图片
			},
		})
	},
	created() {},
	methods: {
        // 切换视频源事件
		switchVideo(item) {
			this.dp.switchVideo({
				url: item.video,
				// pic: item.imgUrl,
			})
		},
        // 暂停事件
		pause() {
			this.dp.pause()
		},
	},
}
</script>
 
<style scoped>
#dplayer{
    width: 90%;
    height: 700px;
    position: fixed;
    top: 0px;
    left: 0px;
}
</style>