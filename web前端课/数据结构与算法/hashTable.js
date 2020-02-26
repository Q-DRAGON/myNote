const log = console.log.bind(console)

const ensure = function(condition, message) {
    if (!condition) {
        log('*** 测试失败', message)
    } else {
        log('+++ 测试成功')
    }
}

class HashTable {
    constructor() {
        this.data = []
        this.size = 101
    }

    hash(s) {
        let r = 0
        for (let i = 0; i < s.length; i++) {
            let val = s[i]
            let v = val.charCodeAt(0)
            v = v * 10 ** i
            r += v
        }
        return r
    }

    index(s) {
        let l = this.hash(s)
        let i = l % this.size
        return i
    }

    set(key, value) {
        let index = this.index(key)
        let tag = this.data[index]
        let ans = []
        if (tag === undefined) {
            ans.push([key, value])
            this.data[index] = ans
        } else {
            let i = 0
            let status = false
            for (i; i < tag.length; i++) {
                let k = tag[0]
                if (k === key) {
                    t[1] = value
                    status = true
                }
            }
            if (!status && i === tag.length) {
                tag.push([key, value])
            }
        }
    }

    get(key, value) {
        let result = value
        let index = this.index(key)
        let tags = this.data[index]
        if (tags === undefined) {
            return value
        }
        for (let tag of tags) {
            if (tag[0] === key) {
                result = tag[1]
            }
        }
        return result
    }

    has(key) {
        let index = this.index(key)
        let tags = this.data[index]
        if (tags === undefined) {
            return false
        } else {
            for (let tag of tags) {
                if (tag[0] === key) {
                    return true
                }
                return false
            }
        }
    }
}

const testHas = () => {
    let h = new HashTable()
    h.set('gua', 'name')
    h.set('uag', 'height')
    h.set('agu', 'location')

    ensure(h.has('gua'), 'test has 1')
    ensure(!h.has('xiao'), 'test has 2')
}

testHas()

