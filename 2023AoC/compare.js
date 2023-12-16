
// get two files and compare them line by line and log the differences
const fs = require('fs')
function compare () {
    const inp = fs.readFileSync('./IO/01-input.txt', 'utf8').split(/\r?\n/)
    const o1 = fs.readFileSync('./IO/out1.txt', 'utf8').split(/\r?\n/)
    const o2 = fs.readFileSync('./IO/out2.txt', 'utf8').split(/\r?\n/)
    for (let fi in o1) {
        if (o1[fi] !== o2[fi])
        console.log('line'+(fi+1)+':',inp[fi],'   ',+o1[fi],' vs ', +o2[fi]);
    }
}
compare()

// in the files. create debug=[], push to it and
// require('fs').writeFileSync('./IO/out1.txt', debug.join('\n'), 'utf8')
