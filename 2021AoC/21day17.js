// https://adventofcode.com/2021/day/17

let range = require('fs').readFileSync('./IO/17-'+( 1 ?'input.txt':'test.txt'),'utf8').match(/(-?\d+)/g).map(Number)
let hız = [0,0], konum = [0, 0], results = [45,2628,112,1334]
const tur =   () => {konum[0]+=hız[0]; konum[1]+=hız[1]; hız[0]+=hız[0]>0?-1:hız[0]<0?1:0; hız[1]-=1;}
const vurdu = () => konum[0]>=range[0] && konum[0]<=range[1] && konum[1]>=range[2] && konum[1]<=range[3]

for (let j=range[2]; j < range[3]; j++) {
  n = 2*(-j)
  m = 0
  konum[0] = 0
  while (konum[0]<range[0]) { konum[0] += ++m; hız[0]++; if(m>n) konum[0] -= m-n;}
  
  if (konum[0]<range[1]) {
    console.log("part1:",-j*(-j-1)/2)
    break
  }
}
count = 0
for (let i=0; i <= range[1]; i++) {
  for (let j=range[2]; j < -1*range[2]; j++) {
    hız = [i,j]
    konum = [0, 0]
    while (konum[0]<range[1] && konum[1]>range[2] && !vurdu()) tur()
    if (vurdu()) count++
  }
}
console.log("part2:",count)