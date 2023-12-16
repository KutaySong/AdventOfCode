// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi     = ham.map(satır => satır.split('').map(Number))
    
    const t1 = Date.now(); const p1 = part1(); console.log(veriseti.toUpperCase(),"part1:",' '.repeat(20-veriseti.length-p1.toString().length),p1,"  (",(Date.now()-t1).toString().padStart(5, ' '),"ms)",veriseti=="test"?'21':'1845')
    
    const t2 = Date.now(); const p2 = part2(); console.log(veriseti.toUpperCase(),"part2:",' '.repeat(20-veriseti.length-p2.toString().length),p2,"  (",(Date.now()-t2).toString().padStart(5, ' '),"ms)",veriseti=="test"?'8':'')
}

function part1 (veriseti) {
    let say = 4*(girdi.length-1)
    for (let i=1; i < girdi.length-1; i++) {
        for (let j=1; j < girdi[0].length-1; j++) {
            let visi = true
            for (let üst=0; üst < i; üst++)                 {if (girdi[üst][j]>=girdi[i][j]) {visi=false; break}}
            if (visi) {say++; continue}
            visi = true
            for (let alt=i+1; alt < girdi.length; alt++)    {if (girdi[alt][j]>=girdi[i][j]) {visi=false; break}}
            if (visi) {say++; continue}            
            visi = true
            for (let sol=0; sol < j; sol++)                 {if (girdi[i][sol]>=girdi[i][j]) {visi=false; break}}
            if (visi) {say++; continue}
            visi = true
            for (let sağ=j+1; sağ < girdi[0].length; sağ++) {if (girdi[i][sağ]>=girdi[i][j]) {visi=false; break}}
            if (visi) {say++; continue}
        } 
    }
    return say 
}

function part2 (veriseti) {
    let max = 0
    for (let i=1; i < girdi.length-1; i++) {
        for (let j=1; j < girdi[0].length-1; j++) {
            let üü=0; let aa=0; let sl=0; let sğ=0;
            for (let üst=i-1; üst >=0; üst--)                   {üü++; if (girdi[üst][j]>=girdi[i][j]) break}
            for (let alt=i+1; alt < girdi.length; alt++)        {aa++; if (girdi[alt][j]>=girdi[i][j]) break}
            for (let sol=j-1; sol >=0; sol--)                   {sl++; if (girdi[i][sol]>=girdi[i][j]) break}
            for (let sağ=j+1; sağ < girdi[0].length; sağ++)     {sğ++; if (girdi[i][sağ]>=girdi[i][j]) break}
            max = Math.max(max,üü*aa*sl*sğ)
        } 
    }
    return max 
}