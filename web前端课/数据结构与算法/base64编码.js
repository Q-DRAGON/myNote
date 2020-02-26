const log = console.log.bind(console)

const ensure = function(condition, message) {
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('--- 测试成功')
    }
}

const ascii = function(char) {
    return char.charCodeAt(0)
}

const charFromAscii = function(code) {
    return String.fromCharCode(code)
}

const decimalToBinary = (n) => {
    if (n === 1) {
        return '1'
    }
    if (n === 0) {
        return '0'
    }
    let mod = (n % 2) == 1 ? '1' : '0'
    let div = Math.floor(n / 2)
    return decimalToBinary(div) + mod
}

const zfill_n = function(n) {
    return function() {
        let result = ''
        for (let i = 0; i < n; i++) {
            result += '0'
        }
        return result
    }
}

const zfill = function(str, size = 8) {
    let len = str.length
    let n = size - len
    let res = zfill_n(n)()
    return res
}

const binary = function(n) {
    let res = decimalToBinary(n)
    let r = zfill(res)
    return r + res
}

const cifangOf_2 = (n) => {
    let mul = 1
    while (n != 0) {
        mul *= 2
        n -= 1
    }
    return mul
}

const int = function(bin) {
    let sum = 0
    let len = bin.length
    for (let i = 0; i < len; i++) {
        let b = bin[i]
        if (b == '1') {
            sum += cifangOf_2(len - i - 1)
        }
    }
    return sum
}

const binaryStream = function(s) {
    let res = []
    for (let val of s) {
        let v = val.charCodeAt(0)
        v = binary(v)
        res.push(v)
    }
    return res.join('')
}

const stringFromBinary = function(bins) {
    let res = []
    for (let i = 0; i < bins.length; i += 8) {
        let r = bins.slice(i, i + 8)
        r = int(r)
        r = String.fromCharCode(r)
        res.push(r)
    }
    return res.join('')
}

const base64Parse = (stream) => {
    let result = []
    for (let i = 0; i < stream.length; i += 6) {
        let item = stream.slice(i, i + 6)
        item = int(item)
        result.push(item)
    }
    return result
}

const base64Encode = function(s) {
    let normal = Math.floor(s.length / 3)
    let specail = s.length % 3
    let map64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let specialBinaryStr = ''
    let normalBinaryStr = binaryStream(s.slice(0, normal * 3))
    if (specail) {
        let stream = ''
        for (let i = 0; i < 3 - specail; i++) {
            stream += zfill('')
        }
        let specailStr = s.slice(s.length - specail)
        specialBinaryStr = binaryStream(specailStr) + stream

        let result = []
        for (let i = 0; i < specialBinaryStr.length; i += 6) {
            let item = specialBinaryStr.slice(i, i + 6)
            let ref = zfill('', 6)
            if (item != ref) {
                item = int(item)
                item = map64[item]
            } else {
                item = '='
            }
            result.push(item)
        }
        specialBinaryStr = result.join('')
    }
    if (normal) {
        let normalBaseItems = base64Parse(normalBinaryStr)
        normalBaseItems = normalBaseItems.map(function(value) {
            return map64[value]
        })
        normalBinaryStr = normalBaseItems.join('')
    }
    return normalBinaryStr + specialBinaryStr
}

const base64Decode = function(s) {
    let map64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let result = []
    for (let val of s) {
        if (val == '=') {
            let item = zfill('', 6)
            result.push(item)
        } else {
            let index = map64.indexOf(val)
            let res = decimalToBinary(index)
            let item = zfill(res, 6) + res
            result.push(item)
        }
    }
    result = result.join('')
    let res = []
    for (let i = 0; i < result.length; i += 8) {
        let r = result.slice(i, i + 8)
        if (r != zfill('')) {
            r = int(r)
            r = String.fromCharCode(r)
            res.push(r)
        }
    }
    result = res.join('')
    return result
}

