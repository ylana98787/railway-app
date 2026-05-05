import { useState } from 'react';
import TrainList from '../components/TrainList';
import { trains } from '../data/trains';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrains, setFilteredTrains] = useState(trains);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = trains.filter(train => 
      train.route.toLowerCase().includes(term) ||
      train.number.toLowerCase().includes(term)
    );
    setFilteredTrains(filtered);
  };

  const handleSelectTrain = (train) => {
    alert(`Ви обрали потяг №${train.number}\nМаршрут: ${train.route}\nЦіна: ${train.price} грн`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🚂 Укрзалізниця</h1>
        <p>Подорожуйте комфортно з національним перевізником</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Пошук за маршрутом або номером потяга..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="search-btn">Пошук</button>
        </div>
      </div>

      <div className="results-info">
        <span className="results-count">Знайдено: {filteredTrains.length} потягів</span>
      </div>

      <TrainList trains={filteredTrains} onSelectTrain={handleSelectTrain} />
    </div>
  );
}

export default HomePage;