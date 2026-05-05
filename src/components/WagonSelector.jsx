// Імпортуємо CSS-стилі для компонента вибору вагона
import './WagonSelector.css';

// Оголошуємо функціональний компонент WagonSelector, який приймає два пропси:
// - selectedWagon: номер поточно вибраного вагона (або null, якщо нічого не вибрано)
// - onSelectWagon: функція-обробник, яка викликається при виборі вагона
function WagonSelector({ selectedWagon, onSelectWagon }) {
  // ДОСТУПНІ ВАГОНИ (типи)
  // Оголошуємо масив об'єктів, кожен з яких описує один вагон
  const wagons = [
    { number: 1, type: 'Плацкарт', price: 450 }, // Вагон №1, тип Плацкарт, ціна 450 грн
    { number: 2, type: 'Купе', price: 680 },
    { number: 3, type: 'Люкс', price: 1200 },
    { number: 4, type: 'Плацкарт', price: 450 },
    { number: 5, type: 'Купе', price: 680 }
  ];

  // Повертаємо JSX-розмітку для рендеру компонента
  return (
    // Кореневий div-контейнер з CSS-класом "wagon-selector" для стилізації
    <div className="wagon-selector">
      {/* Заголовок секції вибору вагона рівня h3 */}
      <h3>Оберіть вагон</h3>
      
      <div className="wagons-list">
        {wagons.map((wagon) => (
          <button
            key={wagon.number}
            className={`wagon-btn ${selectedWagon === wagon.number ? 'active' : ''}`}
            onClick={() => onSelectWagon(wagon.number)}
          >
            {/* Блок з номером вагона */}
            <span className="wagon-number">Вагон {wagon.number}</span>
            {/* Блок з типом вагона (Плацкарт/Купе/Люкс) */}
            <span className="wagon-type">{wagon.type}</span>
            {/* Блок з ціною вагона (додаємо слово "грн" після ціни) */}
            <span className="wagon-price">{wagon.price} грн</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WagonSelector;