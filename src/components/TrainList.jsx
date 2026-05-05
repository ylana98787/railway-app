// ІМПОРТУЄМО КОМПОНЕНТ TRAIN CARD
import TrainCard from './TrainCard';

// ІМПОРТУЄМО СТИЛІ ДЛЯ СПИСКУ ПОТЯГІВ
import './TrainList.css';

// КОМПОНЕНТ TRAIN LIST (СПИСОК ПОТЯГІВ)
function TrainList({ trains, onSelectTrain }) {
  
  // Перевіряємо, чи є потяги в масиві
  if (trains.length === 0) {
    return (
      <div className="empty-state">
        🚂 Немає потягів за вашим запитом
      </div>
    );
  }

  // ЯКЩО ПОТЯГИ Є - ПОКАЗУЄМО ЇХ У ВИГЛЯДІ СІТКИ
  return (
    <div className="train-list">
      {trains.map((train) => (
        <TrainCard
          key={train.id}
          train={train}
          onSelect={onSelectTrain}
        />
      ))}
    </div>
  );
}

// ЕКСПОРТУЄМО КОМПОНЕНТ (ПОЗА ФУНКЦІЄЮ!)
export default TrainList;