
import "../styles/index.css"

function Question(props) {
    return (
        <div >
            <p className="qestion">{props.q}</p>
            { props.type === "multiple" ?
                (
                    <div className="answers">
                        <div className="answer">{props.ans[0].value}</div>
                        <div className="answer">{props.ans[1].value}</div>
                        <div className="answer">{props.ans[2].value}</div>
                        <div className="answer">{props.ans[3].value}</div>
                    </div>
                ) :
                (
                    <form>
                        <input
                            type="radio"
                            id={props.ans[0].id}
                            name="answer"
                            value="ans1"
                        />
                        <label htmlFor="ans1">{props.ans[0].value}</label>

                        <input
                            type="radio"
                            id={props.ans[1].id}
                            name="answer"
                            value="ans2"
                        />
                        <label htmlFor="ans2">{props.ans[1].value}</label>
                    </form>
                )                  
            }
            <hr />
        </div>
    )
}

export default Question
