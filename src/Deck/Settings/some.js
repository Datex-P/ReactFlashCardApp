function isIsogram(str){
  let strSplit = str.toLowerCase().split('');
  
  let arr = [];
  strSplit.forEach((el, ind) => {
    if (arr.includes(el)) {
      return false
    } else {
      arr.push(el)
    }
  })
  //console.log(arr)
  //console.log(strSplit)
  return true
}

isIsogram('moose')
