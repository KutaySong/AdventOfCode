// https://adventofcode.com/2021/day/25
const fs = require('fs');

let map = fs.readFileSync('input.txt', 'utf8').split('\n').map(a=>a.split('').filter(a=>a!=="\r"))


const dosyayaYaz = () => fs.writeFileSync('output.txt', map.map(a=>a.join('')).join('\n'))
const dosyayaEkle = (bunu) => fs.appendFileSync('output.txt', bunu)


const boy = map.length;
const en  = map[0].length;
let newMap

let kıpraştı = true;
let steps = 0;

function play () {
	dosyayaYaz()
	while (kıpraştı){
		newMap = structuredClone(map)
		const k1 = önceSağa()
		if (k1) map = structuredClone(newMap);
		const k2 = sonraAşağı()
		if (k2) map = structuredClone(newMap);
		kıpraştı = k1 || k2

		steps++
		// dosyayaEkle("\n\n"+steps+". adım:\n"+map.map(a=>a.join('')).join('\n'))
		if(!kıpraştı) {
			console.log("Adımda bulundu:", steps)
			return steps
		}
		if(steps%1000==0) console.log("Çalışılıyor:",steps)
	}
}


function önceSağa () {
	let kıpraşım = false
	for(let i=0; i<boy; i++){
		for(let j=0; j<en; j++){

			if(map[i][j] === '>' && map[i][(j+1)%en] === '.'){
				newMap[i][j] = '.';
				newMap[i][(j+1)%en] = '>';
				kıpraşım = true
			}
		}
	}
	return kıpraşım
}


function sonraAşağı () {
	let kıpraşım = false
	for(let i=0; i<boy; i++){
		for(let j=0; j<en; j++){
			if(map[i][j] === 'v' && map[(i+1)%boy][j] === '.'){
				newMap[i][j] = '.';
				newMap[(i+1)%boy][j] = 'v';
				kıpraşım = true
			}
		}
	}
	return kıpraşım
}

play();