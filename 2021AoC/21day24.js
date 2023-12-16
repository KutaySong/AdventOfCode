const fs = require('fs');
const komutlar = fs.readFileSync('21day24input.txt', 'utf8').split('\n').map(a=>a.split(' ').map(b=>b.split('').filter(a=>a!=="\r").join('')))
const param = []

for (let i=0; i < 14; i++) {
    param.push([Number(komutlar[i*18+5][2]), Number(komutlar[i*18+4][2]), Number(komutlar[i*18+15][2])])
}

const w = [9,8,7,6,5,4,3,2,1].reverse()

function calcZ (zp,w,p) {
    let z = zp
    const x = (z%26)+p[0]!==w ? 1 : 0
    z /= p[1]
    z = ~~z		// truncate towards zero
    z *= 25*x + 1
    z += (w+p[2])*x
    return z
}

function play () {
    const havuzZ = [[12,13,14,15,16,17,18,19,20]]
    console.log(havuzZ.length,".nci basak ihtimalleri: ",havuzZ.slice(-1)[0].slice(-3))
    
    while (havuzZ.length<14) {
        const zler = havuzZ.slice(-1)[0]
        const eskiMax = zler.reduce((c,z)=> c = z>c ? z : c,0)
        const pthis = param[13-havuzZ.length]
        const yeniMax = eskiMax * pthis[1] + 10 + pthis[2]
        const zz = 	Array.from(Array(yeniMax+1), (_,i)=>i)
        const ihtimaller = zz.filter(iht => w.some(ww=> zler.includes(calcZ(iht,ww,pthis))))
        havuzZ.push(ihtimaller)
        console.log(havuzZ.length,".nci basak ihtimalleri: denenen max:",yeniMax," son3:",havuzZ.slice(-1)[0].slice(-3))
    }
    
    const code = []
    const xena = [0] // for logging purposes
    debugger
    let zet = 0
    havuzZ.pop()
    havuzZ.unshift([0])
    for (let i=0; i < 14; i++) {
        const zler = havuzZ.pop()
        const rakam = w.find(ww=> zler.includes(calcZ(zet,ww,param[i])))
        code.push(rakam)
        zet = calcZ(zet,rakam,param[i])
        xena.push(zet)
    }
    console.log("Bulunan:",code)
    console.log("Z:",xena)
}


play()

