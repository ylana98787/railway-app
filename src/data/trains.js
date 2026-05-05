export const trains = [
  {
    id: 1,
    number: "701К",
    route: "Київ → Харків",
    departure: "2024-12-15T08:30:00",
    arrival: "2024-12-15T14:45:00",
    duration: "6 год 15 хв",
    price: 450,
    carrier: "Укрзалізниця",
    image: "https://images.pexels.com/photos/210541/pexels-photo-210541.jpeg"
  },
  {
    id: 2,
    number: "715Ш",
    route: "Львів → Одеса",
    departure: "2024-12-15T07:15:00",
    arrival: "2024-12-15T17:30:00",
    duration: "10 год 15 хв",
    price: 680,
    carrier: "Укрзалізниця",
    image: "https://www.rbc.ua/static/img/u/n/unian_209348_id15725_650x410_650x410.jpg"
  },
  {
    id: 3,
    number: "743Н",
    route: "Дніпро → Київ",
    departure: "2024-12-15T09:00:00",
    arrival: "2024-12-15T13:30:00",
    duration: "4 год 30 хв",
    price: 380,
    carrier: "Укрзалізниця",
    image: "https://images.pexels.com/photos/710915/pexels-photo-710915.jpeg"
  },
  {
    id: 4,
    number: "102Л",
    route: "Харків → Львів",
    departure: "2024-12-15T22:00:00",
    arrival: "2024-12-16T10:00:00",
    duration: "12 год 00 хв",
    price: 520,
    carrier: "Укрзалізниця",
    image: "https://images.pexels.com/photos/3993430/pexels-photo-3993430.jpeg"
  },
  {
    id: 5,
    number: "801Д",
    route: "Київ → Львів",
    departure: "2024-12-15T06:00:00",
    arrival: "2024-12-15T10:30:00",
    duration: "4 год 30 хв",
    price: 890,
    carrier: "Укрзалізниця",
    image: "https://tse2.mm.bing.net/th/id/OIP.mCSStvzHD9Ytd-50OvhJ0gHaEU?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    id: 6,
    number: "705Ч",
    route: "Одеса → Дніпро",
    departure: "2024-12-15T08:45:00",
    arrival: "2024-12-15T17:15:00",
    duration: "8 год 30 хв",
    price: 420,
    carrier: "Укрзалізниця",
    image: "https://transferodessa.com/img/blog/xtaks-odiesa-dn-pro-kishin-v-odiesa-zamovliennia-taks-m-zhm-sto-onlain.jpg.pagespeed.ic.kofWaiKFeL.jpg"
  }
];

// Форматування дати
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    time: date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
    date: date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
  };
};