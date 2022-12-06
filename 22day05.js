// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').split(/\r?\n/)
    girdi = parse(ham)     
    console.log(veriseti.toUpperCase()+ " RESULTS")
    part1(); 
    part2()
}

function part1 () {
    const st = structuredClone(girdi.stack)
    girdi.komutlar.map(kmt=> {
        while (kmt[0]--) {
            st[kmt[2]].unshift(st[kmt[1]].shift())
        }
    })
    console.log("part1:",st.map(s=>s[0]).join(''))
}
function part2 () {
    const st = structuredClone(girdi.stack)
    girdi.komutlar.map(kmt=> {
        st[kmt[2]] = st[kmt[1]].splice(0,kmt[0]).concat(st[kmt[2]])
    })
    console.log("part2:",st.map(s=>s[0]).join(''))
}


function parse(ham) {
    const boşsatır = ham.findIndex(satır => !satır.length)
    const sIndex = []
    ham[boşsatır-1].split('').map((l,i)=> {if (l!=' ') sIndex.push(i)})
    const stack = Array(sIndex.length).fill().map(()=>[])
    ham.slice(0,boşsatır-1).map(satır => {
        sIndex.map((ind,j) => {
            if (satır[ind] && satır[ind]!=' ') {
                stack[j].push(satır[ind])
            }
        })
    })
    const komutlar = []
    ham.slice(boşsatır+1).map(satır=> komutlar.push(satır.match(/(\d+)/g).map(Number)))
    
    return {stack:stack, komutlar:komutlar.map(([a,b,c])=>[a,b-1,c-1])}
}
const tt    = (a,b)=>a+b