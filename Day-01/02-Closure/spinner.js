create an objec and assign it to variable "spinner"

the object should behave as below:

var spinner = ....

spinner.up() // => 1
spinner.up() // => 2
spinner.up() // => 3
spinner.up() // => 4

spinner.down() // => 3
spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1

//revealing module pattern
function spinnerFactory(){
    var count = 0;
    function up(){
        return ++count;
    }
    function down(){
        return --count;
    }
    return {
        up : up,
        down : down
    }
}
