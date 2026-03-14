import { useState, useEffect } from 'react'
import { fetchAllDungeons } from '../../services/DungeonsAPI'
import '../css/Locations.css'
import DungeonCard from '../components/DungeonCard.jsx'

const Locations = () => {

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const locationsData = await fetchAllDungeons();
        setLocations(locationsData);

      }
      catch (error) {
        throw error
      } finally {
        setLoading(false);
      }
    })()
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className='available-locations'>
      {locations.map(dungeon => (
        <DungeonCard key={dungeon.id} dungeon={dungeon} />
      ))
      }
    </div>
  )
}

export default Locations
