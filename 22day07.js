// https://adventofcode.com/2022/

const fs = require('fs');
run('test')
run('input')

function run (veriseti) {
    const ham = fs.readFileSync(veriseti+'.txt', 'utf8').replace(/\r?\n/g, ',')
    girdi =  {cd:ham.match(/(?<=cd )([^.]+?)(?=,\$ ls|$)/g) ,ls:ham.match(/(?<=ls,)(.+?)(?=,\$|$)/g)}
    işle ()
    console.log(veriseti.toUpperCase()+ " RESULTS")
    part1(); part2()
}

function işle () {
    cd  = []
    ls = []
    girdi.cd.map((g,i)=> {
        cd.push(g)
        ls.push(girdi.ls[i].split(',').map(a=> {
            const cmd = a.split(' ')
            return cmd[0] === 'dir' ? cmd[1] : parseInt(cmd[0])
        }))
        backcheck(i)
    })
    total = ls.map(a => a.reduce((a,b)=>a+b))

    function backcheck (i) {
        if (!ls[i].every(l => typeof l == 'number')) return
        const tot = ls[i].reduce((a,b) => a+b,0)
        const indo = ls.findLastIndex(l=> l.includes(cd[i]))
        if (indo != -1) {
            ls[indo] = ls[indo].map(x => x==cd[i] ? tot : x )
            backcheck(indo)
        }
    }
}
function part1 () {
    console.log("part1:",total.filter(x=>x<=100000).reduce((a,b) => a+b))
}
function part2 () {
    const fark = (30000000-(70000000-total[0]))
    console.log("part2:",total.sort((a,b)=>a-b).find(a=> a>fark))
}

