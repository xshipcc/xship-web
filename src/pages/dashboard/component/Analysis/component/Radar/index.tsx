import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';

const RadarChart = (props: any) => {
  const titleList = [
    { value: '13μg/m³', label: '北向' },
    { value: '12μg/m³', label: '南向' },
    { value: '18μg/m³', label: '东向' },
    { value: '16μg/m³', label: '西向' },
  ];
  const initChart = () => {
    const element = document.getElementById('radarDiv');
    const myChart = echarts.init(element);

    const option = {
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        radius: '55%',
        center: ['50%', '50%'],
        indicator: [
          { name: 'N', max: 10, color: '#ffffff' },
          { name: 'NE', max: 10, color: '#6a7c95' },
          { name: 'E', max: 10, color: '#ffffff' },
          { name: 'SE', max: 10, color: '#6a7c95' },
          { name: 'S', max: 10, color: '#ffffff' },
          { name: 'SW', max: 10, color: '#6a7c95' },
          { name: 'W', max: 10, color: '#ffffff' },
          { name: 'NW', max: 10, color: '#6a7c95' },
        ],
        splitArea: {
          // 坐标轴在 grid 区域中的分隔区域，默认不显示。
          show: true,
          areaStyle: {
            // 分隔区域的样式设置。
            color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
          },
        },
        axisLine: {
          //指向外圈文本的分隔线样式
          lineStyle: {
            color: '#0075e6',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#0075e6', // 分隔线颜色
            width: 2, // 分隔线线宽
          },
        },
      },
      series: [
        {
          name: '',
          type: 'radar',
          symbolSize: 3,
          data: [
            {
              itemStyle: {
                color: '#4077f2',
              },
              areaStyle: {
                normal: {
                  // 单项区域填充样式
                  color: {
                    type: 'linear',
                    x: 1, //右
                    y: 0, //下
                    x2: 1, //左
                    y2: 1, //上
                    colorStops: [
                      {
                        offset: 0,
                        color: 'rgba(0,132,255,0)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,132,255,1)',
                      },
                    ],
                    globalCoord: false,
                  },
                  opacity: 1, // 区域透明度
                },
              },
              value: [8, 10, 5, 4, 2, 5, 4, 2],
            },
          ],
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);
  return (
    <div className={styles.radar}>
      <div
        id="radarDiv"
        className={styles.echartBox}
        style={{ width: '100%', margin: '10px 0px', height: '140px' }}
      />
      <div className={styles.radarTitle}>
        <div className={styles.item}>
          {titleList.map((item: any) => (
            <div key={item.value} className={styles.itemInfo}>
              <div className={styles.itemLeft}>
                <span className={styles.icon} />
                <span>{item.label}</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RadarChart;
