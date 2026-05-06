// Імпортуємо хуки useState та useEffect для керування станом та побічними ефектами
import { useState, useEffect } from 'react';

// Імпортуємо хуки useParams (отримання параметрів з URL) та useNavigate (програмна навігація) з React Router
import { useParams, useNavigate } from 'react-router-dom';

// Імпортуємо хук useBooking для глобального стану (контекст)
import { useBooking } from '../context/BookingContext';

// Імпортуємо ToastContainer (контейнер для повідомлень) та toast (функцію для показу повідомлень) з react-toastify
import { ToastContainer, toast } from 'react-toastify';

// Імпортуємо CSS-стилі для бібліотеки повідомлень (обов'язково для правильної роботи)
import 'react-toastify/dist/ReactToastify.css';

// Імпортуємо компонент WagonSelector для вибору вагона
import WagonSelector from '../components/WagonSelector';

// Імпортуємо компонент SeatMap для відображення схеми місць
import SeatMap from '../components/SeatMap';

// Імпортуємо компонент BookingForm для оформлення бронювання
import BookingForm from '../components/BookingForm';

// Імпортуємо масив trains з даними про всі потяги (на випадок, якщо потяг не в контексті)
import { trains } from '../data/trains';

// Імпортуємо функцію bookSeats з сервісу бронювань для збереження бронювання
import { bookSeats } from '../services/bookingService';

// Імпортуємо CSS-стилі для сторінки бронювання
import './BookingPage.css';

// Оголошуємо компонент BookingPage (головна сторінка процесу бронювання)
function BookingPage() {
  // Отримуємо параметр trainId з URL (наприклад, /booking/1 -> trainId = "1")
  const { trainId } = useParams();
  
  // Отримуємо функцію navigate для програмного переходу між сторінками
  const navigate = useNavigate();
  
  // Отримуємо функції та стани з глобального контексту (useContext)
  const { 
    selectedTrain,      // Вибраний потяг з контексту
    setSelectedTrain,   // Функція для зміни вибраного потяга
    selectedWagon,      // Вибраний вагон з контексту
    setSelectedWagon,   // Функція для зміни вибраного вагона
    selectedSeats,      // Вибрані місця з контексту
    setSelectedSeats,   // Функція для зміни вибраних місць
    clearBooking        // Функція для очищення всіх даних бронювання
  } = useBooking();
  
  // Стан для відстеження завантаження даних (початково true, бо дані ще не завантажено)
  const [loading, setLoading] = useState(true);

  // Хук useEffect для завантаження даних про потяг при монтуванні компонента або зміні trainId
  useEffect(() => {
    // ЯКЩО ПОТЯГА НЕМАЄ В ГЛОБАЛЬНОМУ СТАНІ - ЗАВАНТАЖУЄМО З trains.js
    if (!selectedTrain) {
      const foundTrain = trains.find(t => t.id === parseInt(trainId));
      if (foundTrain) setSelectedTrain(foundTrain);
    }
    setLoading(false);
  }, [trainId, selectedTrain, setSelectedTrain]);

  // Функція-обробник вибору вагона
  const handleSelectWagon = (wagonNumber) => {
    // Встановлюємо вибраний вагон в глобальний стан
    setSelectedWagon(wagonNumber);
    // Очищаємо вибрані місця при зміні вагона (місця в різних вагонах різні)
    setSelectedSeats([]);
  };

  // Функція-обробник вибору/скасування вибору місця
  const handleSelectSeat = (seatNumber) => {
    // Перевіряємо, чи вже вибране це місце
    if (selectedSeats.includes(seatNumber)) {
      // Якщо так - видаляємо його з масиву (фільтруємо)
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      // Якщо ні - додаємо до масиву (створюємо новий масив зі старими + нове місце)
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Допоміжна функція для отримання ціни вагона за його номером
  const getWagonPrice = (wagonNumber) => {
    // Об'єкт з цінами для кожного вагона (ключ - номер вагона, значення - ціна)
    const prices = { 1: 450, 2: 680, 3: 1200, 4: 450, 5: 680 };
    // Повертаємо ціну для вказаного вагона, якщо номера немає - за замовчуванням 450
    return prices[wagonNumber] || 450;
  };

  // Функція-обробник підтвердження бронювання
  const handleBooking = (userData) => {
    // Розраховуємо загальну вартість (ціна вагона * кількість місць)
    const totalPrice = selectedSeats.length * getWagonPrice(selectedWagon);
    
    // Зберігаємо бронювання в localStorage через сервіс бронювань
    bookSeats(selectedTrain.id, selectedWagon, selectedSeats, userData);
    
    // Показуємо спливаюче повідомлення про успішне бронювання
    toast.success(`✅ Успішно заброньовано ${selectedSeats.length} місць!`, {
      position: "top-right", // Позиція повідомлення - правий верхній кут
      autoClose: 3000        // Автоматичне закриття через 3 секунди (3000 мс)
    });
    
    // ОЧИЩУЄМО ГЛОБАЛЬНИЙ СТАН ПІСЛЯ УСПІШНОГО БРОНЮВАННЯ
    clearBooking();
    
    // Через 2 секунди (2000 мс) повертаємось на головну сторінку
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Розраховуємо загальну вартість для відображення у формі
  const totalPrice = selectedSeats.length * getWagonPrice(selectedWagon);

  // Якщо дані ще завантажуються - показуємо спінер завантаження
  if (loading) {
    return <div className="loading-spinner">Завантаження...</div>;
  }

  // Якщо потяг не знайдено в глобальному стані - показуємо повідомлення про помилку
  if (!selectedTrain) {
    return <div className="error-state">Потяг не знайдено</div>;
  }

  // Головний JSX для сторінки бронювання
  return (
    <div className="booking-page">
      
      {/* Контейнер для спливаючих повідомлень */}
      <ToastContainer />
      
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Назад до списку
        </button>
        
        <h1>Бронювання квитків</h1>
        
        <div className="train-info-booking">
          <span className="train-number">Потяг №{selectedTrain.number}</span>
          <span className="train-route">{selectedTrain.route}</span>
          <span className="train-date">
            {new Date(selectedTrain.departure).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>

      <WagonSelector
        selectedWagon={selectedWagon}
        onSelectWagon={handleSelectWagon}
      />

      <SeatMap
        trainId={selectedTrain.id}
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