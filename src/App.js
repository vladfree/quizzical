import React from "react"
import Questions from "./components/Questions"
import Start from "./components/Start"
import Question from "./components/Question"
import { nanoid } from "nanoid"

import {
  Routes,
  Route
} from "react-router-dom"

export default function App() {
  const [questions, setQuestions] = React.useState(()=>{})

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      const modData = await generateQuestions(data.results)
      console.log("MOD DATA: " + modData)
      setQuestions(modData)
    }
    fetchData();
    console.log('i fire once');
    return () => {
      console.log('This will be logged on unmount');
    };
  }, [])

  async function generateQuestions(data){
    const newData= []
    for(let i = 0; i < data.length; i++){
        const answers = data[i].incorrect_answers
        const id = Math.floor(Math.random() * data.length)
        answers.splice(id, 0, data[i].correct_answer)
        const taggedAns = answers.map(ans => { return { value: ans, id: nanoid(), qId: i } })
        newData.push({ q: data[i].question, answers: taggedAns, qId: i, correct_ans: data[i].correct_answer, type: data[i].type})
    }
    return newData
  }

  return (
      <Routes>
        <Route exact path="/" element={<Start />}/>
        <Route exact path="/questions" element={<Questions q={questions}/>} />
      </Routes>
  );
}

