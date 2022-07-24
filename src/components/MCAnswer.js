
export default function Answers(props){

    // console.log("answer: " + props.value + "; validate: " + props.validate)
    // console.log("correct ans: " + props.correct_ans + " value: " + props.value)
    const myStyle = 
        props.validate ? 
        {
            backgroundColor: (
                (props.correct_ans === props.value) && "#94D7A2") || 
                ((props.isHeld && (props.correct_ans !== props.value)) && "#F8BCBC")
        }:
        {
             backgroundColor: props.isHeld && "#D6DBF5" 
        } 

    
    return(
        <div className="answer" onClick={props.handleClick} style={myStyle}>{props.value}</div>
    )
}