
export default function Answers(props){
    const hold = {
        backgroundColor: props.isHeld && "#D6DBF5"
    }
    return(
        <div className="answer" onClick={props.handleClick} style={hold}>{props.value}</div>
    )
}