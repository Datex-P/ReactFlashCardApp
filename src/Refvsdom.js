import React, {useState,useEffect, useRef} from 'react';


export default function Refvsdom(){

  let input = useRef(null)
  let inputDom =  document.querySelector('input')
  useEffect(()=>{
   

  console.log(input.current.value)
  console.log(inputDom.value)
  },[])
  

  return(
    <>
      <input ref={input} value='ok' />
      <button></button>
    </>
  )
}