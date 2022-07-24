
import "../styles/index.css"
import React from "react"
import MCAnswer from "./MCAnswer"
import RAnswer from "./RAnswer"

function Question(props) {

    function holdAnswer(qId, value) {
        props.holdAnswer(qId, value)
    }

    const answerElements = props.ans.map(answer =>
        answer.type === "multiple" ?
            (
                <MCAnswer
                    handleClick={() => holdAnswer(answer.qId, answer.id)}
                    value={answer.value}
                    key={answer.id}
                    id={answer.id}
                    isHeld={answer.isHeld}
                    validate={props.validate}
                    correct_ans={props.correct_ans}
                />
            ) :
            (
                <RAnswer
                    handleClick={() => holdAnswer(answer.qId, answer.id)}
                    value={answer.value}
                    key={answer.id}
                    id={answer.id}
                    isHeld={answer.isHeld}
                    validate={props.validate}
                    correct_ans={props.correct_ans}
                />
            )
    )

    return (
        <div >
            <p className="qestion">{props.q}</p>
            {props.type === "multiple" ?
            (
                <div className="answers">
                    {answerElements}
                </div>
            ) :
            (
                <form>
                    {answerElements}
                </form>
            )}
            <hr />
        </div>
    )
}
export default Question
