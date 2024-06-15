// Đây là 1 customHook

import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // tạo custom hooks

    useEffect(() => {
        fetch(url)
            .then((res) => {
                console.log(res);
                if (!res.ok) {
                    throw new Error('Could not fetch data for that resource');
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch((err) => {
                // console.log(err.message)
                setError(err.message)
                setIsPending(false)
            })
    }, [url]);
    return {
        data,
        isPending,
        error
    }
}

export default useFetch;