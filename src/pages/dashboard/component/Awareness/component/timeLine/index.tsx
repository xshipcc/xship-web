//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-11-01 11:13:44
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\timeLine\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';

const LineChart = (props: any) => {
  const initChart = () => {
    const element = document.getElementById('lineDiv');
    const myChart = echarts.init(element);
    const data: { value: (string | number)[] }[] = [];
    const currentTime = new Date();
    let Hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    function randomData() {
      const value = Math.random() * 10;
      second += 0.5;
      return ['2023-11-1' + ' ' + Hours + ':' + minutes + ':' + second];
    }
    // 7200 一个小时
    for (let i = 0; i < 72; i++) {
      if (i % 120 == 0) minutes += 1;
      if (i % 7200 == 0) minutes = 0;
      if (i % 7200 == 0) Hours += 1;
      if (i % 120 == 0) second = 0;
      data.push(randomData());
    }
    console.log('initChart -> data:', data);

    // const data1 = [
    //   ['2019-11-1 08:00:20', 123],
    //   ['2019-11-1 09:00:20', 55],
    //   ['2019-11-1 11:00:20', 23],
    //   ['2019-11-2 08:00:20', 123],
    //   ['2019-11-2 12:00:20', 552],
    //   ['2019-11-2 15:00:20', 22],
    // ];
    const option = {
      // tooltip: {
      //   title: {
      //     show: false, // 隐藏标题
      //   },
      //   trigger: 'axis',
      //   formatter: function (params: any[]) {
      //     // eslint-disable-next-line no-param-reassign
      //     params = params[0];
      //     const date = new Date(params.name);
      //     return (
      //       date.getDate() +
      //       '/' +
      //       (date.getMonth() + 1) +
      //       '/' +
      //       date.getFullYear() +
      //       ' : ' +
      //       params.value[1]
      //     );
      //   },
      //   axisPointer: {
      //     animation: false,
      //   },
      // },
      //   axisLine: {
      //     lineStyle: {
      //       color: '#050c12',
      //       opacity: 1,
      //     },
      //     show: true,
      //   },
      //   splitLine: {
      //     lineStyle: {
      //       color: '#050c12',
      //       opacity: 1,
      //     },
      //     show: true,
      //   },

      dataZoom: [
        {
          textStyle: {
            color: '#65d5ff',
          },
          type: 'slider',
          show: true,
          height: 15,
          top: 30,
          //   bottom: 10,
          borderColor: 'transparent',
          backgroundColor: '#28679d',
          // 拖拽手柄样式 svg 路径
          handleIcon:
            'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
          handleColor: '#aab6c6',
          handleSize: 15,
          handleStyle: {
            borderColor: '#aab6c6',
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowColor: '#e5e5e5',
          },
          zoomLock: true, //锁定选择的区域，不可以缩放，只能平移。不设置的话直接有默认值就行。
          start: 0, // 缩放范围的起始位置，数值表示对应 x 轴上的索引
          end: 10, // 缩放范围的结束位置，数值表示对应 x 轴上的索引
        },
      ],
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '75%',
        containLabel: true,
      },
      xAxis: {
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#65d5ff',
          },
        },
        splitLine: {
          show: false,
          textStyle: {
            color: '#65d5ff',
          },
        },
        // splitLine: {
        //   show: false,
        // },
      },
      yAxis: {
        show: false,
        splitLine: {
          lineStyle: {
            color: '#65d5ff',
          },
        },
        type: 'value',
        boundaryGap: [0, '100%'],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#65d5ff',
          },
        },
        // splitLine: {
        //   show: false,
        // },
      },
      series: [
        {
          type: 'line',
          data: data,
        },
      ],
    };
    // 绑定 dataZoom 缩放事件
    myChart.on('datazoom', function (params) {
      console.log('datazoom:', params);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    option && myChart.setOption(option);
    setInterval(function () {
      data.shift();
      // console.log('data:', data);
      // data.push(randomData());

      myChart.setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    }, 1000);
  };

  useEffect(() => {
    initChart();
  }, []);
  return <div id="lineDiv" className={styles.timeLine} />;
};
export default LineChart;
