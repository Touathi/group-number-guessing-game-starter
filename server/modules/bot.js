
function botgenerateRanNum(min, max) {

    console.log(min,max);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// console.log(generateRanNum());

module.exports = botgenerateRanNum;