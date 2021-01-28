
export default function CutWord({ name, number }) {


  if (name?.length > number && number === 24) {
    return `Deck: ${ name.substr(0, (number - 3)) } ...`
  }
  else if (name?.length < number && number === 24) {
    return `Deck: ${name.padEnd(number, '⠀')}`
  }
  else if (name?.length > number) {

    return `${name.substr(0, (number - 3))} ...`

  } else {

    return `${name.padEnd(number, '⠀')}`
  }

}








