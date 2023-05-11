



function generateRanNum() {
    // 1 = Math.ceil(1);
    // 25 = Math.floor(25);
    return Math.floor(Math.random() * (25 - 1 + 1)) + 1;
}

console.log(generateRanNum());

module.exports = generateRanNum();