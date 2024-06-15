Đây là 1 ví dụ không đúng

```js
import { useEffect, useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        setRenderCount((prevRenderCount) => prevRenderCount + 1);
    });
    return (
        <>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>My name is: {name}</div>
            <div>I rendered {renderCount} times</div>
        </>
    );
}

export default App;
```

khi bạn nhập vào input name thì kích hoạt sự kiện onChange giúp setName set lại giá trị cho name.

Đồng thời component bị re-render

Kích hoạt useEffect

renderCount có giá trị là 0, sau khi useEffect render thì tăng lên 1 đơn vị. vì sử dụng setRenderCount cập nhật lại giá trị

Nhưng cách nghĩ trên là sai: Lý do nó đã rơi vào vòng lặp vô hạn. vì khi mà thực hiện setRenderCount thì component sẽ re-render mà khi re-render dẫ đến kích hoạt useEffect

Để giải quyết vấn đề trên người ta sử dụng useRef()

