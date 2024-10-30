
import ROUTES from "./components/routes"
import NavBar from "./components/NavBar"
import styles from "./styles/app.module.scss"

function App() {

  return (
    <div style={styles}>
      <NavBar/>
      <ROUTES />
    </div>
  )
}

export default App
