
export default function Answers(props){
    return(
        <div className="answer" onClick={props.handleClick}>{props.value}</div>
    )
}