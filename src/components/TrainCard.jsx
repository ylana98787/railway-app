import { formatDate } from '../data/trains';
import './TrainCard.css';

function TrainCard({ train, onSelect }) {
  const departure = formatDate(train.departure);
  const arrival = formatDate(train.arrival);

  return (
    <div className="train-card" onClick={() => onSelect(train)}>
      <div className="train-card-image">
        <img src={train.image} alt={train.number} />
        <div className="train-number">{train.number}</div>
      </div>
      <div className="train-card-content">
        <div className="train-route">{train.route}</div>
        <div className="train-time">
          <div className="departure">
            <span className="time">{departure.time}</span>
            <span className="date">{departure.date}</span>
          </div>
          <div className="arrow">→</div>
          <div className="arrival">
            <span className="time">{arrival.time}</span>
            <span className="date">{arrival.date}</span>
          </div>
        </div>
        <div className="train-info">
          <span className="duration">🕒 {train.duration}</span>
          <span className="carrier">🏢 {train.carrier}</span>
          <span className="price">💰 {train.price} грн</span>
        </div>
        <button className="select-btn">Обрати квиток</button>
      </div>
    </div>
  );
}

export default TrainCard;