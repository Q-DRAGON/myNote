// 2016/12/21
//
// fe13 作业
//
// 实现一个 HTML5 音乐播放器
//


// 上课内容关于 audio 标签的资料如下

/*
 视频和音频标签和配套的 JS API 是新加入的功能
 以前的话只能依赖 flash, 现在有 video 和 audio

 带控制器的视频标签, 不同浏览器有不同的文件格式要求
 所以用 2 个 source 标签指定不同的视频格式
 <video width="300" height="200" controls="controls">
 <source src="movie.mp4">
 <source src="movie.ogv">
 </video>


 带控制器的音频标签, 不同浏览器有不同的文件格式要求
 所以用 2 个 source 标签指定不同的音频格式
 <audio id='id-audio-player' controls="controls">
 <source src="audio.ogg">
 <source src="audio.mp3">
 </audio >


 audio 基本操作如下
 var a = document.querySelector('#id-audio-player')
 a.play()
 a.pause()
 a.autoplay
 a.src
 a.volume
 a.duration
 a.currentTime = 1
 */


/*
 作业 1
 实现播放器的基本界面(不要求 css, 只写 html 即可)
 0, 页面中添加一个 audio 标签, 设置一个 音乐文件（最好取名 1.mp3）
 1, 页面中添加 2 个按钮分别是(播放 暂停)
 3, 给 2 个按钮分别绑定上播放和暂停 audio 的事件


 作业 2
 加入当前时间和总时间显示
 0, 页面中添加 2 个 span 标签分别用来显示当前时间和总时间
 1, 总时间根据上课资料很好得到
 2, 当前时间是一个动态变化的数据, 最简单的方式是设置一个 setInterval 定时器
 来定时(比如 1s)把 audio 的 currentTime 更新到界面中


 作业 3
 实现播放列表
 0, 在目录中放 3 首歌 1.mp3 2.mp3 3.mp3
 1, 界面中显示 3 个 div, 在 data-path 属性中 存储 1.mp3 这样的文件名
 2, 给 3 个 div 绑定 click 事件, 在点击的时候切换 audio 的 src 属性
 3, 需要注意的是, 你切换 audio.src 后调用 audio.play() 是无效的
 因为浏览器需要一定的时间加载音乐文件, 你必须等待加载完成后才能播放
 audio 标签有一个 canplay 事件, 会在加载结束后触发
 在这个事件中调用播放函数即可解决问题


 作业 4
 实现循环播放列表
 0, 用一个数组存储所有的音乐路径
 1, audio 标签有一个 ended 事件, 会在播放结束后触发
 用这个事件实现播放结束自动播放下一首
 */