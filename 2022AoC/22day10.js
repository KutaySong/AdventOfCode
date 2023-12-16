const tervals = Array.from(Array(6), (_,i)=> 20+40*i) //[20,60,100,140,180,220]
const p1 = () => require('fs').readFileSync((1?'input':'test')+'.txt', 'utf8').split(/\r?\n/)
.reduce((a,b) => {
    a.t += b[0]=='n' ? 1 : 2
    const ii = a.k.indexOf(null)
    if (ii>-1 && a.t >= tervals[ii]) 
    a.k[ii] = a.x * tervals[ii]
    a.x += b[0]=='a' ? +b.slice(5) : 0
    return a
}, {k: Array(tervals.length).fill(null), x: 1, t:0}).k.reduce((a,b)=>a+b)

console.log("p1:",p1())

