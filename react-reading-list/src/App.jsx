import BookList from "./components/BookList"
import Navabar from "./components/Navabar"
import NewBookForm from "./components/NewBookForm"
import BookContextProvider from "./contexts/BookContext"

const App = () => {
  return (
    <div className="app">
      <BookContextProvider>
        <Navabar />
        <BookList />
        <NewBookForm />
      </BookContextProvider>
    </div>
  )
}

export default App