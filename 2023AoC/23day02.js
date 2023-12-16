// https://adventofcode.com/2023/day/2

let lines = require('fs').readFileSync('./IO/02i.txt','utf8').split(/\r?\n/)
.map(l=>l.split(';')
.map(str=>[
    str.match(/(\d+) green/)?.[1] ?? 0,
    str.match(/(\d+) red/)?.[1] ?? 0,
    str.match(/(\d+) blue/)?.[1] ?? 0
].map(Number)))

const p1 = ()=> {
    return lines.reduce((c,line,i)=>
    line.every(([g,r,b])=>g<=13 && r<=12 && b<=14) ? c+i+1 : c, 0)
}

const p2 = ()=> {
    return lines.reduce((sum,line)=> sum + 
    Math.max(...line.map(l=>l[0]))*Math.max(...line.map(l=>l[1]))*Math.max(...line.map(l=>l[2])),0)
}

console.log("p1:",p1(),'(2085)')
console.log("p2:",p2(),'(79315)')