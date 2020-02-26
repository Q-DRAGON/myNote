var ensure = function(condition, message) {
    if(!condition) {
        log('***测试失败', message)
    }
}

var ensureEqual = function(a, b, message) {
    if (a != b) {
        log(`***测试失败， ${a} 不等于 ${b}, ${message}`)
    }
}

var arrayEquals = function(a, b) {
    for (var i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) {
            return false
        }
    }
    return true
}

var test_unique = function() {
    ensure(arrayEquals( unique([1, 2, 3, 1, 3, 5]), [1, 2, 3, 5] ), 'test 1')
    ensure(arrayEquals(unique([1, 1, 3, 3, 1, 3]), [1, 3]), 'test 2')
}

var test_intersection = function() {
    ensure(arrayEquals(intersection([1, 2, 3, 4, 6, 5], [1, 2, 3, 5, 8]), [1, 2, 3, 5]), 'intersection test 1')
    ensure(arrayEquals(intersection([1, 1, 3, 9, 8, 3], [9, 3, 10]), [9, 3]), 'intersection test 2')
}

var test_union = function() {
    ensure(arrayEquals(union([1, 2, 3], [4, 6, 5]), [1, 2, 3, 4, 6, 5]), 'union test 1')
    ensure(arrayEquals(union([1, 1, 3], [9, 8, 3]), [1, 1, 3, 9, 8, 3]), 'union test 2')
}


 var test_difference = function() {
     ensure(arrayEquals(difference([1, 2, 3], [4, 6, 5]), [1, 2, 3]), 'difference test 1')
     ensure(arrayEquals(difference([1, 1, 3], [9, 8, 3]), [1, 1]), 'difference test 2')
 }

 var test_differenceAll = function() {
     ensure(arrayEquals(differenceAll([1, 2, 3], [4, 6, 5]), [1, 2, 3, 4, 6, 5]), 'differenceAll test 1')
     ensure(arrayEquals(differenceAll([1, 1, 3], [9, 8, 3]), [1, 9, 8]), 'differenceAll test 2')
 }

 var test_isSubset = function() {
     ensure(isSubset([1, 2, 3], [1, 2, 3, 4, 6, 5]), 'isSubset test 1')
     ensure(isSubset([2, 3], [1, 2, 3, 4, 6, 5]), 'isSubset test 1')
 }

// var __main = function() {
//     test_unique()
//     test_intersection()
//     test_union()
//     test_difference()
//     test_differenceAll()
//     test_isSubset()
// }
//
// __main()
