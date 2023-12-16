// https://adventofcode.com/2022/

const bigdata = 1
const fs = require('fs');
const girdi = fs.readFileSync(bigdata?'input.txt':'test.txt', 'utf8').trim().split('\r\n')
const daş = girdi.map(gg => gg.split(' '))
const win = (a,b) => a==b ? 3 : (b-a+3)%3==1 ? 6 : 0
const c = {'A':1,'B':2,'C':3,'X':1,'Y':2,'Z':3}

part1()
function part1 () {
    const puan = daş.map(([a,b])=> c[b]+win(c[a],c[b]) )
    console.log("part1:",puan.reduce((a,b)=>a+b))
}
part2()
function part2 () {
    const sin = (a,b) => b==2 ? 3+a : b==1 ? (a+1)%3+1 : 6+a%3+1
    const puan = daş.map(([a,b])=> sin(c[a],c[b]) )
    console.log("part2:",puan.reduce((a,b)=>a+b))
}