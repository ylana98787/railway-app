import TrainCard from './TrainCard';
import './TrainList.css';

function TrainList({ trains, onSelectTrain }) {
  if (trains.length === 0) {
    return (
      <div className="empty-state">
        🚂 Немає потягів за вашим запитом
      </div>
    );
  }

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

export default TrainList;