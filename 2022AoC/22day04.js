// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi =     ham.map(satır => satır.match(/(\d+)/g).map(Number))
    console.log(veriseti.toUpperCase()+ " RESULTS")
    part1()
    part2()
}

function part1 () {
    let count = 0
    for (const g of girdi) {
        ((g[2] >= g[0] && g[1] >= g[3])||(g[0] >= g[2] && g[3] >= g[1])) 
        && count++
    }
    console.log("part1:",count)
}
function part2 () {
    let count = 0
    for (const g of girdi) {
        (g[1] >= g[2] && g[3] >= g[0])
        && count++
    }
    console.log("part2:",count)
}