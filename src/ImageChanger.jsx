import React from 'react';

const images = [
 {
   src: 'https://images.freeimages.com/images/large-previews/7bc/bald-eagle-1-1400106.jpg',
   alt: 'Ein Sonnenuntergang über einen See.'
 },
 {
  src: 'https://images.freeimages.com/images/large-previews/917/eagle-eyes-1387814.jpg',
  alt: 'Ein Adler'
}
,
{
  src: 'https://images.freeimages.com/images/large-previews/ef3/bald-eagle-1341760.jpg',
  alt: 'Ein weiterer Adler'
}
];

const getNextIndex = (images, currentIndex) => {
  if (currentIndex === images.length-1) {
    return 0;
  }
  return currentIndex + 1;
}

export class ImageChanger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {imageIndex : 1}

    setInterval(()=>{
      this.changeImage()
      
    }, 3000)
  }

changeImage(){
  this.setState(() => {

  }
    //imageIndex: getNextIndex(images, this.state.imageIndex)
    //imageIndex: this.state.imageInfdex + 1
  })
  }

  render() {
    const currentImage = images[this.state.imageIndex];
    return (
     <img src = {currentImage.src} alt={currentImage.alt}/>
    )
  }
}