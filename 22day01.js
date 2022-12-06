// https://adventofcode.com/2022/

const bigdata = 0
const fs = require('fs');
const girdi = fs.readFileSync(bigdata?'input.txt':'test.txt', 'utf8').trim().split('\r\n\r\n')
const elves = girdi.map(gg => gg.split('\r\n').map(Number))

part1()
function part1 () {
    const max = Math.max(...elves.map(e => e.reduce((a,b) => a+b)))
    console.log("part1:",max)
}
part2()
function part2 () {
    const max3 = elves.map(e => e.reduce((a,b) => a+b)).sort((a,b)=>a-b).slice(-3).reduce((a,b) => a+b)
    console.log("part2:",max3)
}