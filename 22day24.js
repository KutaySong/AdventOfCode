// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').split(/\r?\n/)
    girdi     = ham.slice(0,-1).slice(1).map(a=> a.slice(1,-1))
    
    const t1 = Date.now(); const p1 = part1(); console.log(veriseti.toUpperCase(),"part1:",' '.repeat(20-veriseti.length-p1.toString().length),p1,"  (",(Date.now()-t1).toString().padStart(5, ' '),"ms)",veriseti=="test"?'18':'')
    const t2 = Date.now(); const p2 = part2(); console.log(veriseti.toUpperCase(),"part2:",' '.repeat(20-veriseti.length-p2.toString().length),p2,"  (",(Date.now()-t2).toString().padStart(5, ' '),"ms)",veriseti=="test"?'54  ':'')
}

function part1 (veriseti) {
    let say = 1
    let kuyruk = []
    if (girdi[0][0] == '.') kuyruk.push([0,0])
    let tahta = adım(girdi)
    
    const manhattan = (a,b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])
    const upsert = (arr, item) => { 
        const i = arr.findIndex(x => x[0] == item[0] && x[1] == item[1])
        if (i > -1) arr[i] = item
        else arr.push(item)
    }
    while (say < 10000 ) {
        say++
        tahta = adım(tahta)
        const yeniKuyruk = []
        if (!tahta[0][0].length) yeniKuyruk.push([0,0])
        kuyruk.map(kuy => {
            for (let i = 0; i < tahta.length; i++) {
                for (let j = 0; j < tahta[0].length; j++) {
                    if (!tahta[i][j].length && manhattan(kuy,[i,j]) < 2 ) upsert(yeniKuyruk,[i,j])
                }
            }
        })
        kuyruk = yeniKuyruk
        const bulunacak = [girdi.length-1,girdi[0].length-1]
        const i = kuyruk.findIndex(x => x[0] == bulunacak[0] && x[1] == bulunacak[1])
        if (i > -1) break
    }
    return say+1
}
function adım (tahta) {
    const next = Array(tahta.length).fill().map(() => Array(tahta[0].length).fill().map(() => []))
    const olasıE = []
    for (let i = 0; i < tahta.length; i++) {
        for (let j = 0; j < tahta[0].length; j++) {
            const ipls = (i+1)%tahta.length
            const imns = (i-1+tahta.length)%tahta.length
            const jpls = (j+1)%tahta[0].length
            const jmns = (j-1+tahta[0].length)%tahta[0].length
            if (tahta[imns][j]   .includes('v')) next[i][j].push('v')
            if (tahta[ipls][j]   .includes('^')) next[i][j].push('^')
            if (tahta[i][jmns]   .includes('>')) next[i][j].push('>')
            if (tahta[i][jpls]   .includes('<')) next[i][j].push('<')
        }
    }
    return next
}

function part2 (veriseti) {
    let say = 1
    let kuyruk = []
    if (girdi[0][0] == '.') kuyruk.push([0,0])
    let tahta = adım(girdi)
    
    const manhattan = (a,b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])
    const upsert = (arr, item) => { 
        const i = arr.findIndex(x => x[0] == item[0] && x[1] == item[1])
        if (i > -1) arr[i] = item
        else arr.push(item)
    }
    const hedef = [[girdi.length-1,girdi[0].length-1],[0,1],[girdi.length-1,girdi[0].length-1]]
    let aşama = 0
    while (say < 10000 ) {
        say++
        tahta = adım(tahta)
        const yeniKuyruk = []
        if (!tahta[0][0].length && !(aşama%2)) yeniKuyruk.push([0,0])
        if (!tahta[0][0].length && (aşama%2)) yeniKuyruk.push([girdi.length-1,girdi[0].length-1])
        kuyruk.map(kuy => {
            for (let i = 0; i < tahta.length; i++) {
                for (let j = 0; j < tahta[0].length; j++) {
                    if (!tahta[i][j].length && manhattan(kuy,[i,j]) < 2 ) upsert(yeniKuyruk,[i,j])
                }
            }
        })

        kuyruk = yeniKuyruk
        const i = kuyruk.findIndex(x => x[0] == hedef[aşama][0] && x[1] == hedef[aşama][1])
        if (i > -1) {aşama++; kuyruk = []}
        if (aşama>2) break
    }
    return say+1
}