import UserProfile from "./components/UserProfile"

const App = () => {
    const callMe = () => {
        console.log("Call me later...")
    }
    return (
        <div>
            <h1>Root Component</h1>
            <UserProfile username="Bob" age={25} isLoggedIn={false} favoriteFoods={[{ name: 'Shushi' }]} callMe={callMe} />
        </div>
    )
}

export default App

// export default thì chỉ duy nhất
// export có thể có nhiều export trong file đó
// khi import vào đây do UserProfile là export default nên UserProfile không cần phải để trong destructuring