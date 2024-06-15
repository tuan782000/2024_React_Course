import { useEffect, useMemo, useState } from 'react'

function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  // const doubleNumber = slowFunction(number)

  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])

  // const themeStyle = {
  //   backgroundColor: dark ? 'black' : 'white',
  //   color: dark ? 'white' : 'black'
  // }
  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])

  useEffect(() => {
    console.log("Theme Style Change")
  }, [themeStyle])
  // lưu lại giá trị không lưu lại vùng nhớ - khi mà number bị reander thì mặc dù themeStyle không thay đổi nhưng useEffect cũng kích hoạt


  return (
    <>
      <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyle}> {doubleNumber}</div>
    </>
  )
}

function slowFunction(num) {
  console.log('Calling slow function')
  for (let i = 0; i <= 1000000000; i++) { }
  return num * 2;
}

export default App
