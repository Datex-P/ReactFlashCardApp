import React, {useEffect, useState, useRef} from 'react'


export default function App () {

const [name, setName] = useState('');
const renderCount = useRef(0);
// {current: 0}
const inputRef = useRef()

useEffect(()=>{
  // setRenderCount(prevRenderCount => prevRenderCount + 1)
  renderCount.current = renderCount.current + 1
})

return (
  <div>
    <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
    <div>My name is {name} </div>
    <div>I rendered {renderCount.current} times </div>
  </div>
)


}