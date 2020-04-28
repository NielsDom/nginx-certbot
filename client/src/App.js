import React, { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [input, setinput] = useState("")

  const _jambon = url => {
    console.log("url: ", url)
    axios
      .get(url)
      .then(({ data }) => console.log(data))
      .catch(e => e)

    setinput("")
  }

  useEffect(() => {
    axios
      .get("/api")
      .then(e => console.log(e))
      .catch(e => console.log("api", e))
  }, [])
  return (
    <div>
      <h1>hi</h1>
      <div>
        <input value={input} onChange={e => setinput(e.target.value)} />
        <button onClick={() => _jambon(input)}>Submit</button>
      </div>
    </div>
  )
}

export default App
