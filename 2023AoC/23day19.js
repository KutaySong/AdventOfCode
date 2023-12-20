// https://adventofcode.com/2023/day/19

let [lines1, lines2] = require('fs').readFileSync('./IO/19t.txt','utf8').split(/\r?\n\r?\n/).map(e=>e.split(/\r?\n/))

const p1 = ()=> {
    let db = {}
    lines1.map(e=>(a = e.split('{'), db[a[0]] = a[1].slice(0,-1)
    .replaceAll(/([a-zA-Z]+)(?![<>])/g,'\'$&\'')
    .replaceAll(/(\w)[<>]/g,'dd.$&')
    .replaceAll(':','?').replaceAll(',',':')
    ))
    let data = []
    lines2.map((e,i) => {
        data[i] = {};
        e.slice(1,-1).split(',').map(str => {
            let a = str.split('=');
            data[i][a[0]] = +a[1];
        });
    });
    
    return data.map(dd=> {
        let bu = eval(db.in)
        while (bu != 'A' && bu != 'R') {
            bu = eval(db[bu])
        }
        return bu=='A' ? Object.values(dd).reduce((a,b)=>a+b) : 0
    }). reduce((a,b)=>a+b)
}

const p2 = ()=> {
    let db = {}
    lines1.map(e=>(a = e.split('{'), db[a[0]] = a[1].slice(0,-1)))
    let possib = []
    function getConditions(str, conditions = []) {
        let [fi, rest] = str.split(',',2)
        if (fi.includes(':')) {
            let [c, cnuf] = fi.split(':',2)
            if (cnuf[0] == 'A') possib.push([...conditions, c])
            else if (cnuf[0] != 'R') {
                getConditions(db[cnuf], [...conditions, c])
                if (rest)
                getConditions(rest, [...conditions, '!'+c])
            }
        } else {
            getConditions(db[fi], conditions)
        }
    }
    getConditions(db.in)
    console.log(possib,"possib")
}

console.log("p1:",p1(),'(383682)')
console.log("p2:",p2(),'(?)')