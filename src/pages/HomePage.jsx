// ІМПОРТУЄМО ХУК useState ДЛЯ ЗБЕРІГАННЯ ДАНИХ, ЩО ЗМІНЮЮТЬСЯ
import { useState } from 'react';

// ІМПОРТУЄМО КОМПОНЕНТ TRAINLIST ДЛЯ ВІДОБРАЖЕННЯ СПИСКУ ПОТЯГІВ
import TrainList from '../components/TrainList';

// ІМПОРТУЄМО МАСИВ З ДАНИМИ ПРО ВСІ ПОТЯГИ
import { trains } from '../data/trains';

// ІМПОРТУЄМО СТИЛІ ДЛЯ ГОЛОВНОЇ СТОРІНКИ
import './HomePage.css';

// ОГОЛОШЕННЯ КОМПОНЕНТА ГОЛОВНОЇ СТОРІНКИ
function HomePage() {
  
  // СТВОРЮЄМО СТАН ДЛЯ ТЕКСТУ ПОШУКУ
  // searchTerm - змінна, яка зберігає текст пошуку
  // setSearchTerm - функція для зміни searchTerm
  // '' - початкове значення (порожній рядок)
  const [searchTerm, setSearchTerm] = useState('');
  
  // СТВОРЮЄМО СТАН ДЛЯ ВІДФІЛЬТРОВАНИХ ПОТЯГІВ
  // filteredTrains - змінна, яка зберігає список потягів після фільтрації
  // setFilteredTrains - функція для зміни filteredTrains
  // trains - початкове значення (ВСІ потяги)
  const [filteredTrains, setFilteredTrains] = useState(trains);

  // ФУНКЦІЯ ДЛЯ ОБРОБКИ ПОШУКУ (ВИКЛИКАЄТЬСЯ ПРИ ВВЕДЕННІ ТЕКСТУ)
  // e - об'єкт події (містить інформацію про те, що ввів користувач)
  const handleSearch = (e) => {
    
    // ОТРИМУЄМО ТЕКСТ З ПОЛЯ ВВОДУ ТА ПЕРЕТВОРЮЄМО В НИЖНІЙ РЕГІСТР
    // toLowerCase() - щоб пошук ІГНОРУВАВ РЕГІСТР (Київ = київ)
    const term = e.target.value.toLowerCase();
    
    // ОНОВЛЮЄМО СТАН searchTerm НОВИМ ЗНАЧЕННЯМ
    setSearchTerm(term);
    
    // ФІЛЬТРУЄМО ПОТЯГИ
    // filter() - проходить по КОЖНОМУ потягу і залишає тільки ті, що ПІДХОДЯТЬ
    const filtered = trains.filter(train => 
      
      // ПЕРЕВІРЯЄМО, ЧИ МАРШРУТ МІСТИТЬ ПОШУКОВИЙ ТЕКСТ
      // toLowerCase() - переводимо маршрут в нижній регістр
      // includes(term) - перевіряє, чи МІСТИТЬ рядок term
      train.route.toLowerCase().includes(term) ||
      
      // АБО ПЕРЕВІРЯЄМО, ЧИ НОМЕР ПОТЯГА МІСТИТЬ ПОШУКОВИЙ ТЕКСТ
      // || - логічне "АБО" (достатньо виконання ОДНІЄЇ умови)
      train.number.toLowerCase().includes(term)
    );
    
    // ОНОВЛЮЄМО СТАН filteredTrains ВІДФІЛЬТРОВАНИМ МАСИВОМ
    setFilteredTrains(filtered);
  };

  // ПОВЕРТАЄМО JSX (HTML-ПОДІБНИЙ КОД) ДЛЯ ВІДОБРАЖЕННЯ НА ЕКРАНІ
  return (
    // ГОЛОВНИЙ КОНТЕЙНЕР ГОЛОВНОЇ СТОРІНКИ
    <div className="home-page">
      
      {/* ===== БЛОК З ЗАГОЛОВКОМ ТА ГАСЛОМ (HERO-SECTION) ===== */}
      <div className="hero-section">
        <h1>🚂 Укрзалізниця</h1>
        <p>Подорожуйте комфортно з національним перевізником</p>
      </div>

      {/* ===== БЛОК З ПОЛЕМ ПОШУКУ ===== */}
      <div className="search-section">
        <div className="search-box">
          
          {/* ПОЛЕ ДЛЯ ВВЕДЕННЯ ТЕКСТУ ПОШУКУ */}
          <input
            type="text"                                          // тип - текст
            placeholder="🔍 Пошук за маршрутом або номером потяга..."  // підказка в полі
            value={searchTerm}                                   // значення прив'язане до стану
            onChange={handleSearch}                              // при зміні викликає пошук
            className="search-input"                             // CSS клас для стилів
          />
          
          {/* КНОПКА ПОШУКУ (зараз без дії, але може бути додана) */}
          <button className="search-btn">Пошук</button>
          
        </div>
      </div>

      {/* ===== ІНФОРМАЦІЯ ПРО КІЛЬКІСТЬ ЗНАЙДЕНИХ ПОТЯГІВ ===== */}
      <div className="results-info">
        <span className="results-count">
          Знайдено: {filteredTrains.length} потягів
        </span>
      </div>

      {/* ===== КОМПОНЕНТ СПИСКУ ПОТЯГІВ ===== */}
      {/* Передаємо два параметри (props):                                  */}
      {/* trains={filteredTrains} - список відфільтрованих потягів         */}
      {/* onSelectTrain={handleSelectTrain} - функція для вибору потяга     */}
      <TrainList 
        trains={filteredTrains} 
        onSelectTrain={handleSelectTrain} 
      />
      
    </div>
  );
}

// ЕКСПОРТУЄМО КОМПОНЕНТ ДЛЯ ВИКОРИСТАННЯ В ІНШИХ ФАЙЛАХ (App.jsx)
export default HomePage;