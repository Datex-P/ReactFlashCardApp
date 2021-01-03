import React, {useState,useEffect} from 'react';


export default function EffectTest(){
  const [time, setTime] = useState(new Date())
  const [timestr, setTimestr] = useState(time.toLocaleString())

  useEffect(()=>{
    setInterval(()=>{
      setTime(new Date())
      console.log('I setted time')
    },1000)
    console.log('I run once')
  },[])


  useEffect(()=>{
    setTimestr(time.toLocaleString())
    console.log('I run after time is setted')
  },[time])

  return(
    <div>{timestr}</div>
  )
}