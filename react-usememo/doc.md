Vấn đề gặp phải

```js
import { useState } from "react";

function App() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);
    const doubleNumber = slowFunction(number);
    const themeStyle = {
        backgroundColor: dark ? "black" : "white",
        color: dark ? "white" : "black",
    };
    return (
        <>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>
            <div style={themeStyle}> {doubleNumber}</div>
        </>
    );
}

function slowFunction(num) {
    console.log("Calling slow function");
    for (let i = 0; i <= 1000000000; i++) {}
    return num * 2;
}

export default App;
```

Khi mà number thay đổi thì 1 khoảng delay - sau khoảng delay doubleNumber được cập nhật

Điều này không có gì đáng nói cho đến khi thằng theme có dark và setDark thay đổi vẫn bị delay.

Kết quả mong muốn chỉ mỗi doubleNumber mới bị

useMemo ra đời để giải quyết vấn đề này

Cách thức hoạt động useMemo: nó tương tự useEffect

```js
const doubleNumber = useMemo(() => {
    return slowFunction(number);
}, [number]);
```

chỉ khi nào number thay đổi useMemo đó mới thực thi đoạn code bên trong

```js
import { useMemo, useState } from "react";

function App() {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);
    // const doubleNumber = slowFunction(number)

    const doubleNumber = useMemo(() => {
        return slowFunction(number);
    }, [number]); // lưu lại giá trị

    const themeStyle = {
        backgroundColor: dark ? "black" : "white",
        color: dark ? "white" : "black",
    };
    return (
        <>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>
                Change Theme
            </button>
            <div style={themeStyle}> {doubleNumber}</div>
        </>
    );
}

function slowFunction(num) {
    console.log("Calling slow function");
    for (let i = 0; i <= 1000000000; i++) {}
    return num * 2;
}

export default App;
```

Vậy khi nào ứng sụng useMemo. Khi mà ta có 1 hàm nào đó trả về rất là lâu, useMemo đứng ra lưu các giá trị của hàm trong bộ nhớ.

Trường hợp 2

```js
import { useEffect, useMemo, useState } from 'react'

function App() {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)

  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])


  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [dark])

  useEffect(() => {
    console.log("Theme Style Change")
  }, [themeStyle])

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
```

tại vì useffect có dependency là themeStyle mà const themeStyle có giá trị là object 2 thằng này đều lưu 1 giá trị giống nhau nhưng mà khác vùng nhớ. sử dụng useMemo để mà lưu giá trị đó, themeStyle và const themeStyle đều tham chiếu useMemo để lấy ra cùng 1 giá trị và cùng 1 ô nhớ còn giá trị bên trong useMemo là 1 callbacks và có dependency riêng dark theo dõi state dark có thay đổi hay không để cập nhật lại giá trị useMemo

2 ví dụ trên

Nếu sử dụng bừa bãi thì tốn rất nhiều bộ nhớ.

Tóm lại: sử dụng useMemo 2 trường hợp phổ biến nhất:

trường hợp 1: slow function - Những function thực hiện rất chậm

trường hợp 2: reference equality

sử dụng useMemo để 2 cái đều cùng trỏ về cùng 1 địa chỉ ô nhớ


