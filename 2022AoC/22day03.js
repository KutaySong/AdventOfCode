// https://adventofcode.com/2022/

const bigdata = 1
const fs = require('fs');
const girdi = fs.readFileSync(bigdata?'input.txt':'test.txt', 'utf8').trim().split('\r\n')
const veri = girdi.map(gg => [gg.slice(0,gg.length/2), gg.slice(gg.length/2)])
const puan  = (a) => a.charCodeAt(0)>96 ? a.charCodeAt(0)-96 : a.charCodeAt(0)-38
const kesiş = (arr) => arr[0].split('').find(letter => arr.every(ar2 => ar2.split('').includes(letter)))
const katla = (arr, n) => arr.reduce((c,a,i) => (i%n ? c[c.length-1].push(a) : c.push([a])) && c, [])
const tt    = (a,b)=>a+b


part1()
function part1 () {
    console.log("part1:",veri.map(duo=> puan(kesiş(duo))).reduce(tt))
}
part2()
function part2 () {
    const parti = katla(girdi,6)
    console.log("part2:",parti.map(altılı=> katla(altılı,3).map(üçlü=>puan(kesiş(üçlü))).reduce(tt)).reduce(tt))
}