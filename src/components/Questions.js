
import "../styles/index.css"
import React from "react"
import Question from "./Question"

import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";
import { nanoid } from "nanoid"

export default function Questions(){
    const [allQuestions, setAllQuestions] = React.useState([])
    // const [allAnswers, setAllAnswers] = React.useState([])
    let [loading, setLoading] = useState(false);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "lightblue",
    };

    React.useEffect(() => {
        setLoading(true)
        // const answersArray =[]
        async function fetchData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            const modData = data.results.map(question => {
                let answers
                if(question.type === "multiple"){
                    answers = question.incorrect_answers
                    const position=  Math.floor(Math.random() * answers.length)
                    answers.splice(position, 0, question.correct_answer)
                } else answers = ["True", "False"]

                const qId = nanoid()
                const ansObj = answers.map(ans => {
                    const id = nanoid()
                    return {
                        value: ans,
                        key: id,
                        id: id,
                        isHeld: false,
                        qId: qId,
                        type: question.type
                    }
                })
                // answersArray.push({qId: ansObj})
                return { q: question.question, qId: qId, answers: ansObj, correct_ans: question.correct_answer, type: question.type, key: qId }
            })
            // setAllAnswers(answersArray)
            setAllQuestions(modData)
            setLoading(false)
        }
        fetchData();
        return () => {
            console.log('This will be logged on unmount');
        };
    }, [])

    function holdAnswer(qId, aId) {
        setAllQuestions(oldQuestion => {
            return oldQuestion.map(question => {
                const answers = question.answers
                const ansObj = answers.map(ans => (
                    (ans.qId === qId && (ans.isHeld || ans.id===aId)) ? 
                    {
                        ...ans,
                        isHeld: !ans.isHeld,
                    } : ans
                ))
                return {...question, answers: ansObj}
            })
        })
    }

    // React.useEffect(() => {
    //     console.log("RELOADING")
    //     setQuestionElements(allQuestions.map(question => (
    //         <Question
    //             q={question.q}
    //             ans={question.answers}
    //             correct_ans={question.correct_ans}
    //             type={question.type}
    //             key={question.qId}
    //             id={question.qId}
    //             holdAnswer={holdAnswer}
    //         />
    //     )))
    // }, [allQuestions])

    console.log("RELOADING")
    const questionElements = allQuestions.map(question => (
        <Question
            q={question.q}
            ans={question.answers}
            correct_ans={question.correct_ans}
            type={question.type}
            key={question.qId}
            id={question.qId}
            holdAnswer={holdAnswer}
        />
    ))

    function checkAnswers(){

    }
    
    return(
        <div className="questions">
            <img className="img-top" src={require("../images/imgTop.png")} alt="" />
            {questionElements}
            <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={150} />
            <div className="btn-container">
                <button className="answer-btn" onClick={checkAnswers}>Check answers</button>
            </div>
            <img className="img-bottom" src={require("../images/imgBottom.png")} alt="" />
        </div>
    )
}