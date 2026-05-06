// Імпортуємо хук useNavigate з React Router для програмної навігації між сторінками
import { useNavigate } from 'react-router-dom';

// Імпортуємо хук useBooking для глобального стану (щоб передати вибраний потяг)
import { useBooking } from '../context/BookingContext';

// Імпортуємо функцію formatDate з файлу trains.js для форматування дати та часу
import { formatDate } from '../data/trains';

// Імпортуємо CSS-стилі для картки потяга
import './TrainCard.css';

// Оголошуємо функціональний компонент TrainCard, який приймає один пропс - train (об'єкт з даними про потяг)
function TrainCard({ train }) {
  // Отримуємо функцію navigate з React Router для переходу на інші сторінки
  const navigate = useNavigate();
  
  // Отримуємо функцію setSelectedTrain з контексту для збереження вибраного потяга в глобальному стані
  const { setSelectedTrain } = useBooking();
  
  // Форматуємо дату та час відправлення: викликаємо formatDate для train.departure
  // Результат - об'єкт { time: "08:30", date: "15 грудня" }
  const departure = formatDate(train.departure);
  
  // Форматуємо дату та час прибуття: викликаємо formatDate для train.arrival
  // Результат - об'єкт { time: "14:45", date: "15 грудня" }
  const arrival = formatDate(train.arrival);

  // Функція-обробник вибору потяга (викликається при кліку на картку)
  const handleSelect = () => {
    // ЗБЕРІГАЄМО ВИБРАНИЙ ПОТЯГ В ГЛОБАЛЬНИЙ СТАН (useContext)
    setSelectedTrain(train);
    // Використовуємо navigate для переходу на сторінку бронювання
    // Шаблонний рядок створює динамічний маршрут: /booking/ID_потяга
    // Наприклад, якщо train.id = 1, то перехід на "/booking/1"
    navigate(`/booking/${train.id}`);
  };

  // Повертаємо JSX-розмітку картки потяга
  return (
    // Кореневий div з класом "train-card" для стилізації
    // При кліку на будь-яку частину картки викликається handleSelect
    <div className="train-card" onClick={handleSelect}>
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