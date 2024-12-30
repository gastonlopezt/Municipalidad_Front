import { Routes, Route } from "react-router-dom"
import Users from "./pages/users"
import { UserContextProvider } from "./context/UserContext"

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Users/>} />
      </Routes>
    </UserContextProvider>
  )

}

export default App
