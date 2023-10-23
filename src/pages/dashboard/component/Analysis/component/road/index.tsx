import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';
import 'echarts-gl';
const RadarChart = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('roadDiv');
    const myChart = echarts.init(element);
    const l1 = 2;
    const l2 = 5;
    const l3 = 8;
    const data1 = [
      [0, l1, 2],
      [1, l1, 1],
      [2, l1, 3],
      [3, l1, 4],
      [4, l1, 2],
      [5, l1, 4],
      [6, l1, 1],
      [7, l1, 3],
      [8, l1, 4],
      [9, l1, 1],
      [10, l1, 2],
    ];
    const data2 = [
      [0, l2, 2],
      [1, l2, 3],
      [2, l2, 5],
      [3, l2, 3],
      [4, l2, 5],
      [5, l2, 3],
      [6, l2, 3],
      [7, l2, 5],
      [8, l2, 6],
      [9, l2, 2],
      [10, l2, 1],
    ];
    const data3 = [
      [0, l3, 4],
      [1, l3, 6],
      [2, l3, 5],
      [3, l3, 7],
      [4, l3, 4],
      [5, l3, 8],
      [6, l3, 6],
      [7, l3, 8],
      [8, l3, 6],
      [9, l3, 5],
      [10, l3, 1],
    ];

    //////////////////////
    myChart.setOption({
      //  grid3D
      grid3D: {
        show: true,
        boxWidth: 200,
        boxHeight: 100,
        boxDepth: 100,
        axisLine: {
          lineStyle: {
            color: '#65d5ff',
          },
        },
        axisPointer: {
          show: true,
        },
        splitLine: {
          lineStyle: {
            color: '#65d5ff',
          },
          show: true,
        },

        viewControl: {
          distance: 250,
          alpha: 10,
          beta: 30,
          animation: true,
        },
      },

      // 三维坐标轴
      xAxis3D: {
        name: '经度',
        max: 10,
      },
      yAxis3D: {
        name: '维度',
        max: 10,
      },
      zAxis3D: {
        max: 10,
        name: '高度',
      },
      axisLine: {
        //坐标轴轴线(线)控制
        show: true, //该参数需设为true
        // interval:200,//x,y坐标轴刻度标签的显示间隔，在类目轴中有效。
        lineStyle: {
          //坐标轴样式

          opacity: 1, //(单个刻度不会受影响)
          width: 2, //线条宽度
        },
      },
      tooltip: {},
      series: [
        {
          //参照平面
          type: 'bar3D',
          name: 'ground',
          itemStyle: {
            opacity: 0.1,
          },
          silent: true,
          barSize: [200, 100],
          data: [[5, 5, 0.1]],
          emphasis: {
            label: {
              fontSize: 20,
              color: '#900',
            },
            itemStyle: {
              color: '#900',
            },
          },
        },
        {
          type: 'line3D',
          name: '1',

          lineStyle: {
            width: 4,
          },

          data: data1,
        },
        {
          type: 'line3D',
          name: '2',

          data: data2,
          lineStyle: {
            width: 4,
          },
        },
        {
          type: 'line3D',
          name: '3',

          lineStyle: {
            width: 4,
          },

          data: data3,
        },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // option && myChart.setOption(option);
  };
  useEffect(() => {
    initChart();
  }, []);
  return <div id="roadDiv" className={styles.box} />;
};
export default RadarChart;
