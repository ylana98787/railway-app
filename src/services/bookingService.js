// КЛЮЧ ДЛЯ ЗБЕРІГАННЯ БРОНЮВАНЬ У LOCALSTORAGE

// Оголошуємо константу, яка міститиме унікальний ключ для доступу до даних у localStorage
const BOOKINGS_KEY = 'railway_bookings';

// ОТРИМАТИ ВСІ ЗБЕРЕЖЕНІ БРОНЮВАННЯ

// Оголошуємо та експортуємо функцію для отримання всіх бронювань
export const getBookings = () => {
  // Намагаємося отримати дані з localStorage за ключем BOOKINGS_KEY
  const saved = localStorage.getItem(BOOKINGS_KEY);
  // Якщо дані існують (saved не null), то перетворюємо JSON-рядок у масив об'єктів,
  // інакше (якщо даних ще немає) повертаємо порожній масив
  return saved ? JSON.parse(saved) : [];
};

// ЗБЕРЕГТИ НОВЕ БРОНЮВАННЯ

// Оголошуємо та експортуємо функцію для збереження нового бронювання
export const saveBooking = (booking) => {
  // Отримуємо всі поточні бронювання, викликаючи функцію getBookings
  const bookings = getBookings();
  // Створюємо новий об'єкт бронювання, розширюючи переданий об'єкт booking
  const newBooking = {
    ...booking, // Копіюємо всі властивості з переданого об'єкта (trainId, wagonNumber, seats, userData)
    id: Date.now(), // Додаємо унікальний ідентифікатор - кількість мілісекунд з 1 січня 1970 року
    bookingDate: new Date().toISOString() // Додаємо поточну дату бронювання в ISO-форматі (наприклад, "2026-05-05T10:30:00.000Z")
  };
  // Додаємо нове бронювання в кінець масиву bookings
  bookings.push(newBooking);
  // Перетворюємо оновлений масив бронювань у JSON-рядок і зберігаємо його в localStorage за ключем BOOKINGS_KEY
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  // Повертаємо щойно створений об'єкт бронювання (з id та датою)
  return newBooking;
};

// ОТРИМАТИ ЗАБРОНЬОВАНІ МІСЦЯ ДЛЯ КОНКРЕТНОГО ПОТЯГА ТА ВАГОНА

// Оголошуємо та експортуємо функцію для отримання всіх зайнятих місць у конкретному вагоні потяга
export const getBookedSeats = (trainId, wagonNumber) => {
  // Отримуємо всі бронювання з localStorage
  const bookings = getBookings();
  // Повертаємо результат обробки масиву бронювань
  return bookings
    // Фільтруємо бронювання: залишаємо тільки ті, де trainId збігається з переданим І номер вагона збігається з переданим
    .filter(booking => booking.trainId === trainId && booking.wagonNumber === wagonNumber)
    // Перетворюємо кожне відфільтроване бронювання на масив місць і об'єднуємо всі ці масиви в один
    // flatMap працює як map(), а потім робить flatten (розгортку) на один рівень
    .flatMap(booking => booking.seats);
};

// ПЕРЕВІРИТИ, ЧИ МІСЦЕ ВІЛЬНЕ

// Оголошуємо та експортуємо функцію для перевірки, чи вільне конкретне місце
export const isSeatAvailable = (trainId, wagonNumber, seatNumber) => {
  // Отримуємо всі зайняті місця у цьому вагоні потяга (масив номерів місць)
  const bookedSeats = getBookedSeats(trainId, wagonNumber);
  // Перевіряємо, чи НЕ міститься переданий номер місця в масиві зайнятих місць
  // Якщо місця немає в масиві - воно вільне (повертаємо true)
  // Якщо місце є в масиві - воно зайняте (повертаємо false)
  return !bookedSeats.includes(seatNumber);
};

// ЗАБРОНЮВАТИ МІСЦЯ

// Оголошуємо та експортуємо функцію для бронювання місць (зручний інтерфейс)
export const bookSeats = (trainId, wagonNumber, seats, userData) => {
  // Створюємо об'єкт бронювання з переданими даними
  const booking = {
    trainId, // Ідентифікатор потяга (наприклад, "041L")
    wagonNumber, // Номер вагона (наприклад, 2)
    seats, // Масив номерів місць для бронювання (наприклад, [15, 16, 17])
    userData, // Об'єкт з даними пасажира/ів (ім'я, телефон, email тощо)
    bookingDate: new Date().toISOString() // Додаємо поточну дату бронювання в ISO-форматі
  };
  // Викликаємо функцію saveBooking, яка збереже це бронювання в localStorage,
  // і повертаємо результат її роботи (щойно створене бронювання з id та датою)
  return saveBooking(booking);
};