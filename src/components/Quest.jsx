import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Star from "./Star";
import "./Quest.css"
import BckBtn from "./bckBtn";
import NextBtn from "./NextBtn";
import SkipBtn from "./SkipBtn";
import SubmitBtn from "./SubmitBtn";

const questions = [
  { id: "q1", text: "How satisfied are you with our products?", type: "rating", max: 5 },
  { id: "q2", text: "How fair are the prices compared to similar retailers?", type: "rating", max: 5 },
  { id: "q3", text: "How satisfied are you with the value for money of your purchase?", type: "rating", max: 5 },
  { id: "q4", text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", max: 10 },
  { id: "q5", text: "What could we do to improve our service?", type: "text" },
];
const Quest = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const sessionId = localStorage.getItem("customerSessionId");
    const currentQuestion = questions[currentQuestionIndex];
    const [isRatingChanged, setIsRatingChanged] = useState(false);
   
  
    const handleAnswerChange = (e) => {
      const updatedAnswers = {
        ...answers,
        [currentQuestion.id]: e.target.value,
      };
  
      setAnswers(updatedAnswers);
  
      // Save to localStorage
     
    };

    const handleSubmit =()=>{
      const surveyData = {
        sessionId,
        answers: updatedAnswers,
      };
  
      localStorage.setItem("surveyData", JSON.stringify(surveyData));
      
    }
  
  
  
    const nextQuestion = () => {
      

      setIsRatingChanged(false);
    
      if (currentQuestionIndex < questions.length - 1) {
        setIsRatingChanged(false);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        const completedSurvey = {
          sessionId,
          answers,
          status: "COMPLETED",
        };
        localStorage.setItem("surveyData", JSON.stringify(completedSurvey));
  
        navigate("/thank");
      }
     
    };
  
    const prevQuestion = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      }
    };
  
    const skipQuestion = () => nextQuestion();
  

    return(
        
       <div className="questContainer">
        <h2>
        Question {currentQuestionIndex + 1}/{questions.length}
      </h2><br />
      <div className="para"><p><b>{currentQuestion.text}</b></p></div>
      <br />
     {currentQuestion.type === "text"? (
        <textarea onChange={handleAnswerChange} value={answers[currentQuestion.id] || ""} />
      ):<Star
      starCount={currentQuestion.max} // Dynamic star count
      value={answers[currentQuestion.id] || 0} // Current answer, or 0 if not selected
      onChange={(rating) => {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: rating,
        }));
        let rate = localStorage.getItem(currentQuestion.id);
        if(!rate){
          setIsRatingChanged(true);
        }
         // Mark rating as changed
      }}
      reset={!isRatingChanged} // Only reset after user changes the rating
      questionId={currentQuestion.id} // Use unique question ID for localStorage key
    />
}
      
      <div className="btnContainer">
      <button onClick={prevQuestion}>{currentQuestionIndex!=0?< BckBtn />:<></>}</button>
      <button onClick={skipQuestion}><SkipBtn /></button>
      <button onClick={nextQuestion}disabled={!answers[currentQuestion.id]}>{currentQuestionIndex < questions.length - 1 ? <NextBtn/> : <button onClick={handleSubmit}><SubmitBtn/></button>}</button>
      
      </div>
     
       </div>
       
    )

}

export default Quest;