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

    const option = {
      tooltip: {},
      xAxis3D: {
        name: 'x', //x轴显示为x
        type: 'value',
        // min: 'dataMin',//获取数据中的最值
        // max: 'dataMax'
        min: 0,
        max: 80,
        interval: 20, //坐标轴刻度标签的显示间隔，在类目轴中有效
        axisTick: {
          show: false, //显示每个值对应的刻度
        },
        axisLine: {
          //x轴坐标轴，false为隐藏，true为显示
          show: true,
        },
        axisLabel: {
          show: false, ////是否显示刻度 (刻度上的数字，或者类目)， false为隐藏，true为显示
        },
        itemStyle: {
          borderColor: '#fff',
          backgroundColor: '#fff',
        },
      },
      yAxis3D: {
        name: 'y', //y轴显示为y
        type: 'value',
        splitNumber: 5,
        axisTick: {
          show: false, //显示每个值对应的刻度
        },
        min: 0,
        max: 360,
        interval: 90,
      },
      zAxis3D: {
        name: 'z', //z轴显示为z
        type: 'value',
        min: -20,
        max: 60,
        interval: 20,
        axisTick: {
          show: false, //显示每个值对应的刻度
        },
      },
      grid3D: {
        axisLine: {
          lineStyle: {
            //坐标轴样式
            color: '#070707', //轴线颜色
            opacity: 0.8, //(单个刻度不会受影响)
            width: 1, //线条宽度
          },
        },
        axisPointer: {
          lineStyle: {
            color: '#f00', //坐标轴指示线
          },
          show: false, //不坐标轴指示线
        },
        viewControl: {
          // autoRotate: true,//旋转展示
          // projection: 'orthographic'
          // beta:0,
          distance: 230, //与视角的距离，值越大，图离视角越远，图越小
          alpha: 7, //绕x轴旋转的角度（上下旋转），增大，视角顺时针增大（向上）
          beta: 20, //绕y轴旋转的角度（左右旋转），增大，视角逆时针增大（向右）
          center: [-15, -5, -20], //第一个参数：增大，视角沿x轴正方向水平右移动（图向左）；第二个参数：增大，视角沿y轴正方向垂直向上移动（图向下）；第三个参数：增大，视角向z轴正方向移动（图变小）
        },
        boxWidth: 120,
        boxHeight: 70,
        boxDepth: 120,
        top: -100,
      },

      series: [
        {
          type: 'scatter3D',
          dimensions: [
            'x',
            'y',
            'z', //悬浮到点时弹出的显示框信息
          ],
          // encode: {
          // x: [3, 1, 5],      // 表示维度 3、1、5 映射到 x 轴。
          // y: 1,              // 表示维度 2 映射到 y 轴。
          // z: 3,
          // tooltip:['a','c','b'], // 表示维度 3、2、4 会在 tooltip 中显示。
          // label: 'a'           // 表示 label 使用维度 3。
          // },
          data: [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [0, 1, 1],
            [21, 24, 25],
            [22, 25, 26],
          ],
          symbolSize: 4, //点的大小
          // symbol: 'triangle',
          itemStyle: {
            // borderWidth: 1,
            color: '#87f0e5',
            // borderColor: 'rgba(255,255,255,0.8)'//边框样式
          },
          emphasis: {
            itemStyle: {
              color: '#ccc', //高亮
            },
          },
          // itemStyle: {
          //     color: "#87f0e5"
          // }
        },
      ],
      backgroundColor: '#e8e8e8',
    };
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
        max: 100,
      },
      yAxis3D: {
        name: '维度',
        max: 100,
      },
      zAxis3D: {
        max: 100,
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
          type: 'scatter3D',
          dimensions: [
            'x',
            'y',
            'z', //悬浮到点时弹出的显示框信息
          ],
          // encode: {
          // x: [3, 1, 5],      // 表示维度 3、1、5 映射到 x 轴。
          // y: 1,              // 表示维度 2 映射到 y 轴。
          // z: 3,
          // tooltip:['a','c','b'], // 表示维度 3、2、4 会在 tooltip 中显示。
          // label: 'a'           // 表示 label 使用维度 3。
          // },
          data: [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [0, 1, 1],
            [21, 24, 25],
            [22, 25, 26],
          ],
          symbolSize: 4, //点的大小
          // symbol: 'triangle',
          itemStyle: {
            // borderWidth: 1,
            color: '#87f0e5',
            // borderColor: 'rgba(255,255,255,0.8)'//边框样式
          },
          emphasis: {
            itemStyle: {
              color: '#ccc', //高亮
            },
          },
          // itemStyle: {
          //     color: "#87f0e5"
          // }
        },
      ],
      // series: [
      //   {
      //     //参照平面
      //     type: 'bar3D',
      //     name: 'ground',
      //     itemStyle: {
      //       opacity: 0.1,
      //     },
      //     silent: true,
      //     barSize: [200, 100],
      //     data: [[5, 5, 0.1]],
      //     emphasis: {
      //       label: {
      //         fontSize: 20,
      //         color: '#900',
      //       },
      //       itemStyle: {
      //         color: '#900',
      //       },
      //     },
      //   },
      //   {
      //     type: 'line3D',
      //     name: '1',

      //     lineStyle: {
      //       width: 4,
      //     },

      //     data: data1,
      //   },
      //   {
      //     type: 'line3D',
      //     name: '2',

      //     data: data2,
      //     lineStyle: {
      //       width: 4,
      //     },
      //   },
      //   {
      //     type: 'line3D',
      //     name: '3',

      //     lineStyle: {
      //       width: 4,
      //     },

      //     data: data3,
      //   },
      // ],
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
