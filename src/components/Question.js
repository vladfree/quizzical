
import "../styles/index.css"
import React from "react"

function Question(props) {
    return (
        <div >
            <p className="qestion">{props.q}</p>
            {props.type === "multiple" ?
            (
                <div className="answers">
                    {props.ans}
                </div>
            ) :
            (
                <form>
                    {props.ans}
                </form>
            )}
            <hr />
        </div>
    )
}
export default Question
