import './BookCard.css'
import noCover from  '../../assets/no-cover.png'

function BookCard() {
  return (
    <div className="card">
      <img src={noCover}/>
      <p>Name: </p>
      <p>Available: </p>
    </div>
  )
}
export default BookCard
