
export default function CutWord({ name}) {

  
   if (name?.length >14) {

    return `${name.substr(0, (15 - 3))} ...`

  } else {

    return `${name.padEnd(15, '⠀')}`
  }

}








