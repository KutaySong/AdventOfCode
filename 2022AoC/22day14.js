// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input') 

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').trim().split(/\r?\n/)
    girdi =     ham.map(satır => satır.split(' -> ').map(çift => çift.split(',').map(Number)))
    console.log(veriseti.toUpperCase()+ " RESULTS")
    part1(); 
    part2()
}

function part1 () {
    [ebat,delük] = boyver()
    hrt = Array(ebat[0]).fill().map(()=>Array(ebat[1]).fill('.'))
    çizgileriEkle()
    
    let say = 0
    while (yerleşenzi(0,delük)) {say++;}
    // çiz(hrt)
    console.log("part1:",say)

    function yerleşenzi(x,y) {
        if  (y<=0 || y>= ebat[1]-1 || x>=ebat[0]-1)     return false
        if      (hrt[x+1]?.[y]   ==='.' ?? false) return yerleşenzi(x+1,y  )
        else if (hrt[x+1]?.[y-1] ==='.' ?? false) return yerleşenzi(x+1,y-1)
        else if (hrt[x+1]?.[y+1] ==='.' ?? false) return yerleşenzi(x+1,y+1)
        else                     {hrt[x][y]= 'o'; return true}
    }
}

function part2 () {
    ebat[0] += 1
    hrt = Array(ebat[0]).fill().map(()=>Array(ebat[1]).fill('.'))
    çizgileriEkle()
    
    let say = 1
    while (yerleş2(0,delük)) {say++;}
    // çiz(hrt)
    console.log("part2:",say)

    function yerleş2(x,y) {
        if (y==0)                {hrt = hrt.map(line => ['.',...line]); delük++; ebat[1]++; y++}
        else if (y==ebat[1]-1)   {hrt = hrt.map(line => [...line,'.']); ebat[1]++}
    
        if      (x>ebat[0])      {hrt[x][y]= 'o'; return hrt[0][delük]=='+'}
        if      (hrt[x+1]?.[y]   ==='.' ?? false) return yerleş2(x+1,y  )
        else if (hrt[x+1]?.[y-1] ==='.' ?? false) return yerleş2(x+1,y-1)
        else if (hrt[x+1]?.[y+1] ==='.' ?? false) return yerleş2(x+1,y+1)
        else                     {hrt[x][y]= 'o'; return hrt[0][delük]=='+'}
    }
}

function boyver () {
    const allx = girdi.flatMap(line => line.map(([a,_])=>a))
    const ally = girdi.flatMap(line => line.map(([_,b])=>b))
    const kayım = Math.min(...allx)
    return [[Math.max(...ally)+1, Math.max(...allx)-kayım+1], 500-kayım]
}
function çizgileriEkle () {
    const kırpık = girdi.map(line => line.map(([a,b]) => [b,a-(500-delük)]))
    for (let line of kırpık) {
        for (const i in line) {
            hrt[0][delük]= '+'
            if (!parseInt(i)) continue
            if (line[i][0]== line[i-1][0]) {
                for (let j=Math.min(line[i][1],line[i-1][1]); j <= Math.max(line[i][1],line[i-1][1]); j++) {
                    hrt[line[i][0]][j]= '#'
                }
            } else if (line[i][1]== line[i-1][1]) {
                for (let j=Math.min(line[i][0],line[i-1][0]); j <= Math.max(line[i][0],line[i-1][0]); j++) {
                    hrt[j][line[i][1]]= '#'
                }
            }
        }
    }
}
function çiz (hrt) {
    hrt.map(h=> console.log(h.join("")))
}