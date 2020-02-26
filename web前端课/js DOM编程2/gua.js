const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `selector ${selector} not found`
        alert(s)
        //
        return null
    } else {
        return element
    }
}

// es 返回一个数组，包含所有被选中的元素
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `selector ${selector} not found`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}

// bindAll 给所有的元素绑定事件
const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}