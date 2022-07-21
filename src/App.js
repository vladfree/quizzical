import React from "react"
import Questions from "./components/Questions"
import Start from "./components/Start"

import {
  Routes,
  Route
} from "react-router-dom"

export default function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Start />}/>
        <Route exact path="/questions" element={<Questions />} />
      </Routes>
  );
}

