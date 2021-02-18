import React from 'react'

function Container({children}){
  let color='green';
  return(
    
      <div>{
        React.Children.map(children, (child)=>React.cloneElement(child,{colors:color}))
      }</div>
    
  )
}


function Div({colors}){
  return(
    <div>my color is {colors}</div>
  )
}


export default function App(){
  return(

    <Container>
      {Array(10).fill('oiojoijjioijo').map((el=><Div />))}
    </Container>

  )
}