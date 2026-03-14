import '../css/LocationEvents.css'

const AdventureCard = ({ adventure }) => {
  return (
    <div className="adventure-card">
      <h3>{adventure.title}</h3>
      <h4>By {adventure.host}</h4>
      <p>{adventure.description}</p>
      <ul>
        <li>Date: {adventure.adventure_date}</li>
        <li>Slots available: {adventure.slots_available}</li>
        <li>Total slots: {adventure.slots_total}</li>
      </ul>
    </div>
  )
}

export default AdventureCard
