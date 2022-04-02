import React    from "react"
import ReactDOM from "react-dom/client"
import App      from "./App"
import "./styles/index.css"

// 应用的入口函数，没有什么好说的
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
)
root.render(<App/>)