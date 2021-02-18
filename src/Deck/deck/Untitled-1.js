 
//  function hi (string) {
//   let arr = string.split(' ')
   
//    let results = {'nil': 0, 'one': 1,
//                   'two': 2,'three': 3,
//                    'four': 4, 'five': 5,
//                    'six': 6,'seven': 7,
//                    'eight': 8, 'nine': 9,
//                    }
   
//    let finalresult = []
//    for (let i=0; i<arr.length; i++) {
 
//      if (results.hasOwnProperty(arr[i])) {
//       if(Object.keys(results[i])=== results[i])
//       {console.log('it works')
//        //console.log(true)
//       // console.log(Object.keys(results)[i])
//      }
//    }
//    console.log(finalresult)
//    return finalresult

//  }
// }
//  hi('one two three')


//  function scoreboard(string) {
 
//   let arr = string.split(' ')
   
//    let results = {'nil': 0, 'one': 1,
//                   'two': 2,'three': 3,
//                    'four': 4, 'five': 5,
//                    'six': 6,'seven': 7,
//                    'eight': 8, 'nine': 9,
//                    }
   
//    let finalresult = []
//    for (let i=0; i<arr.length; i++) {
 
//      if (results.hasOwnProperty(arr[i])) {
//       finalresult.push(Object.values(results)[i])
//        //console.log(true)
//       // console.log(Object.keys(results)[i])
//      }
//    }
//    return finalresult
//  }

// function missingValues(arr) {
//   //coding and coding..
//   let arrMoreThanTwice = [];
//   let arrMoreThanOnce = [];
//   let arrOnce = [];
  
//   for (let i = 0; i<arr.length; i++) {
//     if (arrOnce.includes(arr[i])) {
//         if (arrMoreThanOnce.includes(arr[i])) {
//           arrMoreThanTwice.push(arr[i])
//         }
//         else {
//           arrMoreThanOnce.push(arr[i])
//         }
//     } else {
//       arrOnce.push(arr[i])
//     }
//   }
//   return arrOnce[0] 

// }

// missingValues([1,2,3])


// missingValues([1,1,1,2,2,3])


// function string (num) {

//   let a = num.split('')
//   return a
  
  // .forEach((s, index) => {
   // console.log(s)

   //s.charCodeAt(0)
  // })


}



// string('hello how id')

