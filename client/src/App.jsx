import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import DungeonWithAdventures from './pages/DungeonWithAdventures.jsx'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: 'dungeons/:id',
      element: <DungeonWithAdventures />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>Dungeon Crawlers Depot</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
