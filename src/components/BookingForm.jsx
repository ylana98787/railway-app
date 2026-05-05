// Імпортуємо хук useState з React для керування станом форми
import { useState } from 'react';

// Імпортуємо CSS-стилі для компонента форми бронювання
import './BookingForm.css';

// Оголошуємо функціональний компонент BookingForm, який приймає три пропси:
// - onSubmit: функція для відправки даних форми (викликається після валідації)
// - selectedSeats: масив вибраних користувачем місць
// - totalPrice: загальна вартість бронювання (ціна вагона * кількість місць)
function BookingForm({ onSubmit, selectedSeats, totalPrice }) {
  // Створюємо стан для даних форми (початкові значення - порожні рядки)
  const [formData, setFormData] = useState({
    name: '',   // Ім'я пасажира
    phone: '',  // Номер телефону
    email: ''   // Електронна пошта
  });
  // Створюємо стан для помилок валідації (початково - порожній об'єкт)
  const [errors, setErrors] = useState({});

  // Функція для валідації даних форми (повертає true, якщо всі поля заповнені правильно)
  const validate = () => {
    // Створюємо порожній об'єкт для збору помилок
    const newErrors = {};
    
    // ========== ВАЛІДАЦІЯ ІМЕНІ ==========
    // Перевіряємо, чи ім'я не складається тільки з пробілів
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";  // Поле порожнє
    } 
    // Перевіряємо, чи довжина імені (без пробілів) не менша за 2 символи
    else if (formData.name.trim().length < 2) {
      newErrors.name = "Ім'я має бути не менше 2 символів";  // Ім'я занадто коротке
    }
    
    // ========== ВАЛІДАЦІЯ ТЕЛЕФОНУ ==========
    // Перевіряємо, чи номер телефону не складається тільки з пробілів
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";  // Поле порожнє
    } 
    // Регулярний вираз для перевірки телефону:
    // ^\+? - опціональний знак плюс на початку
    // [0-9]{10,13} - від 10 до 13 цифр
    // $ - кінець рядка
    // .replace(/\s/g, '') - видаляємо всі пробіли перед перевіркою
    else if (!/^\+?[0-9]{10,13}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Введіть коректний номер телефону";  // Невірний формат
    }
    
   // ========== ВАЛІДАЦІЯ EMAIL ==========
    // Перевіряємо, чи email не складається тільки з пробілів
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";  // Поле порожнє
    } 
    // Регулярний вираз для перевірки email:
    // \S+ - один або більше непробільних символів до @
    // @ - символ @
    // \S+ - один або більше непробільних символів після @
    // \. - крапка
    // \S+ - доменна зона
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введіть коректний email";  // Невірний формат
    }
    
    // Зберігаємо об'єкт з помилками у стан
    setErrors(newErrors);
    // Повертаємо true, якщо об'єкт помилок порожній (немає помилок)
    return Object.keys(newErrors).length === 0;
  };

   // Функція-обробник зміни значень у полях форми
  const handleChange = (e) => {
    // Деструктуризуємо name та value з елемента, який згенерував подію
    const { name, value } = e.target;
    
    // Оновлюємо formData: беремо попередній стан і додаємо/оновлюємо поле з іменем name
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Якщо для цього поля була помилка, очищаємо її
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };


  // Функція-обробник відправки форми
  const handleSubmit = (e) => {
    // Запобігаємо стандартному перезавантаженню сторінки при відправці форми
    e.preventDefault();
    
    // Викликаємо валідацію, і якщо вона успішна (повертає true)
    if (validate()) {
      // Викликаємо функцію onSubmit, передаючи дані форми
      onSubmit(formData);
    }
  };


  // Якщо не вибрано жодного місця (selectedSeats - порожній масив)
  if (selectedSeats.length === 0) {
    return (
      <div className="booking-placeholder">
        ⚠️ Виберіть місця для бронювання
      </div>
    );
  }
  return (
    <div className="booking-form-container">
      <h3>Оформлення бронювання</h3>
      
      <div className="selected-seats-info">
        <span>Обрано місць: {selectedSeats.length}</span>
        <span>Загальна вартість: {totalPrice} грн</span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ім'я *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Іван Петренко"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label>Телефон *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="+380 XX XXX XXXX"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="ivan@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <button type="submit" className="book-btn">
          Підтвердити бронювання
        </button>
      </form>
    </div>
  );
}

export default BookingForm;