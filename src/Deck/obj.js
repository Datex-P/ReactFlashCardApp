let ob = 
  {
    
                                        'algebra': 6,
                                        'history': 7,
                                        'physics': 8,
                                        'geography': 9,
                                        'chemistry': 10
                                      
  }


console.log(Object.values(ob).reduce((acc, cur)=>  acc + cur))
 
//why can t I include a return statement and when to use curly brackets in return and when not necessary??

// let obje =  {
//   {
//                                     'algebra': 6,
//                                     'history': 7,
//                                     'physics': 8,
//                                     'geography': 9,
//                                     'chemistry': 10
//                                   },
//                                   {
//                                     'algebra': 8,
//                                     'history': 7,
//                                     'physics': 8,
//                                     'geography': 9,
//                                     'chemistry': 10
//                                   }
// }

//                                   console.log(Object.values(obje))


const arr = [1,2,3]

////console.log(arr.findIndex((el, ind, arr) => Math.max(arr)))

console.log(arr.indexOf(Math.max(...arr)))
