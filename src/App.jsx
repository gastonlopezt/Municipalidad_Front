import { Routes, Route } from "react-router-dom"
import { UserContextProvider } from "./context/UserContext"
import Users from "./Pages/Users.jsx"

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
