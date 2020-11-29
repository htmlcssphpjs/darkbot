//npm install node-telegram-bot-api
// Подключаем библиотеку для работы с Telegram API в переменную
var TelegramBot = require('node-telegram-bot-api');
var player = 0;
// Устанавливаем токен, который выдавал нам бот
var token = '1440357119:AAH6Z-BDOoY-5ZnipC7rONo8c-lGHu4VEwI';
var bot = new TelegramBot(token, { polling: true });
var idAdmin = 1218845111;

// Конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Участник', // текст на кнопке
        callback_data: 'user' // данные для обработчика событий
      }
    ],
    [
      {
        text: 'Зритель',
        callback_data: 'looker'
      }
    ],
    [
      {
        text: 'Жури',
        url: 'https://translate.yandex.ru/?lang=ru-en&text=%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%B8%D1%82%D0%B5%2C%20%D0%BC%D0%B5%D1%81%D1%82%D0%B0%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D1%8B' //внешняя ссылка
      }
    ]
  ];

// Обработчик нажатий на клавиатуру
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  let seats;

  if (query.data === 'user') {
    seats = 'user';
    player++;
    if (player < 10) {
      let mest = 10 - player;
      bot.sendMessage(chatId, 'Ты записан!');
      bot.sendMessage(idAdmin, 'Новый участник @' + query.message.chat.username + ' ' + query.message.chat.id + '\nМест осталось ' + mest);
    } else {
      bot.sendMessage(chatId, 'Прости, места заняты');
    }
  }

  if (query.data === 'looker') {
    bot.sendMessage(chatId, 'Жди сообщение о начале!');
    bot.sendMessage(idAdmin, 'Новый зритель @' + query.message.chat.username + ' ' + query.message.chat.id + '\nМест осталось ' + mest);
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, хочешь записаться на на CodeInTheDark?', {
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
  if (chatId == idAdmin) {
    bot.sendMessage(idAdmin, 'Hi admin!');
  } else {
    //
  }
});