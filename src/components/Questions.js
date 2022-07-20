
import "../styles/index.css"
import React from "react"

import Question from "./Question"
// import Data from "../data"

export default function Questions(props){
    const data = props.q

    const questions = data.map(question => (
        <Question 
            q={question.q} 
            ans={question.answers} 
            correct_ans={question.correct_ans} 
            type={question.type}
            key={question.qId}
        />
    ))

    return(
        <div className="questions">
            <img className="img-top" src={require("../images/imgTop.png")} alt="" />
            {questions}
            <div className="btn-container">
                <button className="answer-btn">Check answers</button>
            </div>
            <img className="img-bottom" src={require("../images/imgBottom.png")} alt="" />
        </div>
    )
}