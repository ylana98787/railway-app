// ІМПОРТУЄМО ФУНКЦІЮ formatDate З ФАЙЛУ trains.js
// Ця функція перетворює дату (наприклад "2024-12-15T08:30:00") у зрозумілий вигляд
// Повертає об'єкт: { time: "08:30", date: "15 грудня" }
import { formatDate } from '../data/trains';

// ІМПОРТУЄМО СТИЛІ ДЛЯ КОМПОНЕНТА TRAIN CARD
import './TrainCard.css';

// ОГОЛОШЕННЯ КОМПОНЕНТА TRAIN CARD
// Цей компонент приймає два параметри (props):
// - train: об'єкт з даними про потяг (номер, маршрут, час, ціна, фото)
// - onSelect: функція, яка викликається, коли користувач натискає на картку
function TrainCard({ train, onSelect }) {
  
  // ФОРМАТУЄМО ДАТУ ВІДПРАВЛЕННЯ
  // Викликаємо formatDate, передаємо train.departure (наприклад "2024-12-15T08:30:00")
  // Отримуємо об'єкт з часом та датою
  const departure = formatDate(train.departure);
  
  // ФОРМАТУЄМО ДАТУ ПРИБУТТЯ
  const arrival = formatDate(train.arrival);

  // ПОВЕРТАЄМО JSX (HTML-ПОДІБНИЙ КОД) ДЛЯ ВІДОБРАЖЕННЯ НА СТОРІНЦІ
  return (
    // ГОЛОВНИЙ КОНТЕЙНЕР КАРТКИ
    // className="train-card" - CSS клас для стилізації
    // Коли натискають на картку, викликається onSelectTrain(train) і батько знає, який потяг обрали.
    <div className="train-card" onClick={() => onSelect(train)}> 
      
      {/* БЛОК З ФОТОГРАФІЄЮ ПОТЯГА */}
      <div className="train-card-image">
        {/* ТЕГ <img> ДЛЯ ВІДОБРАЖЕННЯ ФОТО */}
        {/* src={train.image} - джерело фото (шлях до картинки) */}
        {/* alt={train.number} - показується, якщо фото не завантажилось) */}
        <img src={train.image} alt={train.number} />
        
        {/* БЛОК З НОМЕРОМ ПОТЯГА (накладається поверх фото) */}
        <div className="train-number">{train.number}</div>
      </div>
      
      {/* БЛОК З ТЕКСТОВОЮ ІНФОРМАЦІЄЮ ПОТЯГА */}
      <div className="train-card-content">
        
        {/* МАРШРУТ (наприклад "Київ → Харків") */}
        <div className="train-route">{train.route}</div>
        
        {/* БЛОК З ЧАСОМ ВІДПРАВЛЕННЯ ТА ПРИБУТТЯ */}
        <div className="train-time">
          
          {/* БЛОК ВІДПРАВЛЕННЯ */}
          <div className="departure">
            <span className="time">{departure.time}</span>  {/* час (08:30) */}
            <span className="date">{departure.date}</span>  {/* дата (15 грудня) */}
          </div>
          
          {/* СТРІЛКА МІЖ ЧАСАМИ */}
          <div className="arrow">→</div>
          
          {/* БЛОК ПРИБУТТЯ */}
          <div className="arrival">
            <span className="time">{arrival.time}</span>    {/* час (14:45) */}
            <span className="date">{arrival.date}</span>    {/* дата (15 грудня) */}
          </div>
        </div>
        
        {/* БЛОК З ДОДАТКОВОЮ ІНФОРМАЦІЄЮ */}
        <div className="train-info">
          {/* ТРИВАЛІСТЬ ПОЇЗДКИ з іконкою годинника */}
          <span className="duration">🕒 {train.duration}</span>
          
          {/* ПЕРЕВІЗНИК з іконкою будівлі */}
          <span className="carrier">🏢 {train.carrier}</span>
          
          {/* ЦІНА з іконкою грошей */}
          <span className="price">💰 {train.price} грн</span>
        </div>
        
        {/* КНОПКА ДЛЯ ВИБОРУ КВИТКА */}
        <button className="select-btn">Обрати квиток</button>
        
      </div>
    </div>
  );
}

// ЕКСПОРТУЄМО КОМПОНЕНТ ДЛЯ ВИКОРИСТАННЯ В ІНШИХ ФАЙЛАХ
export default TrainCard;