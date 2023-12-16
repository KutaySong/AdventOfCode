const fs = require('fs');
const girdi = fs.readFileSync('input.txt', 'utf8').trim().split('\r\n\r\n')
const al512 = girdi[0].split('\r\n').reduce((c,a)=>c+a,"").split("").map(a=>a=='#'?1:0)
const yaz = (arr) => {arr.map(a=>console.log(a.join('')));console.log("\n")}
let resim = girdi[1].split('\r\n').map(a=>a.split('').map(b=>b=='.'?0:1))
let evP = 0     // evren Parlak
for (let i=0; i < 50; i++) 
resim = itere(resim)
console.log("sonuç:",resim.reduce((c,a)=>c+a.reduce((c,b)=>c+b,0),0))


function itere(arr){
    arr = arr.map(a=>[evP,...a,evP])
    arr.unshift (Array(arr[0].length).fill(evP))
    arr.push    (Array(arr[0].length).fill(evP))
    const index = (x,y) => arr[x]?.[y] ?? evP
    const kare  = (x,y) => [-1,0,1].reduce((c,i)=> c+ [-1,0,1].reduce((c,j)=>c+index(x+i,y+j),""),"")
    const sonuç = arr.map((a,i)=>a.map((b,j)=>al512[parseInt(kare(i,j),2)]))
    if (al512[0]) evP = evP ? 0 : 1
    return sonuç
}

// Couldn't figure out for about an hour why my test results are working and input isn't - that the surroundings were flickering. But at least the code is pretty short in the end.