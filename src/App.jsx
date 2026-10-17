
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OurStory from './components/OurStory'
import Reservations from './components/Reservations'

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Menu />
        <OurStory/>
        <Reservations/>
      </main>
    </>
  )
}

export default App
