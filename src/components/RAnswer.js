export default function RAnswer(props){
    const myStyle = 
        props.validate ?
        {
            backgroundColor: (
                (props.correct_ans === props.value) && "#94D7A2") ||
                ((props.isHeld && (props.correct_ans !== props.value)) && "#F8BCBC")
        } :
        {
            backgroundColor: props.isHeld && "#D6DBF5"
        } 
        
    return(
        <div className="radio" style={myStyle}>
            <input
                type="radio"
                id={props.id}
                name="answer"
                value={props.id}
                checked={props.isHeld}
                onChange={props.handleClick}
            />
            <label htmlFor={props.id}>{props.value}</label>
        </div>
    )
}