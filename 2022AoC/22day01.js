// https://adventofcode.com/2022/

const bigdata = 0

const girdi = require('fs').readFileSync('./IO/01-'+( 1 ?'input.txt':'test.txt'),'utf8').split(/\r?\n/)
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