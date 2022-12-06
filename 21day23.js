
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('').filter(b => ['A', 'B', 'C', 'D'].includes(b))

const {MinPriorityQueue} = require ('../libraries/node_modules/@datastructures-js/priority-queue');
const problem = require("./paths.json")[2]

const baş = problem.baş  //  baş = input
const fin = problem.fin
const oda = problem.oda
const rota = problem.rota
const cost = problem.cost

const erke = {
    A:    1,
    B:   10,
    C:  100,
    D: 1000,
} 


function play () {
    const kuyruk = new MinPriorityQueue(a=>a.cost)
    kuyruk.enqueue({tahta:baş, cost:0, history:[{tahta:baş, cost:0}]})
    const bayramdaGittik = {}
    bayramdaGittik[baş] = 0
    
    while (!kuyruk.isEmpty()) {
        const bu = kuyruk.dequeue()
        if (bu.tahta == fin) {
            // bu.history.map(({tahta,cost})=> {print(tahta),console.log(cost)}) 
            console.log("Bulduğum:",bu.cost)
            break
        }
        const işlenecek = deep1(bu.tahta)
        for (const iş of işlenecek) {
            if (!bayramdaGittik[iş.tahta] || bayramdaGittik[iş.tahta]>iş.cost) {
                bayramdaGittik[iş.tahta] = iş.cost
                kuyruk.enqueue({tahta:iş.tahta, cost:iş.cost+bu.cost, history:bu.history.concat({tahta:iş.tahta, cost:iş.cost+bu.cost})})
            }
        } 
    }    
    
    
    function deep1 (tahta) {
        const arr = tahta.split("")
        const dön = []
        const doluKonumlar= arr.reduce((c,h,i)=> h!="."?c.concat(i):c ,[])
        for (konum of doluKonumlar) {
            const tip = arr[konum]      // nerdeyim::  0:koridor 1:doğruOda -1:yanlışOda
            const nerdeyim = fin[konum]=="." ? 0 : fin[konum]==arr[konum] ? 1 : -1    
            if (nerdeyim == 1) {        
                const ok = oda[tip].filter(a=>a>=konum).every(a=>arr[a]==tip)
                if (ok) continue
            }
            if (!nerdeyim) {        // koridordan odaya
                const dibi = oda[tip].findLast(a=> arr[a]!= tip) //b
                if(arr[dibi]==".") {
                    const r = rota[tip][0].includes(konum) ? rota[tip][0] : rota[tip][1]
                    const c = rota[tip][0].includes(konum) ? cost[tip][0] : cost[tip][1]
                    arasıBoşsaDöneEkle (r,konum,dibi,c)
                } 
            } else {                // odadan koridora
                const koridordaBoşlar = oda["koridor"].filter(k=>arr[k]==".")
                const xtip = fin[konum]         // kimin odasındayım
                koridordaBoşlar.map(kb=> {
                    const r = (rota[xtip][0].includes(kb) ? rota[xtip][0] : rota[xtip][1]).slice().reverse()
                    const c = (rota[xtip][0].includes(kb) ? cost[xtip][0] : cost[xtip][1]).slice().reverse()
                    arasıBoşsaDöneEkle (r,konum,kb,c)
                })
            }
        }
        
        return dön
        
        function arasıBoşsaDöneEkle (rota, x1, x2, cost) {   
            const arası = rota.slice(rota.indexOf(x1)+1,rota.indexOf(x2))
            if (arası.every(k => arr[k]==".")) {
                const total = cost.slice(rota.indexOf(x1),rota.indexOf(x2)).reduce((c,a)=>c+a,0)*erke[arr[x1]]
                dön.push({tahta:swap(x1,x2).join(""), cost:total})
            }
        }
        function swap (x1, x2) {
            const next = structuredClone(arr)
            next[x1] = arr[x2]
            next[x2] = arr[x1]        
            return next
        }
    }
}

function print (str) {  //  for screening purposes, might be deleted
    console.log("",)
    const format = problem.yaz.split("").reverse()
    let a = str.split("").reverse()
    for (const f in format) {
        if (format[f] != ".") 
        a= a.slice(0,f).concat(format[f]).concat(a.slice(f))
    }
    console.log(a.reverse().join(""))
}


play()
