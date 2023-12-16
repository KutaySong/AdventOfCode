
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').filter(a=>a.length)

const regex = /-?\d+/g;
const dize = input.map(satır => {
    const arr = satır.match(regex).map(Number)
    return {
        komut:  satır.slice(0,3).trim(),
        v:      [[arr[0],arr[1]],[arr[2],arr[3]],[arr[4],arr[5]]]
    }
})
// .filter(d => d.v[0][0]>=-50 && d.v[0][1]<=50 && d.v[1][0]>=-50 && d.v[1][1]<=50 && d.v[2][0]>=-50 && d.v[2][1]<=50)

let küp = []
let str = dize.shift()
while (str.komut !== "on" && dize.length) {
    str = dize.shift()
}
küp.push(str.v)
while (dize.length) {
    str = dize.shift()
    const yeniKüp = []
    const kesişenler = []
    for (const k of küp) {      // trick: on'da da off'da da çıkarıyorsun ki 2 kere eklemiş olma
        if (!ıska(k,str.v)) {
            çıkar(k,str.v,yeniKüp)  
        } else
        yeniKüp.push(k)
    }
    if (str.komut === "on")  yeniKüp.push(str.v)

    küp = yeniKüp
}
console.log(küp.reduce((c,a) => c+(a[0][1]-a[0][0]+1)*(a[1][1]-a[1][0]+1)*(a[2][1]-a[2][0]+1) ,0))


function ıska (a,b) {
    return  a[0][1]<b[0][0]||a[0][0]>b[0][1] || a[1][1]<b[1][0]||a[1][0]>b[1][1] || a[2][1]<b[2][0]||a[2][0]>b[2][1]
}
function çıkar (a3d,b3d, stack) {
    const g = gölgeEksi(a3d,b3d)
    pushNonzero([2],[1],[1])
    pushNonzero([1,2],[2],[1])
    pushNonzero([1,2],[1,2],[2])
    pushNonzero([0],[1,2],[1,2])
    pushNonzero([0,1,2],[0],[1,2])
    pushNonzero([0,1,2],[0,1,2],[0])
    
    function pushNonzero (tx,ty,tz) { //([0,1,2],[0],[1,2])
        const x = tx.reduce((c,a)=>tak(c,g.xl[a]),[])
        const y = ty.reduce((c,a)=>tak(c,g.yl[a]),[])
        const z = tz.reduce((c,a)=>tak(c,g.zl[a]),[])
        if (x.length && y.length && z.length)
        stack.push([x,y,z])
    }
}
function tak (a,b) {
    if (!a.length) return b 
    if (!b.length) return a 
    return [a[0],b[1]]
}
function gölgeEksi(a3d, b3d) {
    const arr = []
    for (let iii=0; iii < 3; iii++) {
        arr[iii]= gölgeEksi1d(a3d[iii],b3d[iii])
    }
    return {xl: arr[0], yl: arr[1], zl: arr[2]}
}
function gölgeEksi1d(a,b) {
    const len =[]
    len[0] = b[0]<=a[0] ? [] : [a[0],b[0]-1]
    len[2] = b[1]>=a[1] ? [] : [b[1]+1,a[1]]
    len[1] = [len[0].length?b[0]:a[0],len[2].length?b[1]:a[1]]
    return len
}

