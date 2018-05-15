import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var SampleData = {
  'chartData': [
    { name: 14, y: 2 },
    { name: 15, y: 4 },
    { name: 15, y: 6 },
    { name: 20, y: 8 },
    { name: 15, y: 10 },
  ],
  'data': [
        {name: 'January', 'Net Profit': 4000, 'Our Money': 1000, 'Opponent Money': 5000, 'Opponent Success': 5000},
        {name: 'February', 'Net Profit': 8000, 'Our Money': 2000, 'Opponent Money': 4000, 'Opponent Success': 4000},
        {name: 'March', 'Net Profit': 16000, 'Our Money': 4000, 'Opponent Money': 3000, 'Opponent Success': 3000},
        {name: 'April', 'Net Profit': 32000, 'Our Money': 8000, 'Opponent Money': 2000, 'Opponent Success': 2000},
        {name: 'May', 'Net Profit': 64000, 'Our Money': 16000, 'Opponent Money': 1500, 'Opponent Success': 1000},
        {name: 'June', 'Net Profit': 128000, 'Our Money': 32000, 'Opponent Money': 1000, 'Opponent Success': 1000},

  ],
  'data01': [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                    {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                    {name: 'Group E', value: 278}, {name: 'Group F', value: 189}],
  'data02': [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                    {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                    {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}],
  'data03': [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}],
   'COLORS' : ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
   'BLUE_COLORS' : ['#004e63', '#006e8c', '#00b8e6', '#4dd7fa'],
   'RED_COLORS' : ['#990000', '#ff1a1a', '#ff8080', '#ffe6e6'],
   'PINK_COLORS' : ['#99004d', '#d147a3', '#ff80bf', '#ffb3e6'],
   'RADIAN' : Math.PI / 180,

};
export default SampleData;
