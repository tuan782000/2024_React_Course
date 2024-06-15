import { useEffect, useState } from "react"

function App() {
  const [name, setName] = useState('')
  const [renderCount, setRenderCount] = useState(0)

  useEffect(() => {
    setRenderCount(prevRenderCount => prevRenderCount + 1)
  })
  return (

    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <div>My name is: {name}</div>
      <div>I rendered {renderCount} times</div>
    </>
  )
}

export default App
