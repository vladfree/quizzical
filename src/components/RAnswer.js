export default function RAnswer(props){
    // console.log("answer: " + props.value + "; validate: " + props.validate)
    const myStyle = {
        color: props.validat && (
            ((props.correct_ans === props.value) && "#94D7A2") ||
            ((props.isHeld && (props.correct_ans !== props.value)) && "#F8BCBC")
        )
    } 
    return(
        <div>
            <input
                type="radio"
                id={props.id}
                name="answer"
                value={props.id}
                checked={props.isHeld}
                onChange={props.handleClick}
            />
            <label htmlFor={props.id} style={myStyle}>{props.value}</label>
        </div>
    )
}