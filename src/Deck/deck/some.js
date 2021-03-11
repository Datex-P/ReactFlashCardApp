
// let strarr = ["tree", "foling", "2224444444trashy", "blue", "abcdef", "uvwxyz"]

// //, k = 2

// function longestConsec(star, k) {
    
//   let num = 0
//   let arr = []

//   for (let i = k; i<star.length; i+=k) {
    
//     if (num = 0) {
      
//       num = star.slice(0,k).toString().replace(/,/gi, '').length;
//       arr.push(star.slice(0,k).toString().replace(/,/gi, ''))
    
//     } else if 
      
//       (star.slice((k*i),(k*(i+1))).toString().replace(/,/gi, '').length > num) {

//       num = star.slice((k*i),k*(i+1).toString().replace(/,/gi, '')).length

//       arr.push(star.slice((k*i),k*(i+1).toString().replace(/,/gi, '')))

//       //arr.push(star.slice(0,k).toString().replace(/,/gi, ''))
//     }
//   }
//   return arr
  
// }

// longestConsec(["tree", "foling", "2224444444trashy", "blue", "abcdef", "uvwxyz"],2)

// //longestConsec(strarr, 2)

// var orderedCount = function (text) {
    
//   let split = text.split('');

//   let obj = {}
  
//   for (let i = 0; i<split.length; i++) {
//     obj[split[i]] = split.filter(x )
//   }

 
//  }
 

//  let text = ''

//  let spl = text.split('')

//  console.log(spl.filter(x => x === 'h').length)