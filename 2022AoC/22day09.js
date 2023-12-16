// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi     = ham.map(satır => {const g = satır.split(' '); return [g[0], Number(g[1])]})
    
    const t1 = Date.now(); const p1 = part1(); console.log(veriseti.toUpperCase(),"part1:",' '.repeat(20-veriseti.length-p1.toString().length),p1,"  (",(Date.now()-t1).toString().padStart(5, ' '),"ms)",veriseti=="test"?'13':'')
    const t2 = Date.now(); const p2 = part2(); console.log(veriseti.toUpperCase(),"part2:",' '.repeat(20-veriseti.length-p2.toString().length),p2,"  (",(Date.now()-t2).toString().padStart(5, ' '),"ms)",veriseti=="test"?'36':'')
}

function part1 (veriseti) {
    let say = 0
    const manhattan = (a,b) => Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])
    const hpos = [[0,0]]
    girdi.map(g=>{
        let count = g[1]
        while (count--) {
            switch (g[0]) {
                case 'L': hpos.push([hpos.slice(-1)[0][0]-1,hpos.slice(-1)[0][1]]); break
                case 'R': hpos.push([hpos.slice(-1)[0][0]+1,hpos.slice(-1)[0][1]]); break
                case 'U': hpos.push([hpos.slice(-1)[0][0],hpos.slice(-1)[0][1]+1]); break
                case 'D': hpos.push([hpos.slice(-1)[0][0],hpos.slice(-1)[0][1]-1]); break 
            }
        }
    })
    const en = Math.max(...hpos.map(p=>p[1]))
    tpos = new Set([0])
    let tfin = [0,0]
    hpos.map(hfin => {
        tfin = kuyruk(hfin,tfin)
        tpos.add(tfin[0]+1000*tfin[1])
    })
    
    return tpos.size 
}

function part2 (veriseti) {
    const hpos = [[0,0]]
    girdi.map(g=>{
        let count = g[1]
        while (count--) {
            switch (g[0]) {
                case 'L': hpos.push([hpos.slice(-1)[0][0]-1,hpos.slice(-1)[0][1]]); break
                case 'R': hpos.push([hpos.slice(-1)[0][0]+1,hpos.slice(-1)[0][1]]); break
                case 'U': hpos.push([hpos.slice(-1)[0][0],hpos.slice(-1)[0][1]+1]); break
                case 'D': hpos.push([hpos.slice(-1)[0][0],hpos.slice(-1)[0][1]-1]); break 
            }
        }
    })
    tpos = new Set()
    const tt = Array(10).fill().map(a=>[0,0])
    hpos.map(hfin => {
        tt[0] = kuyruk(hfin,tt[0])
        for (let i=1; i < 10; i++) {
            tt[i] = kuyruk(tt[i-1],tt[i])
        }
        tpos.add(JSON.stringify(tt[8]))
    })
    return tpos.size 
}

function manhattan (a,b) {return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1])}
function kuyruk (hfin,tmu) {
    const tfin = tmu
    if (manhattan(hfin,tfin)==2) { 
        if (hfin[1]==tfin[1]) tfin[0]+= hfin[0]<tfin[0] ? -1 : 1
        if (hfin[0]==tfin[0]) tfin[1]+= hfin[1]<tfin[1] ? -1 : 1
    } else if (manhattan(hfin,tfin)>2) { 
        if (hfin[1]!=tfin[1]) tfin[1]+= hfin[1]<tfin[1] ? -1 : 1
        if (hfin[0]!=tfin[0]) tfin[0]+= hfin[0]<tfin[0] ? -1 : 1
    }
    return tfin
}