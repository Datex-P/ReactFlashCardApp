
export default function CutWord({ name, number }) {

  
   if (name?.length > number && number >14) {

    return `${name.substr(0, (number - 3))} ...`

  } else {

    return `${name.padEnd(number, '⠀')}`
  }

}








