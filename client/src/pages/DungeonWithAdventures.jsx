import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDungeonWithAdventures } from "../../services/DungeonsAPI";
import AdventureCard from "../components/AdventureCard";
import '../css/LocationEvents.css'

const DungeonWithAdventures = () => {
  const { id } = useParams();
  const [dungeonData, setDungeonData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchDungeon = async () => {
      try {
        const data = await fetchDungeonWithAdventures(id);
        setDungeonData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDungeon();
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div className="dungeon-section">
        <div className="dungeon-section-right">

          <h1>{dungeonData.name}</h1>
          <img src={dungeonData.image} alt={dungeonData.description} />
        </div>
        <div className="dungeon-section-left">
          <ul>
            <li>Description: {dungeonData.description}</li>
            <li>Location: {dungeonData.location}</li>
            <li>Difficulty: {dungeonData.difficulty}</li>
            <li>Max Party Size: {dungeonData.max_party_size}</li>
          </ul>
        </div>
      </div>
      <div className="adventures-section">
        {dungeonData.adventures.map(adventure => (
          <AdventureCard key={adventure.id} adventure={adventure} />
        ))
        }
      </div>
    </>
  )
}

export default DungeonWithAdventures
