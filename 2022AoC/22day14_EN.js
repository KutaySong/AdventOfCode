

// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input') 

function run (dataset) {
    const raw = fs.readFileSync(dataset+'.txt', 'utf8').trim().split(/\r?\n/)
    input =     raw.map(line => line.split(' -> ').map(duo => duo.split(',').map(Number)))
    console.log(dataset.toUpperCase()+ " RESULTS")
    part1(); 
    part2()
}

function part1 () {
    [size,hole] = boyver()
    mapp = Array(size[0]).fill().map(()=>Array(size[1]).fill('.'))
    addLines()
    
    let say = 0
    while (seek(0,hole)) {say++;}
    // draw(mapp)
    console.log("part1:",say)

    function seek(x,y) {
        if  (y<=0 || y>= size[1]-1 || x>=size[0]-1)     return false
        if      (mapp[x+1]?.[y]   ==='.' ?? false) return seek(x+1,y  )
        else if (mapp[x+1]?.[y-1] ==='.' ?? false) return seek(x+1,y-1)
        else if (mapp[x+1]?.[y+1] ==='.' ?? false) return seek(x+1,y+1)
        else                     {mapp[x][y]= 'o'; return true}
    }
}

function part2 () {
    size[0] += 1
    mapp = Array(size[0]).fill().map(()=>Array(size[1]).fill('.'))
    addLines()
    
    let say = 1
    while (yerleş2(0,hole)) {say++;}
    // draw(mapp)
    console.log("part2:",say)

    function yerleş2(x,y) {
        if (y==0)                {mapp = mapp.map(line => ['.',...line]); hole++; size[1]++; y++}
        else if (y==size[1]-1)   {mapp = mapp.map(line => [...line,'.']); size[1]++}
    
        if      (x>size[0])      {mapp[x][y]= 'o'; return mapp[0][hole]=='+'}
        if      (mapp[x+1]?.[y]   ==='.' ?? false) return yerleş2(x+1,y  )
        else if (mapp[x+1]?.[y-1] ==='.' ?? false) return yerleş2(x+1,y-1)
        else if (mapp[x+1]?.[y+1] ==='.' ?? false) return yerleş2(x+1,y+1)
        else                     {mapp[x][y]= 'o'; return mapp[0][hole]=='+'}
    }
}

function boyver () {
    const allx = input.flatMap(line => line.map(([a,_])=>a))
    const ally = input.flatMap(line => line.map(([_,b])=>b))
    const slide = Math.min(...allx)
    return [[Math.max(...ally)+1, Math.max(...allx)-slide+1], 500-slide]
}
function addLines () {
    const cut = input.map(line => line.map(([a,b]) => [b,a-(500-hole)]))
    for (let line of cut) {
        for (const i in line) {
            mapp[0][hole]= '+'
            if (!parseInt(i)) continue
            if (line[i][0]== line[i-1][0]) {
                for (let j=Math.min(line[i][1],line[i-1][1]); j <= Math.max(line[i][1],line[i-1][1]); j++) {
                    mapp[line[i][0]][j]= '#'
                }
            } else if (line[i][1]== line[i-1][1]) {
                for (let j=Math.min(line[i][0],line[i-1][0]); j <= Math.max(line[i][0],line[i-1][0]); j++) {
                    mapp[j][line[i][1]]= '#'
                }
            }
        }
    }
}
function draw (mapp) {
    mapp.map(h=> console.log(h.join("")))
}