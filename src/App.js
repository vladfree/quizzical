import Questions from "./components/Questions"
import Start from "./components/Start"
import {
  Routes,
  Route,
  Link,
} from "react-router-dom"

export default function App() {
  const questionList = ["Q1?", "Q2?"]
  const answersList = ["A1", "A2", "A3", "A4"]
  return (
      <Routes>
        <Route exact path="/" element={<Start />}/>
        <Route exact path="/questions" element=
          {
            <Questions 
                questios={questionList}
                answers={answersList}
            />
          } 
        />
      </Routes>
  );
}

