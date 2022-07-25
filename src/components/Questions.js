
import "../styles/index.css"
import React from "react"
import Question from "./Question"

import ClipLoader from "react-spinners/ClipLoader";
import { nanoid } from "nanoid"

export default function Questions(){
    const [allQuestions, setAllQuestions] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState(() => {})
    const [correctAns, setCorrectAns] = React.useState(0)
    const [checkFlag, setCheckFlag] = React.useState(false)
    const [playAgain, setPlayAgain] = React.useState(false)
    const [reload, setReload] = React.useState(false)
    let [loading, setLoading] = React.useState(false);

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
                        type: question.type,
                        isCorrect: (question.correct_answer === ans)
                    }
                })
                return { 
                    q: question.question, 
                    qId: qId, 
                    answers: ansObj, 
                    correct_ans: question.correct_answer, 
                    type: question.type, 
                    key: qId, 
                    answered: false 
                }
            })
            setAllQuestions(modData)
            setCheckFlag(false)
            setLoading(false)
        }
        fetchData();
        return () => {
            // console.log('This will be logged on unmount');
        };
    }, [playAgain])

    React.useEffect(() => {
        setQuestionElements(allQuestions.map(question => (
            <Question
                q={question.q}
                ans={question.answers}
                correct_ans={question.correct_ans}
                type={question.type}
                key={question.qId}
                id={question.qId}
                holdAnswer={holdAnswer}
                answered={question.answered}
                validate={checkFlag}
            />
        )))
        return () => {
            // console.log('This will be logged on unmount');
        };
    }, [allQuestions, reload])

    function holdAnswer(qId, aId) {
        setAllQuestions(oldQuestion => {
            return oldQuestion.map(question => {
                const answers = question.answers
                const check = question.qId === qId ? true : question.answered
                const ansObj = answers.map(ans => (
                    (ans.qId === qId && ((ans.isHeld && ans.id !== aId) || (!ans.isHeld && ans.id===aId))) ? 
                    {
                        ...ans,
                        isHeld: !ans.isHeld,
                    } : ans
                ))
                return { ...question, answers: ansObj, answered: check }
            })
        })
    }

    function checkAnswers(){
        const allHeld = allQuestions.filter(element => element.answered)
        if(allHeld.length === allQuestions.length){
            let correct_ans = 0 
            allQuestions.forEach(element => 
                element.answers.forEach(answer => {
                    (answer.isHeld && answer.isCorrect) && 
                    (correct_ans += 1)
                })
            )
            setCorrectAns(correct_ans)
            setCheckFlag(true)
            setReload(prev => !prev)
        } else {
            setCheckFlag(false)
            setReload(prev => !prev)
            console.log("Please answer all the questions!")
        }
    }

    function playNewGame(){
        setPlayAgain(old => !old)
    }
    return(
        <div className="questions">
            <img className="img-top" src={require("../images/imgTop.png")} alt="" />
            {questionElements}
            <ClipLoader color={"#ffffff"} loading={loading} cssOverride={override} size={150} />
            <div className="btn-container">
                {checkFlag ? 
                    (<div className="play-again">
                        <p>You scored {correctAns}/{allQuestions.length} correct answers</p>
                        <button className="answer-btn" onClick={playNewGame}>Play again</button>
                    </div>) :
                    (<button className="answer-btn" onClick={checkAnswers}>Check answers</button>) 
                }               
            </div>
            <img className="img-bottom" src={require("../images/imgBottom.png")} alt="" />
        </div>
    )
}