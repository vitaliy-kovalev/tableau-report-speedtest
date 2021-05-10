function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function arr_sum(array) {
    return array.reduce(function(sum, a) {return sum + Number(a)}, 0)
}

function arr_avg(array) {
    return arr_sum(array) / (array.length || 1)
}