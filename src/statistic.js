import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {POINT_VARIABLES} from './Database';
import moment from 'moment';

function offersPrice(point) {
  let offersPriceTemp = 0;
  let arr = Object.keys(point.offers);
  for (let i = 0; i < arr.length; i++) {
    if (point.offers[arr[i]].isChecked) {
      offersPriceTemp += point.offers[arr[i]].price;
    }
  }
  return offersPriceTemp;

}

export function chartConteiner(points) {
  document.querySelector(`.statistic__item--money`)
    .innerHTML = `<canvas class="statistic__money" width="900"></canvas>`;
  document.querySelector(`.statistic__item--transport`)
    .innerHTML = `<canvas class="statistic__transport" width="900"></canvas>`;
  document.querySelector(`.statistic__item--time-spend`)
    .innerHTML = `<canvas class="statistic__time-spend" width="900"></canvas>`;

  const moneyCtx = document.querySelector(`.statistic__money`);
  const transportCtx = document.querySelector(`.statistic__transport`);
  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

  let tempDataIcon = {};
  let labelPoint = [];
  let pricePoint = [];
  let quantityIcon = [];
  let timeShift = [];

  for (let i = 0; i < points.length; i++) {
    let temp = points[i].icon;
    if (tempDataIcon[temp]) {
      tempDataIcon[temp].quantity += 1;
      tempDataIcon[temp].price += +points[i].price + +offersPrice(points[i]);
      tempDataIcon[temp].timeShift += moment(points[i].timeEnd) - moment(points[i].timeStart);
    } else {
      tempDataIcon[temp] = {};
      tempDataIcon[temp].icon = `${POINT_VARIABLES.icon[points[i].icon
        .toLowerCase().split(`-`).join(``)]}${points[i].icon.toUpperCase()}`;
      tempDataIcon[temp].price = +points[i].price + +offersPrice(points[i]);
      tempDataIcon[temp].quantity = 1;
      tempDataIcon[temp].timeShift = moment(points[i].timeEnd) - moment(points[i].timeStart);
    }
  }

  for (let key in tempDataIcon) {
    if (Object.prototype.hasOwnProperty.call(tempDataIcon, key)) {
      labelPoint.push(tempDataIcon[key].icon);
      pricePoint.push(tempDataIcon[key].price);
      quantityIcon.push(tempDataIcon[key].quantity);
      timeShift.push(Math.floor(tempDataIcon[key].timeShift / (60 * 1000 * 60)));

    }
  }

  // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
  const BAR_HEIGHT = 20;
  moneyCtx.height = BAR_HEIGHT * points.length;
  transportCtx.height = BAR_HEIGHT * points.length;
  timeSpendCtx.height = BAR_HEIGHT * points.length;

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labelPoint,
      datasets: [{
        data: pricePoint,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labelPoint,
      datasets: [{
        data: quantityIcon,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  const timeSpendChart = new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labelPoint,
      datasets: [{
        data: timeShift,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  return [moneyChart, transportChart, timeSpendChart];

}
