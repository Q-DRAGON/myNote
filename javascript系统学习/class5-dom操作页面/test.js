// 测试函数
var test_zfill = function() {
    ensureEqual(zfill(1, 4), '0001', 'zfill 测试 1')
    ensureEqual(zfill(23, 4), '0023', 'zfill 测试 2')
    ensureEqual(zfill(12345, 4), '12345', 'zfill 测试 3')
    ensureEqual(zfill(169, 5), '00169', 'zfill 测试 4')
}

var test_ljust = function() {
    ensure(ljust('gua', 5) === 'gua  ', 'ljust 测试 1')
    ensure(ljust('guagua', 5) === 'guagua', 'ljust 测试 2')
    ensure(ljust('gua', 5, '*') === 'gua**', 'ljust 测试 3')
}

var test_rjust = function() {
    ensure(rjust('gua', 5) === '  gua', 'rjust 测试 1')
    ensure(rjust('guagua', 5) === 'guagua', 'rjust 测试 2')
    ensure(rjust('gua', 5, '*') === '**gua', 'rjust 测试 3')
}

var test_center = function() {
    ensureEqual(center('gua', 5), ' gua ', 'center 测试 1')
    ensureEqual(center('gua', 5, '*'), '*gua*', 'center 测试 2')
    ensureEqual(center('gw', 5), ' gw  ', 'center 测试 3')
    ensureEqual(center('gua', 6), ' gua  ', 'center 测试 4')
}

var test_is_space = function() {
    ensure(is_space(' '), 'is_space 测试 1')
    ensure(is_space('   '), 'is_space 测试 2')
    ensure(!is_space(''), 'is_space 测试 3')
    ensure(!is_space('gua'), 'is_space 测试 4')
}

var test_is_digit = function() {
    ensure(is_digit('123'), 'is_digit 测试 1')
    ensure(is_digit('0'), 'is_digit 测试 2')
    ensure(!is_digit('  '), 'is_digit 测试 3')
    ensure(!is_digit('1.1'), 'is_digit 测试 4')
    ensure(!is_digit('gua'), 'is_digit 测试 5')
}

var test_strip_left = function() {
    ensure(strip_left('  gua') === 'gua', 'strip_left 测试 1')
    ensure(strip_left(' gua  ') === 'gua  ', 'strip_left 测试 2')
    ensure(strip_left('') === '', 'strip_left 测试 3')
    ensure(strip_left('    ') === '', 'strip_left 测试 4')
}

var test_strip_right = function() {
    ensure(strip_right('  gua') === '  gua', 'strip_right 测试 1')
    ensure(strip_right(' gua  ') === ' gua', 'strip_right 测试 2')
    ensure(strip_right('') === '', 'strip_right 测试 3')
    ensure(strip_right('    ') === '', 'strip_right 测试 4')
}

var test_strip = function() {
    ensure(strip('  gua') === 'gua', 'strip 测试 1')
    ensure(strip(' gua  ') === 'gua', 'strip 测试 2')
    ensure(strip('') === '', 'strip 测试 3')
    ensure(strip('    ') === '', 'strip 测试 4')
}

var test_replace = function() {
    ensureEqual(replace('hello, world', 'world', 'gua'), 'hello, gua', 'replace 测试 1')
    ensureEqual(replace('hello', 'world', 'gua'), 'hello', 'replace 测试 2')
    ensureEqual(replace('hello', 'll', 'gua'), 'heguao', 'replace 测试 3')
}

var __main = function() {
    test_zfill()
    test_ljust()
    test_rjust()
    test_center()
    test_is_space()
    test_is_digit()
    test_strip_left()
    test_strip_right()
    test_strip()
    test_replace()
}

__main()
