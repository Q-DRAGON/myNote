var test_isPrime = function() {
    ensure(isPrime(5), 'isPrime test 1 fail')
    ensure(!isPrime(4), 'isPrime test 2 fail')
}

var test_capString = function() {
    ensure(capString('i am HappY today') === 'I Am Happy Today', 'capString test 1 fail')
    ensure(capString('I AM HAPPY TODAY') === 'I Am Happy Today', 'capString test 2 fail')
}

// var test_letterCount = function() {
//
// }

var __main = function() {
    test_isPrime()
    // log(primeNumbers())
    test_capString()
    // log(letterCount('hello'))
    var param = {
        'foo': 1,
        'bar': 'far',
    }
    log(queryFromObject(param))
    log(argsFromQuery('foo=1&bar=far'))
}

__main()
