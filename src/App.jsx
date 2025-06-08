// FIXME: Неиспользуемый импорт React.
import React, { useState } from 'react';
import Chart from './components/Chart';
import { salesData, visitsData, revenueData, usersData } from './data/chartData';

function App() {
  const [period, setPeriod] = useState('year');
  const [category, setCategory] = useState('all');
  /*
    Попробуй реализовать theme через matchMedia

    Посмотри в сторону стейт менеджеров или Context

    ** Можно добавить addEventListener на "change"
    example:
      matchMedia("(prefers-color-scheme: dark)")
   */
  const [theme, setTheme] = useState('dark');

  
  // Можно вынести в отдельный файл, например в utilities.js и там экспортировать все вспомогательные функции
  // Хорошим кейсом будет, если всю бизнес-логику приложения выносить из приложения, по возможности
  const filterData = (data) => {
    const filtered = period === 'year' ? data : { ...data, values: data.values.slice(0, period === 'quarter' ? 3 : 1) };
    return category === 'all' ? filtered : { ...filtered, values: filtered.values.map(v => v * (category === 'high' ? 1.5 : 0.5)) };
  };

  /*
    1. В компоненте остаётся только логика UI
    2. Функции можно использовать в других местах
    3. Функции легче покрыть тестами
    4. UI и логика больше не смешаны (Разделение ответственности)
  */
  
  // Сделано хорошо.
  // Можно вынести в отдельный файл, например в utilities.js и там экспортировать все вспомогательные функции
  // Хорошим кейсом будет, если всю бизнес-логику приложения выносить из приложения, по возможности
  const exportData = () => {
    const csv = `Month,Sales\n${salesData.labels.map((l, i) => `${l},${salesData.values[i]}`).join('\n')}`;
    // Нет указания кодировки. Текст и данные будут экспортироваться битые.
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_data.csv';
    a.click();
  };

  return (
    // Сделано хорошо.
    // TODO:[Start] Условные конструкции в стилях лучше оформлять в библиотеке classNames [https://www.npmjs.com/package/classnames]
    // Так как используется tailwindcss, то для мерджа классов можно использовать библиотеку tailwind-merge [https://www.npmjs.com/package/tailwind-merge]
    /*
      1. Условие theme === 'dark' ? ... : ... в строке классов становится сложным, громоздким и плохо читаемым при увеличении количества условий.
      2. Классы могут конфликтовать или дублироваться (например, text-white и text-gray-900).
      3. Неудобно масштабировать, поддерживать и переиспользовать.
    */
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white' : 'bg-gradient-to-br from-gray-100 via-blue-100 to-white text-gray-900'}`}>
    {/* TODO:[End] */}
    {/* TODO:[Start] Header лучше вынести в отдельный компонент, так код будет выглядеть чище и зона ответственности внутри компонента будет инкапсулирована */}
      <header className={`p-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-yellow-300' : 'text-gray-800'}`}>
              Аналитический Дашборд
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Ключевые метрики за 2025 год
            </p>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full transition ${theme === 'dark' ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
            >
            {/* Используй svg, а не эмодзи */}
            {/* 
              Эмодзи имеет ряд недостатков:
                  1. Отображение зависит от ОС и шрифта
                  2. Не настраивается (цвет, размер детально)
                  3. Нестабильные и ограниченные
            */}
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      {/* TODO:[End] */}
      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
      {/* TODO:[Start] Создай один универсальный компонент Select, который будет принимать данные и callback onChange */}
      {/* 
        1. Избавишься от дублирования кода
        2. Повысишь читаемость и масштабируемость
        3. Облегчишь повторное использование с другими наборами опций
      */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={`p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <option value="year">Год</option>
            <option value="quarter">Квартал</option>
            <option value="month">Месяц</option>
          </select>
      {/* TODO:[End] */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <option value="all">Все категории</option>
            <option value="high">Высокий приоритет</option>
            <option value="low">Низкий приоритет</option>
          </select>
      {/* TODO:[Start] Стилизованную кнопку тоже нужно будет вынести */}
      {/* 
        1. Избавишься от дублирования кода
        2. Повысишь читаемость и масштабируемость
        3. Облегчишь повторное использование с другими наборами опций
      */}
          <button
            onClick={exportData}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-500 text-white hover:bg-green-400'}`}
            >
            Экспорт данных
          </button>
      {/* TODO:[End] */}
        </div>
        {/* 
          Как-будто эта обёртка больше относиться к компоненту chart. Почему бы не вынести её туда.
            <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition  ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
              Продажи
            </h2>
            <Chart type="bar" data={filterData(salesData)} theme={theme} />
          </div>
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
              Посещения
            </h2>
            <Chart type="bar" data={filterData(visitsData)} theme={theme} />
          </div>
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              Доход
            </h2>
            <Chart type="bar" data={filterData(revenueData)} theme={theme} />
          </div>
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-500'}`}>
              Пользователи
            </h2>
            <Chart type="bar" data={filterData(usersData)} theme={theme} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;