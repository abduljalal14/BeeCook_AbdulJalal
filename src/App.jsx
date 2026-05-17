import { useLocation } from "react-router-dom"
import Header from "./layouts/Header.jsx"
import Footer from "./layouts/Footer.jsx"
import Routes from "./routes/index.jsx"

function App() {
  const { pathname } = useLocation()
  const hideFooter = pathname === "/kelola" || pathname === "/resep"

  return (
    <>
      <Header />
      <main className="pt-20">
        <Routes />
      </main>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
