/*下拉菜单触发器*/

var bindEventToggles = function(){
    var selector = '.gua-menu-toggle'
    bindAll(selector, 'click', function(event){
        //console.log('click button')
        // 找到自己这个菜单的 gua-menu-content
        var p = event.target.parentElement
        var c = find(p, '.gua-menu-content')
        // 开关 gua-hide class
        toggleClass(c, 'gua-hide')
    })
}

bindEventToggles()

var bindEventItems = function(){
    var selector = '.gua-item'
    bindAll(selector, 'mouseenter', function(event){
        removeClassAll('gua-highlight')
        var item = event.target
        if(item.classList.contains('gua-item')){
            item.classList.add('gua-highlight')
        }
    })
    bindAll(selector, 'mouseout', function(event){
        removeClassAll('gua-highlight')
    })
}

bindEventItems()

var bindEventSlide = function(){
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event){
        console.log('click next')
        // 找到 slide div
        var slide = event.target.parentElement
        // 得到图片总数和当前图片下标
        var numberOfImgs = parseInt(slide.dataset.imgs)
        var activeIndex = parseInt(slide.dataset.active)
        // log('click slide', )
        // 求出下一张图片的 id
        var nextIndex = (activeIndex + 1) % numberOfImgs
        var beforeIndex = Math.abs(activeIndex - 1) % numberOfImgs
        var index = activeIndex
        if(event.target.classList.contains('left')){
            index = beforeIndex
        }if(event.target.classList.contains('right')){
            index = nextIndex
        }
        // 设置父节点的 data-active
        slide.dataset.active = index
        var nextSelector = '#id-guaimage-' + String(index)
        // 删除当前图片的 class 给下一张图片加上 class
        var className = 'gua-active'
        removeClassAll(className)
        var img = e(nextSelector)
        img.classList.add(className)
        var indicators = '.indi-' + String(index)
        var indiClass = 'gua-white'
        removeClassAll(indiClass)
        var indi = e(indicators)
        indi.classList.add(indiClass)
    })
}

bindEventSlide()

var playNext = function(){
    var select = '.gua-slide'
    setInterval(function(){
        var element = e(select)
        var active = element.dataset.active
        var all = element.dataset.imgs
        var next = (parseInt(active)+1) % all
        var imgSelect = '#id-guaimage-'
        var imgId = imgSelect + String(next)
        var img = e(imgId)
        removeClassAll('gua-active')
        img.classList.add('gua-active')
        var indicators = '.indi-' + String(next)
        var indiClass = 'gua-white'
        removeClassAll(indiClass)
        var indi = e(indicators)
        indi.classList.add(indiClass)
        element.dataset.active = next
    }, 4000)
}

playNext()