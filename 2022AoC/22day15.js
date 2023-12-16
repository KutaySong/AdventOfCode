// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi =     ham.map(satır => satır.match(/-?(\d+)/g).map(Number))
    bb = []
    ss = []
    const upsert = (arr, el) => !arr.some(([a,b])=> a==el[0] && b==el[1]) && arr.push(el)
    girdi.map(([sx,sy,bx,by])=> {
        upsert (bb, [bx,by])
        ss.push([sx, sy, Math.abs(sx-bx)+Math.abs(sy-by)])
    })
    const t1 = Date.now()
    const p1 = part1(veriseti); console.log(veriseti.toUpperCase(), "\tpart1:",p1,"\t\t(",Date.now()-t1,"ms)")
    const t2 = Date.now()
    const p2 = part2(veriseti); console.log(veriseti.toUpperCase(), "\tpart2:",p2,  "\t(",Date.now()-t2,"ms)")
}

function part1 (veriseti) {
    const yy = veriseti == 'test' ? 10 : 2000000
    let borderX = [Infinity,-Infinity] 
    girdi.map(([sx,sy,bx,by])=> {
        borderX[0] = Math.min(borderX[0], sx-Math.abs(sx-bx)+Math.abs(sy-by),bx)
        borderX[1] = Math.max(borderX[1], sx+Math.abs(sx-bx)+Math.abs(sy-by),bx)
    })
    let say = 0

    for (let xx=borderX[0]; xx <= borderX[1]; xx++) {   // diamond'ları hızlı atlamak için
        for (const [sx,sy,mnnt] of ss ) {
            if (Math.abs(sx-xx)+Math.abs(sy-yy)<=mnnt) {
                if (sx>xx) {
                    say += 2*(sx-xx) + 1
                    xx  += 2*(sx-xx)
                } else say++
            }
        }
    }
    const çıkar1 = bb.reduce((c,[a,b])  => (a>=borderX[0] && a<=borderX[1] && b==yy) ? c+1 : c , 0) 
    const çıkar2 = ss.reduce((c,[a,b,]) => (a>=borderX[0] && a<=borderX[1] && b==yy) ? c+1 : c , 0) 
    return say-1-çıkar1-çıkar2
}



function part2 (veriseti) {     // idea is to only look for the adjacent squares of the diamond shape
    const borderY = veriseti == 'test' ? 20 : 4000000
    for (const si of ss) {
        const çevresi = çevre(si)
        for (const [çx,çy] of çevresi) {
            if (çx<0 || çx>borderY || çy<0 || çy>borderY) continue
            if (ss.every(([sx,sy,mnnt],i)=> Math.abs(sx-çx)+Math.abs(sy-çy)>mnnt)) {
                return 4000000*çx+çy
            }
        }
    }
    
    function çevre ([sx,sy,mnnt]) {
        const arr = []
        let say = mnnt + 1
        while (say--) {
            arr.push([sx+mnnt+1-say, sy-say])
            arr.push([sx+say, sy+mnnt+1-say])
            arr.push([sx-mnnt-1+say, sy+say])
            arr.push([sx-say, sy-mnnt-1+say])
        }
        return arr
    }
}