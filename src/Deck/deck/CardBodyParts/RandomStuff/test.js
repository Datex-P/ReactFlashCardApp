// let arr = [1,2,3,4,5,6,2,3,3,4,4,4,4]

// let obj = arr.reduce((acc,item)=>{
//   if(item%2){
//     acc.odd.push(item)
//   }else{
//     acc.even.push(item)
//   }
//   return acc
// },{odd:[],even:[]})

// console.log(obj)

// let obj2 = arr.reduce((acc,item)=>{
//   if(!(item in acc)){
//     acc[item] = []
//   }
//   acc[item].push(item)
//   return acc
// },{})
// console.log(obj2)

function evenLast(numbers) {
  
  return numbers.length && numbers.reduce((acc,item,index)=>{
     if(index%2 === 0){
       acc+=item
     }
     return acc
   },0) * numbers[numbers.length-1]
  }

  evenLast([0,1])
