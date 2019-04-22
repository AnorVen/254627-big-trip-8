import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {POINT_VARIABLES} from './Database';
import moment from 'moment';
const BAR_HEIGHT = 30;

function calculateOffersPrice(point) {
  let offersPriceTemp = 0;
  let arr = Object.keys(point.offers);
  for (let key of arr) {
    if (point.offers[key].isChecked) {
      offersPriceTemp += point.offers[key].price;
    }
  }
  return offersPriceTemp;

}

export default function renderChartContainer(points) {
  document.querySelector(`.statistic__item--money`)
    .innerHTML = `<canvas class="statistic__money" width="900"></canvas>`;
  document.querySelector(`.statistic__item--transport`)
    .innerHTML = `<canvas class="statistic__transport" width="900"></canvas>`;
  document.querySelector(`.statistic__item--time-spend`)
    .innerHTML = `<canvas class="statistic__time-spend" width="900"></canvas>`;
  handlePointForStatic(points);
}
function handlePointForStatic(points) {
  let tempDataIcon = {};
  let labelPoint = [];
  let pricePoint = [];
  let quantityIcon = [];
  let timeShift = [];

  for (let point of points) {
    let temp = point.icon;
    if (tempDataIcon[temp]) {
      tempDataIcon[temp].quantity += 1;
      tempDataIcon[temp].price += +point.price + +calculateOffersPrice(point);
      tempDataIcon[temp].timeShift += moment(point.timeEnd) - moment(point.timeStart);
    } else {
      tempDataIcon[temp] = {};
      tempDataIcon[temp].icon = `${POINT_VARIABLES.icon[point.icon
        .toLowerCase().split(`-`).join(``)]}${point.icon.toUpperCase()}`;
      tempDataIcon[temp].price = +point.price + +calculateOffersPrice(point);
      tempDataIcon[temp].quantity = 1;
      tempDataIcon[temp].timeShift = moment(point.timeEnd) - moment(point.timeStart);
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
  renderCanvases(points, labelPoint, pricePoint, quantityIcon, timeShift);
}


function renderCanvases(points, labelPoint, pricePoint, quantityIcon, timeShift) {
  const moneyCtxElement = document.querySelector(`.statistic__money`);
  const transportCtxElement = document.querySelector(`.statistic__transport`);
  const timeSpendCtxElement = document.querySelector(`.statistic__time-spend`);

  moneyCtxElement.height = points.length > 7 ? BAR_HEIGHT * points.length : BAR_HEIGHT * 10;
  transportCtxElement.height = points.length > 7 ? BAR_HEIGHT * points.length : BAR_HEIGHT * 10;
  timeSpendCtxElement.height = points.length > 7 ? BAR_HEIGHT * points.length : BAR_HEIGHT * 10;

  const moneyChart = new Chart(moneyCtxElement, {
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

  const transportChart = new Chart(transportCtxElement, {
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
  const timeSpendChart = new Chart(timeSpendCtxElement, {
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
