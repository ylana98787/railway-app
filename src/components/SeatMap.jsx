// Імпортуємо хуки useState та useEffect з бібліотеки React для керування станом та побічними ефектами
import { useState, useEffect } from 'react';

// Імпортуємо функцію getBookedSeats з сервісу бронювань для отримання зайнятих місць
import { getBookedSeats } from '../services/bookingService';

// Імпортуємо CSS-стилі для компонента схеми місць
import './SeatMap.css';

// Оголошуємо функціональний компонент SeatMap, який приймає чотири пропси:
// - trainId: ідентифікатор потяга
// - wagonNumber: номер вибраного вагона
// - selectedSeats: масив вибраних користувачем місць
// - onSelectSeat: функція для додавання/видалення місця з вибраних
function SeatMap({ trainId, wagonNumber, selectedSeats, onSelectSeat }) {
  // Створюємо стан для зберігання масиву заброньованих місць (початково - порожній масив)
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ЗАВАНТАЖУЄМО ЗАБРОНЬОВАНІ МІСЦЯ
  // useEffect виконується при монтуванні компонента та при зміні trainId або wagonNumber
  useEffect(() => {
    // Перевіряємо, чи вибрано вагон (wagonNumber не є falsy)
    if (wagonNumber) {
      // Викликаємо функцію getBookedSeats з сервісу, передаючи trainId та wagonNumber
      const booked = getBookedSeats(trainId, wagonNumber);
      // Зберігаємо отриманий масив заброньованих місць у стан
      setBookedSeats(booked);
      // Встановлюємо loading в false, оскільки дані вже завантажені
      setLoading(false);
    }
    // Залежності: ефект виконується при зміні trainId або wagonNumber
  }, [trainId, wagonNumber]);

  // СТВОРЮЄМО МАКЕТ МІСЦЬ (4 ряди по 6 місць)
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // Масив, що визначає кількість місць у кожному ряду (всі по 6 місць)
  const seatsPerRow = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];

  // Функція для визначення статусу конкретного місця (заброньоване, вибране або вільне)
  const getSeatStatus = (row, seatNum) => {
    // Формуємо унікальний ідентифікатор місця у форматі "ряд-місце" (наприклад, "3-5")
    const seatNumber = `${row}-${seatNum}`;
    
    // Перевіряємо, чи є це місце в масиві заброньованих
    if (bookedSeats.includes(seatNumber)) {
      return 'booked'; // Місце вже заброньоване кимось іншим
    }
    // Перевіряємо, чи є це місце в масиві вибраних користувачем
    if (selectedSeats.includes(seatNumber)) {
      return 'selected'; // Місце тимчасово вибране користувачем
    }
    // Якщо місце не заброньоване і не вибране - воно вільне
    return 'available';
  };

// Функція-обробник кліку на місце
  const handleSeatClick = (row, seatNum) => {
    // Формуємо ідентифікатор місця
    const seatNumber = `${row}-${seatNum}`;
    // Отримуємо статус місця
    const status = getSeatStatus(row, seatNum);
    
    // Якщо місце заброньоване - нічого не робимо (виходимо з функції)
    if (status === 'booked') {
      return; // НЕ МОЖНА ВИБРАТИ ЗАБРОНЬОВАНЕ МІСЦЕ
    }
    
    // Викликаємо функцію onSelectSeat, передаючи ідентифікатор місця
    // (ця функція має додати місце до вибраних або видалити його, якщо воно вже вибране)
    onSelectSeat(seatNumber);
  };


  // Якщо вагон не вибрано (wagonNumber дорівнює null, undefined, 0 або false)
  if (!wagonNumber) {
    // Повертаємо плейсхолдер з попередженням
    return (
      <div className="seat-map-placeholder">
        ⚠️ Спочатку оберіть вагон
      </div>
    );
  }

    // Якщо дані ще завантажуються (loading === true)
  if (loading) {
    // Показуємо спінер завантаження
    return <div className="loading-spinner">Завантаження схеми місць...</div>;
  }
  // Основний JSX для відображення схеми місць (рендериться, коли вагон вибрано і дані завантажено)
  return (
    // Кореневий контейнер схеми місць
    <div className="seat-map">
      <h3>Схема вагона №{wagonNumber}</h3>
      
      <div className="train-layout">
        <div className="train-front">🚂 ЛОКОМОТИВ</div>
        
        {rows.map((row) => (
          <div key={row} className="seat-row">
            <div className="row-number">{row}</div>
            <div className="seats">
              {[...Array(seatsPerRow[row - 1])].map((_, idx) => {
                const seatNum = idx + 1;
                const status = getSeatStatus(row, seatNum);
                return (
                  <button
                    key={seatNum}
                    className={`seat ${status}`}
                    onClick={() => handleSeatClick(row, seatNum)}
                  >
                    {seatNum}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="train-end">🚂 КІНЕЦЬ ВАГОНА</div>
      </div>
      
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Вільне</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Вибране</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Заброньоване</span>
        </div>
      </div>
    </div>
  );
}

export default SeatMap;