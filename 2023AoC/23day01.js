// https://adventofcode.com/2023/day/1

let lines = require('fs').readFileSync('./IO/01i.txt','utf8').split(/\r?\n/)

const p1 = ()=> {
    const numbers = lines.map(l=>l.split('')).map(x=> +(''+ x.find(d=> !isNaN(d))+ x.findLast(d=> !isNaN(d))))
    return numbers.reduce((a,c)=> a+c)
}

const p2 = ()=> {
    const literal = ['one','two','three','four','five','six','seven','eight','nine','1','2','3','4','5','6','7','8','9']
    const acro = (d) => d>8 ? +literal[d] : d+1
    
    let sum = 0
    for (let line of lines) {  
        const first= literal.reduce((c,a,i)=> c=(l=line.indexOf(a)      , l>-1 && l<c.pp ? {pp:l, ll:i} : c) ,{pp: Infinity,ll:-1})
        const last = literal.reduce((c,a,i)=> c=(l=line.lastIndexOf(a)  , l>-1 && l>c.pp ? {pp:l, ll:i} : c) ,{pp:-Infinity,ll:-1})
        sum += +(''+ acro(first.ll) + acro(last.ll))
    }
    return sum
}

console.log("p1:",p1(),'(55002)')
console.log("p2:",p2(),'(55093)')