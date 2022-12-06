// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim()
    girdi =     ham.split('')
    console.log(veriseti.toUpperCase()+ " RESULTS")
    part1(); part2()
}

function part1 () {
    const n = girdi.findIndex((_,i)=> {
        const set = new Set()
        girdi.slice(i,i+4).map(x=>set.add(x))
        return set.size == 4
    })
    console.log("part1:",n+4)
}
function part2 () {
    const n = girdi.findIndex((_,i)=> {
        const set = new Set()
        girdi.slice(i,i+14).map(x=>set.add(x))
        return set.size == 14
    })
    console.log("part2:",n+14)
}