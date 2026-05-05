import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import { trains } from '../data/trains';
import { bookSeats } from '../services/bookingService';
import './BookingPage.css';

function BookingPage() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundTrain = trains.find(t => t.id === parseInt(trainId));
    setTrain(foundTrain);
    setLoading(false);
  }, [trainId]);

  const handleSelectWagon = (wagonNumber) => {
    setSelectedWagon(wagonNumber);
    setSelectedSeats([]);
  };

  const handleSelectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = (userData) => {
    // Знаходимо ціну вагона
    const wagonPrice = getWagonPrice(selectedWagon);
    const totalPrice = selectedSeats.length * wagonPrice;
    
    // Зберігаємо бронювання
    bookSeats(train.id, selectedWagon, selectedSeats, userData);
    
    // Показуємо повідомлення про успіх
    toast.success(`✅ Успішно заброньовано ${selectedSeats.length} місць!`, {
      position: "top-right",
      autoClose: 3000
    });
    
    // Очищаємо вибрані місця
    setSelectedSeats([]);
    
    // Через 2 секунди повертаємось на головну
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const getWagonPrice = (wagonNumber) => {
    const prices = { 1: 450, 2: 680, 3: 1200, 4: 450, 5: 680 };
    return prices[wagonNumber] || 450;
  };

  const totalPrice = selectedSeats.length * getWagonPrice(selectedWagon);

  if (loading) {
    return <div className="loading-spinner">Завантаження...</div>;
  }

  if (!train) {
    return <div className="error-state">Потяг не знайдено</div>;
  }

  return (
    <div className="booking-page">
      <ToastContainer />
      
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад до списку
        </button>
        <h1>Бронювання квитків</h1>
        <div className="train-info-booking">
          <span className="train-number">Потяг №{train.number}</span>
          <span className="train-route">{train.route}</span>
          <span className="train-date">
            {new Date(train.departure).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>

      <WagonSelector
        selectedWagon={selectedWagon}
        onSelectWagon={handleSelectWagon}
      />

      <SeatMap
        trainId={train.id}
        wagonNumber={selectedWagon}
        selectedSeats={selectedSeats}
        onSelectSeat={handleSelectSeat}
      />

      <BookingForm
        onSubmit={handleBooking}
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default BookingPage;