
export default function Answers(props){

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