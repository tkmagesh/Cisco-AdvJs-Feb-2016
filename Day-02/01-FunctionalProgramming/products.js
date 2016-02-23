var products = [
    {id : 4, name : "Pen", cost : 5, units : 100, category : 1},
    {id : 8, name : "Hen", cost : 100, units : 30, category : 1},
    {id : 7, name : "Ten", cost : 10, units : 10, category : 2},
    {id : 2, name : "Zen", cost : 10000, units : 1, category : 2},
    {id : 9, name : "Den", cost : 200, units : 20, category : 1}
];

/*
Sort
Filtering
All
Any
Min
Max
Sum
Aggregate
GroupBy
*/

console.describe = function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

console.describe('default list', function(){
    console.table(products);
});

console.describe('Sorting', function(){
    console.describe('default sorting', function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sort()
        console.table(products);
    });
    console.describe('Sorting any list by any attribute', function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }

        console.describe('sorting by cost', function(){
            sort(products, 'cost')
            console.table(products);
        });

        console.describe('sorting by units', function(){
            sort(products, 'units')
            console.table(products);
        });

         console.describe('sorting by name', function(){
            sort(products, 'name')
            console.table(products);
        });
    });
    console.describe('Sorting any list by anything', function(){
        //modify the below function
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }

        console.describe('sorting products by value [ value = units * cost ]', function(){
            var productComparerByValue = function(p1, p2){
                var p1Value = p1.cost * p1.units,
                    p2Value = p2.cost * p2.units;
                if (p1Value < p2Value) return -1;
                if (p1Value > p2Value) return 1;
                return 0;
            };
            sort(products, productComparerByValue);
            console.table(products);
        });


    });

});

console.describe('Filter', function(){
    function filter(list, criteriaFn){
        var result = [];
        for(var i=0; i<list.length; i++)
            if (criteriaFn(list[i]))
                result.push(list[i]);
        return result;
    }
    function negate(fn){
        return function(){
            return !fn.apply(this, arguments);
        };
    }

    var category1Predicate = function(product){
        return product.category === 1;
    }
    /*var nonCategory1Predicate = function(product){
        return !category1Predicate(product);
    }*/
    var nonCategory1Predicate = negate(category1Predicate);

    var costlyProductPredicate = function(product){
        return product.cost > 100;
    };
    /*var affordableProductPredicate = function(product){
        return !costlyProductPredicate(product);
    }*/
    var affordableProductPredicate = negate(costlyProductPredicate);

    console.describe('Products By Category - 1', function(){
        var category1Products = filter(products, category1Predicate);
        console.table(category1Products);
    });


    console.describe('Costly products', function(){
        var costlyProducts = filter(products, costlyProductPredicate);
        console.table(costlyProducts);
    });

    console.describe('Non category 1 products', function(){
        var nonCategory1Products = filter(products, nonCategory1Predicate);
        console.table(nonCategory1Products);
    });

    console.describe('Affordable products', function(){
        var affordableProducts = filter(products, affordableProductPredicate);
        console.table(affordableProducts);
    })
});

console.describe('All', function(){
    function all(list, predicate){
        for(var i=0; i<list.length; i++)
            if (!predicate(list[i])) return false;
        return true;
    }
    console.log("Are all products costly ? [cost > 100]", all(products, function(p){return p.cost > 100}));
});

console.describe('Any', function(){
    function any(list, predicate){
        for(var i=0; i<list.length; i++)
            if (predicate(list[i])) return true;
        return false;
    }
    console.log("All there ANY costly product ? [cost > 100]", any(products, function(p){return p.cost > 100}));
});

console.describe('Min', function(){
    function min(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i = 1; i < list.length; i++){
            var value = valueSelector(list[i]);
            if (value < result) result = value;
        }
        return result;
    }
    console.log('Min cost = ', min(products, function(product){ return product.cost; }));
})

console.describe('Max', function(){
    function max(list, valueSelector){
        var result = valueSelector(list[0]);
        for(var i = 1; i < list.length; i++){
            var value = valueSelector(list[i]);
            if (value > result) result = value;
        }
        return result;
    }
    console.log('Max cost = ', max(products, function(product){ return product.cost; }));
});

console.describe('Sum', function(){
    function sum(list, valueSelector){
        var result = 0;
        for(var i = 0; i < list.length; i++){
            var value = valueSelector(list[i]);
            result += value;
        }
        return result;
    }
    console.log('Sum of units = ', sum(products, function(product){ return product.units; }));
});

console.describe('Aggregate', function(){
    function aggregate(list, aggregatorFn, seed){
        var start = 0,
            result = seed;
        if (seed === undefined){
            start = 1;
            result = list[0];
        }
        for(var i=start; i<list.length; i++)
            result = aggregatorFn(result, list[i]);
        return result;
    }

    var minCost = aggregate(products, function(result, product){
        return result < product.cost ? result : product.cost
    }, Number.MAX_VALUE);
    console.log('Minimum cost = ', minCost);

     var maxCost = aggregate(products, function(result, product){
        return result > product.cost ? result : product.cost
    }, Number.MIN_VALUE);
    console.log('Maxmimum cost = ', maxCost);

     var sumOfUnits = aggregate(products, function(result, product){
        return result + product.units;
    }, 0);
    console.log('Sum of units = ', sumOfUnits);


    console.describe('CheapestProduct', function(){
        var cheapestProduct = aggregate(products, function(p1, p2){
            return p1.cost < p2.cost ? p1 : p2;
        });
        console.log(cheapestProduct);
    });

    var sumOfCostAndCount = aggregate(products, function(result, product){
        return {
            totalCost : result.totalCost + product.cost,
            count : ++result.count
        };
    },{totalCost : 0, count : 0});
    var averageCost = sumOfCostAndCount.totalCost / sumOfCostAndCount.count;
    console.log('Average Cost = ', averageCost);

});

    function aggregate(list, aggregatorFn, seed){
        var start = 0,
            result = seed;
        if (seed === undefined){
            start = 1;
            result = list[0];
        }
        for(var i=start; i<list.length; i++)
            result = aggregatorFn(result, list[i]);
        return result;
    }
console.describe('GroupBy', function(){
    /*function groupBy(list, keySelectorFn){
        var result = {};
        for(var i=0; i<list.length; i++){
            var key = keySelectorFn(list[i]);
            if (result[key] === undefined)
                result[key] = [];
            result[key].push(list[i]);
        }
        return result;
    }*/
    function groupBy(list, keySelectorFn){
        return aggregate(list, function(result, item){
            var key = keySelectorFn(item);
            result[key] = result[key] || [];
            result[key].push(item);
            return result;
        },{})
    }
    function printGroup(group){
        for(var key in group){
            console.describe('Key - ' + key, function(){
                console.table(group[key]);
            });
        }
    }

    console.describe("Products By Category", function(){
        var productsByCategory = groupBy(products, function(product){
            return product.category;
        });
        printGroup(productsByCategory);
    });

    console.describe("Products By Cost", function(){
        var productsByCost = groupBy(products, function(product){
            return product.cost > 100 ? "costly" : "affordable"
        });
        printGroup(productsByCost);
    });
});

