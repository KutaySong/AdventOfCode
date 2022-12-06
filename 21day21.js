
const baş = [10,9]
const zar = {3:1, 4:3, 5:6, 6:7, 7:6, 8:3, 9:1}
const hıfz = {}
const memoize = (f) => (...x) => hıfz[JSON.stringify(x)] ? hıfz[JSON.stringify(x)] : hıfz[JSON.stringify(x)] = f(...x)

function oyna (p1,p2,sıra=true) {
    if (p1.puan>20) return [1,0]
    if (p2.puan>20) return [0,1]
    
    let evren = [0, 0]
    for (const z in zar) {
        const kamelo = sıra ? structuredClone(p1) : structuredClone(p2)
        kamelo.çark = (kamelo.çark + Number(z) - 1) %10 +1
        kamelo.puan += kamelo.çark
        const keşif = sıra ? memoize(oyna)(kamelo, p2, !sıra) : memoize(oyna)(p1, kamelo, !sıra)
        evren = keşif.map((x,i) => x*zar[z] +evren[i])
    }
    return evren
}
const netice = oyna({puan:0,çark:baş[0]},{puan:0,çark:baş[1]})
console.log("netice:",Math.max(...netice))