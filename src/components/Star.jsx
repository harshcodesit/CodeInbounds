import "./Star.css";
import { useState } from 'react'
import { useEffect } from "react";

function Star({ starCount = 5, value = 0, onChange = () => {}, reset, questionId }){
    const [starVal,setStarVal]= useState(value);
    const [hoverVal,setHoverVal]= useState(0);
    const [rating, setRating]= useState(0);

    useEffect(() => {
        const savedRating = localStorage.getItem(questionId); // Get saved rating from localStorage
        if (savedRating) {
          const parsedRating = parseInt(savedRating, 10);
          setStarVal(parsedRating); // Set the state to the saved rating
          setRating(parsedRating); // Notify the parent of the saved value
        }
      }, [questionId]);

      useEffect(() => {
        if (reset) {
          setStarVal(0);
          setHoverVal(0);
          setRating(0);
          localStorage.removeItem(questionId); // Remove rating from localStorage
          onChange(0); // Notify parent to reset the answer
        }
      }, [reset, questionId, onChange]);



 const handleClick = (newRating) => {
    setStarVal(newRating);
    setRating(newRating); // Set rating to the clicked star value
    onChange(newRating); // Notify the parent with the new rating

    localStorage.setItem(questionId, newRating); // Save the rating to localStorage
  };
      
    console.log(rating);
   return(
    <div className="container">
        
        {new Array(starCount).fill(0).map((value,index)=>{
            return (
            
            <span key={index} 
            onClick={()=>{setStarVal(index+1);
                setRating(index+1);
                handleClick(index + 1);
                
            }}
            onMouseEnter={()=>setHoverVal(index+1)}
            onMouseLeave={()=>setHoverVal(0)}
            id="star"
            className={ hoverVal==0 && index<starVal || index<hoverVal?"gold":"" } > &#9733; </span>)
        })}

    </div>
   )
}

export default Star;