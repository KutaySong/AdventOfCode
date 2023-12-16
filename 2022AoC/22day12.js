let hrt = require('fs').readFileSync('./IO/12-'+( 1 ?'input.txt':'test.txt'),'utf8').split(/\r?\n/).map(str=>[...str])
const komşu2d = (a,b) => [[a-1,b],[a+1,b],[a,b-1],[a,b+1]].filter(([a,b])=> typeof hrt[a]?.[b] !== "undefined")
const find2d = (c) => hrt.map((row,i)=>row.map((col,j)=>col==c?[i,j]:null).filter(x=>x)).flat(1)[0]


const [sx,sy] = find2d('S')
const [ex,ey] = find2d('E')
hrt[sx][sy] = 'a'
hrt[ex][ey] = 'z'
hrt = hrt.map(r=>r.map(c=>c.charCodeAt(0)-'a'.charCodeAt(0)))
const dist =  hrt.map(r=>r.map(_=>-1))
dist[ex][ey] = 0
const q = [[ex,ey]]

while(q.length){
    const [x,y] = q.shift()
    for(const [a,b] of komşu2d(x,y)){
        if(dist[a][b]>=0) continue
        if(hrt[a][b]==hrt[x][y] || hrt[a][b]>=hrt[x][y]-1) {
            dist[a][b] = dist[x][y]+1
            q.push([a,b])
        }
    }
}
const p1 = () => dist[sx][sy] 
const p2 = () => hrt.map((r,i)=>r.map((c,j)=>c==0?dist[i][j]:-1)).flat(1).filter(x=>x>=0).reduce((a,b)=>Math.min(a,b))

console.log("p1:",p1())
console.log("p2:",p2())
