import tripPointRender from './templates/TripPoints';
import filterRender from './templates/Filters';

const POINT_VARIABLES = {
  icon: {
    taxi: `🚕`,
    air: `✈`,
    car: `🚗`,
    hotel: `🏨`,
  },
  title: {},
  timetable: {},
  duration: {},
  price: {},
  offers: {},
};
const DB = {
  FILTERS_DATA: [
    {
      TITLE: `Everything`,
      CHECKED: true,
    },
    {
      TITLE: `Future`,
      CHECKED: false,
    },
    {
      TITLE: `Past`,
      CHECKED: false,
    },
  ],
  POINTS_DATA: [
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
    {
      icon: POINT_VARIABLES.icon.taxi,
      title: `Taxi to Airport`,
      timetable: `10:00&nbsp;&mdash; 11:00`,
      duration: `1h 30m`,
      price: `&euro;&nbsp;20`,
      offers: [`Order UBER +&euro;&nbsp;20`, `Upgrade to business +&euro;&nbsp;20`],
    },
  ],
};
const MainFilter = document.querySelector(`.trip-filter`);
const BoardTasks = document.querySelector(`.trip-day__items`);

function filtersRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock += filterRender(arr[i]);
  }
  MainFilter.insertAdjacentHTML(`beforeend`, tempBlock);
 // MainFilter.addEventListener(`click`, clickOnFilterHandler);
}
function tasksRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock += tripPointRender(arr[i]);
  }
  BoardTasks.insertAdjacentHTML(`beforeend`, tempBlock);
}
window.onload = function() {
  console.log(`1`);
  filtersRender(DB.FILTERS_DATA);
  tasksRender(DB.POINTS_DATA);
};
