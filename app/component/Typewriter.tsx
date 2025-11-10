import { useEffect, useState } from "react";

const Typewriter = ({text, speed = 100}: {text: string, speed?: number}) => {
    const [displayedText, setDisplayedText] = useState('')
    useEffect(() => {
     let index = 0;
     const initerval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if(index === text.length) clearInterval(initerval)
     }, speed)
    }, [text, speed])
  return (
    <div>
        {displayedText}
    </div>
  )
}

export default Typewriter