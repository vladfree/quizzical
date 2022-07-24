
import "../styles/index.css"
import React from "react"
import MCAnswer from "./MCAnswer"
import RAnswer from "./RAnswer"
import { nanoid } from "nanoid"

function Question(props) {
    // const [answers, setAnswers] = React.useState(generateAnswerObj())
    // const [answers, setAnswers] = React.useState()

    // function generateAnswerObj() {
    //     const ans = props.ans
    //     const ansObj = ans.map(ans => {
    //         const id = nanoid()
    //         return {
    //             value: ans,
    //             key: id,
    //             id: id,
    //             isHeld: false,
    //             qId: props.qId,
    //             type: props.type
    //         }
    //     })
    //     return ansObj
    // }

    function holdAnswer(qId, value) {
        // console.log("qId: " + qId + " value: " + value)
        props.holdAnswer(qId, value)
        // setAnswers(oldAnswers =>
        //     oldAnswers.map(answer => {
        //         if (answer.isHeld) return { ...answer, isHeld: false }
        //         else if(answer.id === ansId){
        //             props.holdAnswer(qId, answer.value)
        //             return { ...answer, isHeld: true }
        //         }  
        //         else return answer
        //     }
        // ))
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
                />
            ) :
            (
                <RAnswer
                    handleClick={() => holdAnswer(answer.qId, answer.id)}
                    value={answer.value}
                    key={answer.id}
                    id={answer.id}
                    isHeld={answer.isHeld}
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
