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
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }

        console.describe('sorting products by value [ value = units * cost ]', function(){
            //sort(products, 'cost')
            console.table(products);
        });


    });

});
