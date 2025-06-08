import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const Chart = ({ type, data, theme }) => {
  const chartRef = useRef(null);

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      textStyle: { color: theme === 'dark' ? '#fff' : '#000' },
      formatter: '{b}<br/>{c}'
    },
    xAxis: {
      type: 'category',
      data: data.labels,
      axisLabel: { color: theme === 'dark' ? '#d1d5db' : '#374151' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme === 'dark' ? '#d1d5db' : '#374151' }
    },
    series: [
      {
        data: data.values,
        type: type,
        barWidth: '20%',
        itemStyle: {
          // Цвета можно вынести в константу
          color: params => ['#10b981', '#ef4444', '#8b5cf6', '#f97316'][params.dataIndex % 4],
          borderRadius: [5, 5, 0, 0]
        },
        animationDuration: 1000,
        animationEasing: 'bounceIn'
      }
    ],
    grid: { left: '10%', right: '10%', bottom: '15%' },
    backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb'
  };

  useEffect(() => {
    // Сделано хорошо.
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <ReactECharts ref={chartRef} option={option} style={{ height: '350px' }} />;
};

export default Chart;