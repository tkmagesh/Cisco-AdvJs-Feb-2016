Write a function that checks if the given number is a prime number of not.  The algorithm should NOT run more than once for a given number

isPrime(100) // => run algo
isPrime(101) // => run algo
isPrime(102) // => run algo

isPrime(100)  // => do not run algo, but return the result from cache
isPrime(101)  // => do not run algo, but return the result from cache
isPrime(102)  // => do not run algo, but return the result from cache


function primeFinderFactory(){
    var cache = {};
    function checkPrime(n){
        console.log('processing - ', n)
        if (n <= 3) return true;
        for(var i = 2; i <= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    return function (n){
        if (cache[n] === undefined)
            cache[n] = checkPrime(n);
        return cache[n];
    }
}

function oddEvenFinderFactory(){
    var cache = {};
    function checkOddOrEven(n){
        console.log('processing - ', n);
        return n % 2 === 0 ? 'even' : 'odd';
    }
    return function (n){
        if (cache[n] === undefined)
            cache[n] = checkOddOrEven(n);
        return cache[n];
    }
}

function memoize(algoFn){
    var cache = {};
    return function (){
        var key = JSON.stringify(arguments);
        if (cache[key] === undefined)
            cache[key] = algoFn.apply(this, arguments);
        return cache[key];
    }
}


