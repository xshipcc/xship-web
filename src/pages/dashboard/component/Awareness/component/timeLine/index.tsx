//@ts-nocheck
/*
 * @Author: weiaodi 1635654853@qq.com
 * @Date: 2023-10-18 15:51:21
 * @LastEditors: weiaodi 1635654853@qq.com
 * @LastEditTime: 2023-12-07 11:22:24
 * @FilePath: \zero-admin-ui-master\src\pages\dashboard\component\Awareness\component\timeLine\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import styles from './index.less';
import { useSelector, useDispatch } from 'umi';

const LineChart = (props: any) => {
  const client = props.client;
  const currentHistoryData = useSelector((state: any) => state.dashboardModel.currentHistoryData);

  const sendMqttControl = (param: any, type: string, data: any) => {
    let controlInfo = {
      cmd: 'default',
      data: 'on',
    };

    controlInfo = {
      cmd: type + '/' + param,
      data: data,
    };

    console.log('sendMqttControl -> controlInfo:', controlInfo);
    console.log('sendMqttControl -> controlInfo:', JSON.stringify(controlInfo));
    client.current.publish('control', JSON.stringify(controlInfo));
  };

  const initChart = () => {
    const element = document.getElementById('lineDiv');
    const myChart = echarts.init(element);
    let data: { value: (string | number)[] }[] = [];

    function getTimeArray(start, end) {
      const timeArr = [];
      const startTime = new Date(start);
      const endTime = new Date(end);
      let currentTime = startTime;

      while (currentTime <= endTime) {
        // 获取当前时间的小时、分钟、秒
        const hour = currentTime.getHours();
        const minute = currentTime.getMinutes();
        const second = currentTime.getSeconds();

        // 格式化时间
        const timeStr = `${currentTime.getFullYear()}/${
          currentTime.getMonth() + 1
        }/${currentTime.getDate()} ${hour}:${minute < 10 ? '0' + minute : minute}:${
          second < 10 ? '0' + second : second
        }`;

        // 添加到时间数组中
        timeArr.push(timeStr);

        // 将当前时间增加1分钟
        currentTime = new Date(currentTime.getTime() + 60 * 1000);
      }
      console.log('getTimeArray -> timeArr:', timeArr);
      data = timeArr;
      return timeArr;
    }

    // getTimeArray('2023-11-25 00:00:00', '2023-11-25 01:00:00');
    getTimeArray(currentHistoryData.create_time, currentHistoryData.end_time);

    console.log('initChart -> data:', data);

    const option = {
      dataZoom: [
        {
          textStyle: {
            color: '#65d5ff',
          },
          realtime: false,
          type: 'slider',
          show: true,
          height: 15,
          top: 25,
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
          end: 0, // 缩放范围的结束位置，数值表示对应 x 轴上的索引
        },
      ],
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '55%',
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
      sendMqttControl('seek', 'player', params.start);
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
