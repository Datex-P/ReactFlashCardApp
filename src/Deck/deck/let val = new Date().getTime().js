let val = new Date().getTime()
console.log(val)
//console.log(val2)



let party = {}

party.John = '11:45'
party.Ann = '11:55'
party[Symbol('Hans')] = '12:45'
party[Symbol('Hans')] = '01:45'

console.log(Object.getOwnPropertySymbols(party).map(k=>k.description))

let val2 = new Date().getTime()
console.log(val == val2)
console.log(val2)
console.log(val2-val)