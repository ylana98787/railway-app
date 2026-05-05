import { useState, useEffect } from 'react';
import { getBookedSeats } from '../services/bookingService';
import './SeatMap.css';

function SeatMap({ trainId, wagonNumber, selectedSeats, onSelectSeat }) {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // ЗАВАНТАЖУЄМО ЗАБРОНЬОВАНІ МІСЦЯ
  useEffect(() => {
    if (wagonNumber) {
      const booked = getBookedSeats(trainId, wagonNumber);
      setBookedSeats(booked);
      setLoading(false);
    }
  }, [trainId, wagonNumber]);

  // СТВОРЮЄМО МАКЕТ МІСЦЬ (4 ряди по 6 місць)
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const seatsPerRow = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];

  const getSeatStatus = (row, seatNum) => {
    const seatNumber = `${row}-${seatNum}`;
    
    if (bookedSeats.includes(seatNumber)) {
      return 'booked';
    }
    if (selectedSeats.includes(seatNumber)) {
      return 'selected';
    }
    return 'available';
  };

  const handleSeatClick = (row, seatNum) => {
    const seatNumber = `${row}-${seatNum}`;
    const status = getSeatStatus(row, seatNum);
    
    if (status === 'booked') {
      return; // НЕ МОЖНА ВИБРАТИ ЗАБРОНЬОВАНЕ МІСЦЕ
    }
    
    onSelectSeat(seatNumber);
  };

  if (!wagonNumber) {
    return (
      <div className="seat-map-placeholder">
        ⚠️ Спочатку оберіть вагон
      </div>
    );
  }

  if (loading) {
    return <div className="loading-spinner">Завантаження схеми місць...</div>;
  }

  return (
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