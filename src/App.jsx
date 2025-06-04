import React, { useState } from 'react';
import Chart from './components/Chart';
import { salesData, visitsData, revenueData, usersData } from './data/chartData';

function App() {
  const [period, setPeriod] = useState('year');
  const [category, setCategory] = useState('all');
  const [theme, setTheme] = useState('dark');

  const filterData = (data) => {
    const filtered = period === 'year' ? data : { ...data, values: data.values.slice(0, period === 'quarter' ? 3 : 1) };
    return category === 'all' ? filtered : { ...filtered, values: filtered.values.map(v => v * (category === 'high' ? 1.5 : 0.5)) };
  };

  const exportData = () => {
    const csv = `Month,Sales\n${salesData.labels.map((l, i) => `${l},${salesData.values[i]}`).join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard_data.csv';
    a.click();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white' : 'bg-gradient-to-br from-gray-100 via-blue-100 to-white text-gray-900'}`}>
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
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={`p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <option value="year">Год</option>
            <option value="quarter">Квартал</option>
            <option value="month">Месяц</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
          >
            <option value="all">Все категории</option>
            <option value="high">Высокий приоритет</option>
            <option value="low">Низкий приоритет</option>
          </select>
          <button
            onClick={exportData}
            className={`p-2 rounded-lg transition ${theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-green-500 text-white hover:bg-green-400'}`}
          >
            Экспорт данных
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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