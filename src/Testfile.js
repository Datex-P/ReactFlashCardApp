import React from 'react';


export default function Testfile ({children, name}) {


// console.log(props)

return (
<div>

<h1>Hello {name}</h1>
<h1>{children}</h1>
</div>

)  
}