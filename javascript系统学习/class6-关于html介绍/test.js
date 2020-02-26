var test_startsWith = function() {
    ensure(startsWith('guagua', 'gua'), 'startswith  测试 2')
    ensure(!startsWith('guagua', 'melon'),'startswith  测试 3')
    ensure(!startsWith('melongua', 'gua'), 'startswith  测试 4')
}


var test_findIn = function() {
    ensure(findIn('gua', 'g') === 0, 'findIn 测试 1')
    ensure(findIn('uagua', 'g') === 2,'findIn 测试 2')
    ensure(findIn('melon', 'g') === -1, 'findIn 测试 3')
}


var test_findAllIn = function() {
    log(findAllIn('guagua', 'g'), [0, 3], 'findAllIn 测试 1')
    log(findAllIn('uaguagua', 'g'), [2, 5],'findAllIn 测试 2')
    log(findAllIn('melon', 'g'), [], 'findAllIn 测试 3')
}

var test_findAllString = function() {
    log('find all str', findAllString('1012100120', '10'), [0, 4])
    log('find all str', findAllString('1012100120', '100'), [4])
    log('find all str', findAllString('1012100120', '3'), [])
}


var test_endsWith = function() {
    ensure(endsWith('guagua', 'gua'), 'endsWith  测试 2')
    ensure(!endsWith('guagua', 'melon'),'endsWith  测试 3')
    ensure(endsWith('melongua', 'gua'), 'endsWith  测试 4')
}

var students = [
    {
     'name': 'gua',
     'sex': '男',
     'score': 127,
    },
    {
     'name': 'gua',
     'sex': '男',
     'score': 17,
    },
    {
     'name': 'gua',
     'sex': '男',
     'score': 150,
     }
]

var __main = function() {
    test_startsWith()
    test_findIn()
    // test_findAllIn()
    // test_findAllString()
    test_endsWith()
    // log(topStudent(students))
    // log(formatedWeekday(3))
    //log(discount(50))
}

__main()
