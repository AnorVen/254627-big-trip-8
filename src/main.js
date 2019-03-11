import {TripPoint} from './templates/TripPoints';
import filterRender from './templates/Filters';


const POINT_VARIABLES = {
  icon: {
    Taxi: `🚕`,
    Bus: `🚌`,
    Train: `🚂`,
    Ship: `🛳️`,
    Transport: `🚊`,
    Drive: `🚗`,
    Flight: `✈`,
    CheckIn: `🏨`,
    Sightseeing: `🏛️`,
    Restaurant: `🍴`,
  },
  title: [`Taxi to Airport`, `Taxi to Airport`, `Drive to Chamonix`, `Check into a hotel`],
  timestart: Date.now() + 1 + Math.round(Math.random() * 7 * Math.random() * 24 * Math.random() * 60 * 60 * 1000),
  duration: Math.round(Math.random() * 60) * 60 * 1000,
  price: Math.floor(Math.random() * 201),
  offers: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  destination: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  isEdit: false,
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
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      // TODO  duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      duration: Math.round(Math.random() * 60 * 60 * 4 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.floor(Math.random() * 60 * 60 * 4 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    /*  {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.floor(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)
          ]
        ],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },*/
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
  let timeShift = arr[0].timestart;
  for (let i = 0; i < arr.length; i++) {
    let a = new TripPoint(arr[i], timeShift);
    tempBlock += a.render();
    timeShift += arr[i].duration;
  }
  TripDayItems.insertAdjacentHTML(`beforeend`, tempBlock);
}

function randomPoint({icon}) {
  TripDayItems.innerHTML = ``;
  let tempBlock = ``;
  for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
    let a = new TripPoint({
      icon: icon[Object.keys(icon)[Math.floor(Math.random() * Object.keys(icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: Date.now() + Math.round(Math.random() * 2010000),
      duration: Math.round(Math.random() * 60*60*24*1000),
      price: Math.floor(Math.random() * 201),
      offers: [Math.floor(Math.random() * 201), Math.floor(Math.random() * 201)],
    });
    tempBlock += a.render();
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
