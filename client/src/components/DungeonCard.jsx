import { Link } from 'react-router-dom'
const DungeonCard = ({ dungeon }) => {
  return (
    <Link to={`dungeons/${dungeon.id}`}>
      <div className="dungeon-card">
        <h3>{dungeon.name}</h3>
        <img src={dungeon.image} alt={dungeon.description}></img>
      </div>
    </Link>
  )
}

export default DungeonCard
