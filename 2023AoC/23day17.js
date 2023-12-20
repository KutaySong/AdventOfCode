// https://adventofcode.com/2023/day/17

let lines = require('fs').readFileSync('./IO/17s.txt','utf8').split(/\r?\n/).map(g=>g.split('').map(Number))
const {MinPriorityQueue} = require('../../libraries/node_modules/@datastructures-js/priority-queue');
const inside = (nx, ny) => ny >= 0 && ny < lines.length && nx >= 0 && nx < lines[0].length;

const p1 = ()=> {
    const queue = new MinPriorityQueue(a=>a.dist)
    queue.enqueue({x:0, y:0, dist:0, dir:0, rep:0})
    const visited = Array(4).fill().map(()=>new Set())
    while (queue.size()) {
        const obj = queue.dequeue()
        const {x,y,dist,dir,rep} = obj
        console.log(x,y,"x,y")
        
        if (x === lines[0].length - 1 && y === lines.length - 1) return dist+lines[y][x];  // ??
        if (visited.every(ddir => ddir.has(`${x},${y}`))) continue;
        let availableDirs = [(dir+1)%4, (dir+3)%4]
        if (rep < 3) availableDirs.push(dir)
        availableDirs = availableDirs.filter(ddir => !visited[ddir].has(`${x},${y}`))
        for (const dd of availableDirs) {
            visited[dd].add(`${x},${y}`);
            const nx = x + [1,-1,0,0][dd];
            const ny = y + [0,0,1,-1][dd];
            if (inside(nx,ny)) 
            queue.enqueue({x:nx, y:ny, dist:dist+lines[y][x], dir:dd, rep:dd === dir ? rep+1 : 1})
        }

        // console log # of filled visited
        // lines.map((row,y)=>console.log(row.map((col,x)=>visited.reduce((c,a)=>c+a.has(`${x},${y}`),0)).join('')))
        // console.log('\n')
    }
    return -1;
}

const p2 = ()=> {
    
}

console.log("p1:",p1(),'(?)')
console.log("p2:",p2(),'(?)')