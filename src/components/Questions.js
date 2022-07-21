
import "../styles/index.css"
import React from "react"
import Question from "./Question"
import MCAnswer from "./MCAnswer"
import RAnswer from "./RAnswer"

import { nanoid } from "nanoid"
import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";

export default function Questions(){
    const [questionElements, setQuestionElements] = React.useState(() => {})
    let [loading, setLoading] = useState(false);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "lightblue",
    };

    React.useEffect(() => {
        setLoading(true)
        async function fetchData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            const modData = await addId(data.results)
            setLoading(false)
            setElements(modData)
        }
        fetchData();
        return () => {
            console.log('This will be logged on unmount');
        };
    }, [])

    function setElements(data) {
        const elements = data.map(question => (
            <Question
                q={question.q}
                ans={question.answers}
                correct_ans={question.correct_ans}
                type={question.type}
                key={question.qId}
            />
        ))
        setQuestionElements(elements)
    }

    // Adding ids to questions and answers
    async function addId(data) {
        const newData = []
        for (let i = 0; i < data.length; i++) {
            const answers = data[i].incorrect_answers
            const position = Math.floor(Math.random() * data.length)
            answers.splice(position, 0, data[i].correct_answer)
            const taggedAns = answers.map(ans => {
                const id = nanoid()
                return data[i].type === "multiple" ?
                (
                    <MCAnswer 
                        handleClick={() => answerClicked(i, id)}
                        value={ans}
                        key={id}
                    />
                ):
                (
                    <RAnswer
                        handleClick={() => answerClicked(i, id)}
                        value={ans}
                        key={id}
                        id={id}
                    />
                )
            })
            newData.push({ q: data[i].question, answers: taggedAns, qId: i, correct_ans: data[i].correct_answer, type: data[i].type })
        }
        return newData
    }

    function answerClicked(qId, ansId) {
        console.log("qId: " + qId + " ansId: " + ansId)
    }
    
    return(
        <div className="questions">
            <img className="img-top" src={require("../images/imgTop.png")} alt="" />
            {questionElements}
            <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={150} />
            <div className="btn-container">
                <button className="answer-btn">Check answers</button>
            </div>
            <img className="img-bottom" src={require("../images/imgBottom.png")} alt="" />
        </div>
    )
}