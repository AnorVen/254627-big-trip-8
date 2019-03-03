import tripPointRender from './templates/TripPoints';
import filterRender from './templates/Filters';

const POINT_VARIABLES = {
  icon: {
    taxi: `🚕`,
    air: `✈`,
    car: `🚗`,
    hotel: `🏨`,
  },
  title: Math.floor(Math.random() * 201),
  timetable: Math.floor(Math.random() * 201),
  duration: Math.floor(Math.random() * 201),
  price: Math.floor(Math.random() * 201),
  offers: [Math.floor(Math.random() * 201)],
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
const TripDayItems = document.querySelector(`.trip-day__items`);
function filtersRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock += filterRender(arr[i]);
  }
  MainFilter.insertAdjacentHTML(`beforeend`, tempBlock);
  MainFilter.addEventListener(`click`, clickOnFilterHandler);
}
function tasksRender(arr) {
  let tempBlock = ``;
  for (let i = 0; i < arr.length; i++) {
    tempBlock += tripPointRender(arr[i]);
  }
  TripDayItems.insertAdjacentHTML(`beforeend`, tempBlock);
}
function randomPoint({icon, title, ...rest}) {
  TripDayItems.innerHTML = ``;
  let tempBlock = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    tempBlock += tripPointRender({
      icon: icon[Object.keys(icon)[Math.floor(Math.random() * Object.keys(icon).length)]],
      title: title,
      timetable: Math.floor(Math.random() * 201),
      duration: Math.floor(Math.random() * 201),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
  }
  TripDayItems.insertAdjacentHTML(`beforeend`, tempBlock);
}
function clickOnFilterHandler(event) {
  let target = event.target;
  while (target !== MainFilter) {
    if (target.className === `trip-filter__item`) {
      randomPoint(POINT_VARIABLES);
      return;
    }
    target = target.parentNode;
  }
}
window.onload = function () {
  filtersRender(DB.FILTERS_DATA);
  tasksRender(DB.POINTS_DATA);
};
