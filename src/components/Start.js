import {
    Link,
} from "react-router-dom"

export default function Start (props){
    return (
        <div className="box">
            <div className="inner">
                <img className="img-top" src={require("../images/startTop.png")} alt="" />
                <h1>Quizzical</h1>
                <p>Test your knowladge with a large variety of Trivia questions!</p>
                <Link to="/questions"> <button className="start-btn">Start quiz</button> </Link>
                <img className="img-bottom" src={require("../images/startBottom.png")} alt="" />
            </div>
        </div>
    )
}