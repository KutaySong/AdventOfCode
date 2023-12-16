// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi     = ham.map(satır => satır.match(/-?(\d+)/g).map(Number))
    
    const t1 = Date.now()
    const p1 = part1(); console.log(veriseti.toUpperCase(),"part1:",' '.repeat(20-veriseti.length-p1.toString().length),p1,"  (",(Date.now()-t1).toString().padStart(5, ' '),"ms)",veriseti=="test"?'?64':'?4340')
    const t2 = Date.now()
    const p2 = part2(); console.log(veriseti.toUpperCase(),"part2:",' '.repeat(20-veriseti.length-p2.toString().length),p2,"  (",(Date.now()-t2).toString().padStart(5, ' '),"ms)",veriseti=="test"?'?58':'?2468')
}

function part1 (arr=girdi) {
    const taş = new Set()
    let say = 0
    arr.map(küp=>{
        const komşu6 = k6(küp)
        say += 6 - 2* komşu6.filter(n => taş.has(JSON.stringify(n))).length
        taş.add(JSON.stringify(küp))
    })
    return say 
}
function k6 (küp) {     // touching neighbors
    const komşu6 = []
    küp.map((_,i)=> [-1,1].map(m=> {const a=küp.slice(); a[i]+=m; komşu6.push(a)}))
    return komşu6
}
function k26 ([x,y,z]) { // 3x3x3 neighbors
    const komşu26 = []
    const adj = [-1, 0, 1].flatMap(x => [-1, 0, 1].flatMap(y => [-1, 0, 1].map(z => [x, y, z]))).filter(([x, y, z]) => !(!x && !y && !z))
    adj.map(([a,b,c])=> komşu26.push([x+a,y+b,z+c]))
    return komşu26
}


function part2 () { 
    const taş = new Set()
    girdi.map(küp=>{
        const komşu6 = k6(küp)
        taş.add(JSON.stringify(küp))
    })
    let boş = new Set()
    ;[...taş].map(t=> k26(JSON.parse(t)).map(n=> {if (!taş.has(JSON.stringify(n))) boş.add(JSON.stringify(n))}))
    boş = [...boş]
    
    const chunks= []    // connect empty spaces
    while (hava = boş.pop()) {
        hava = JSON.parse(hava)
        chunks.push(new Set([JSON.stringify(hava)]))
        const komşu6 = k6(hava)
        while (k = komşu6.pop()) {
            if (boş.includes(JSON.stringify(k))) {
                chunks[chunks.length-1].add(JSON.stringify(k))
                boş = boş.filter(b=> b!=JSON.stringify(k))
                k6(k).map(kk=> komşu6.push(kk))
            }
        }
    }
    const dışarı = chunks.sort((a,b)=> b.size-a.size)[0]    // greatest chunk is the surrounding air
    
    let say = 0
    ;[...taş].map(JSON.parse).map(t => k6(t).map(k => {if (dışarı.has(JSON.stringify(k))) say++}))
    return say 
}

