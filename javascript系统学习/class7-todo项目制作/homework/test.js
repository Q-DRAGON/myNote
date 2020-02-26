
var test_join = function() {
    ensure(join('#', ['hello', 'gua']) === 'hello#gua', 'join 测试 1')
    ensure(join(' ', ['hello', 'gua']) === 'hello gua', 'join 测试 2')
    ensure(join('\n', ['multi', 'line', 'string']) === 'multi\nline\nstring', 'join 测试 3')
}


var test_split = function() {
    log(split('1 2 3'), ['1', '2', '3'], 'split 测试 1')
    log(split('a=b&c=d', '&'), ['a=b', 'c=d'], 'split 测试 2')
}

var test_replaceAll = function() {
    ensure(replaceAll('hellogua', 'gua', 'wor') == 'hellowor', 'replaceAll 测试 1')
    ensure(replaceAll('helloguagua', 'gua', 'wor') == 'helloworwor', 'replaceAll 测试 2')
    ensure(replaceAll('helloguawor', 'gua', 'xiao') == 'helloxiaowor', 'replaceAll 测试 3')
}

var test_str1 = function() {
    ensure(str1(1) === '1', 'str1 测试 1')
    ensure(str1(2) === '121', 'str1 测试 2')
    ensure(str1(3) === '12321', 'str1 测试 3')
}

var test_str2 = function() {
    ensure(str2(1) === 'A', 'str2 测试 1')
    ensure(str2(2) === 'ABA', 'str2 测试 2')
    ensure(str2(3) === 'ABCBA', 'str2 测试 3')
}

var __main = function() {
    test_join()
    // test_split()
    test_replaceAll()
    test_str1()
    test_str2()
    // log(addTable())
    // log(range1(1, 5))
    // log(range2(1, 5, 1))
    // log(range2(0, 6, 2))
    // log(range3(6, 0, -1))
    log(markedSquare(array))
}


__main()
