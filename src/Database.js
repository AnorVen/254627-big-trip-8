import moment from 'moment';
function timeStart() {
  return (Date.now() + 1 + Math.round(Math.random() * 7 * Math.random() * 24 * Math.random() * 60 * 60 * 1000));
}
function duration() {
  return (Math.round(Math.random() * 60) * 60 * 1000);
}


export const POINT_VARIABLES = {
  icon: {
    taxi: `🚕`,
    bus: `🚌`,
    train: `🚂`,
    ship: `🛳️`,
    transport: `🚊`,
    drive: `🚗`,
    flight: `✈`,
    checkin: `🏨`,
    sightseeing: `🏛️`,
    restaurant: `🍴`,
  },
  title: [`Taxi to Airport`, `Taxi to Airport`, `Drive to Chamonix`, `Check into a hotel`],
  timestart: timeStart(),
  timeend: timeStart() + duration(),
  price: Math.floor(Math.random() * 201),
  offers: {
    'add-luggage': {
      title: `Add luggage`,
      isChecked: true,
      price: 30,
    },
    'switch-to-comfort-class': {
      title: `Switch to comfort class`,
      isChecked: true,
      price: 100,
    },
    'add-meal': {
      title: `Add meal`,
      isChecked: false,
      price: 15,
    },
    'choose-seats': {
      title: `Choose seats`,
      isChecked: false,
      price: 5,
    },
  },
  destination: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
};
export const DB = {
  FILTERS_DATA: [
    {
      title: `Everything`,
      checked: true,
    },
    {
      title: `Future`,
      checked: false,
    },
    {
      title: `Past`,
      checked: false,
    },
  ],
  POINTS_DATA: [
    {
      icon: `bus`,
      title: POINT_VARIABLES.title[1],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon: `taxi`,
      title: POINT_VARIABLES.title[0],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: timeStart(),
      duration: moment(Math.round(Math.random() * 60 * 60 * 24 * 1000)).format(`X`),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: timeStart(),
      timeend: timeStart() + duration(),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
  ],
};
