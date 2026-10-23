
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OurStory from './components/OurStory'
import Reservations from './components/Reservations'
import Footer from './components/Footer'
import Auth from './components/Auth'

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Menu />
        <OurStory/>
        <Reservations/>
        <Auth/>
      </main>
      <Footer/>
    </>
  )
}

export default App
