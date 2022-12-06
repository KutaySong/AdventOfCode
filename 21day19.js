// https://adventofcode.com/2021/day/19

const bigdata = 1
const fs = require('fs');
const girdi = fs.readFileSync(bigdata?'input.txt':'test.txt', 'utf8').trim().split('\r\n\r\n')
const sc = girdi.map(gg => gg.split('\r\n').slice(1).map(satır=>satır.split(",").map(Number)))
const sorted = sc.map(ssc=>[0,1,2].map(ii=> ssc.map(b=>b[ii]).sort((a,b)=>a-b)))
let stack, order

if (fs.existsSync('stack.json') && bigdata) {
    ({ stack, order } = JSON.parse(fs.readFileSync('stack.json', 'utf8')))
} else stackÇıkar()

part2()

function part1 () {
    stack.reverse()
    order.reverse()
    
    order.map(o=> stack.filter(s => s[1]==o).map(s=> birleştir(...s)))
    console.log("sonuç:",sc.map(s=>s.length))
}
function part2 () {
    stack.reverse()
    order.reverse()
    
    const gps = order.map( _ => [])
    gps[0] = [[0,0,0]]
    order.map(o=> stack.filter(s => s[1]==o).map(s=> {
        gps[s[0]].push(s[2].shift.map(a=>-a))
        gps[s[1]].map(a=> {
            const nx = (s[2].rotasyon[0]<0 ? -1 : 1) * a[Math.abs(s[2].rotasyon[0])-1] - s[2].shift[0]
            const ny = (s[2].rotasyon[1]<0 ? -1 : 1) * a[Math.abs(s[2].rotasyon[1])-1] - s[2].shift[1]
            const nz = (s[2].rotasyon[2]<0 ? -1 : 1) * a[Math.abs(s[2].rotasyon[2])-1] - s[2].shift[2]
            gps[s[0]].push([nx, ny, nz])
        })
    }))
    
    let maks = 0
    for (let g of gps[0]) {
        for (let j of gps[0]) {
            const manhattan = Math.abs(g[0]-j[0]) + Math.abs(g[1]-j[1]) + Math.abs(g[2]-j[2])
            if (manhattan>maks)
            maks = manhattan
        }
    }
    console.log("manhattan:",maks)
}


function stackÇıkar () {    
    const start = Date.now()
    
    stack = []
    order  = []
    sırada  = [0]
    
    while (sırada.length) {
        const i = sırada.shift()
        for (let j=0; j < sc.length; j++) {
            if (i==j || order.includes(j)) continue
            const çakışım = kesiştir(i,j)
            if (çakışım) {
                stack.push([i, j, çakışım])
                sırada.push(j)
                order.push(j)
                console.log("sıra:",order)
            }
        }
    }
    
    if (bigdata)
    fs.writeFileSync('stack.json', JSON.stringify({stack:stack, order:order}, null, 2))
    console.log("süre:", Date.now()-start)
}


function birleştir (ind1,ind2,çakışım) {
    sc[ind2].map(s => {
        const nx = (çakışım.rotasyon[0]<0 ? -1 : 1) * s[Math.abs(çakışım.rotasyon[0])-1] - çakışım.shift[0]
        const ny = (çakışım.rotasyon[1]<0 ? -1 : 1) * s[Math.abs(çakışım.rotasyon[1])-1] - çakışım.shift[1]
        const nz = (çakışım.rotasyon[2]<0 ? -1 : 1) * s[Math.abs(çakışım.rotasyon[2])-1] - çakışım.shift[2]
        if (sc[ind1].every(dot => dot[0]!=nx || dot[1]!=ny || dot[2]!=nz)) sc[ind1].push([nx,ny,nz])
    })
}

function kesiştir (id1, id2) {
    const rotasyon =[0,0,0] //[-2,1,3] : -y,x,z
    const shift =   [0,0,0]
    let sonuç
    [0,1,2].map(ii=> {
        [-3,-2,-1,1,2,3].map(jj=> {
            sonuç = çakıştır(sorted[id1][ii],sorted[id2][jj<0?-jj-1:jj-1].map(a=>a*(jj<0?-1:1)))
            if (sonuç.length) {
                shift[ii] = sonuç[0]
                rotasyon[ii] = jj
            }
        })
    })
    if (rotasyon.includes(0)) return false
    else return {rotasyon: rotasyon, shift:shift}
}

function çakıştır (s1, s2) {
    const say = (a, b) => a.reduce((c,aa)=> (aa>-1001 && aa<1001 && b.includes(aa))?c+1:c,0)
    for (const a1 of s1) {
        for (const a2 of s2) {
            if (say(s1.map(s=>s+a2-a1),s2)>=12) return [a2-a1]
        }
    }
    return false
}

