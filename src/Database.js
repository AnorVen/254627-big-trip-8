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
  iconText: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`,
    `checkin`,
    `sightseeing`,
    `sightseeing`,
  ],
  points: [{
    description: `Описание точки`,
    name: `Новая точка`,
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=0.8068905069786614`,
        description: `Chamonix zoo`
      },
      {
        src: `http://picsum.photos/300/200?r=0.5345184311021973`,
        description: `Chamonix biggest supermarket`
      },
      {
        src: `http://picsum.photos/300/200?r=0.14078574715809955`,
        description: `Chamonix city centre`
      },
      {
        src: `http://picsum.photos/300/200?r=0.5745494571635041`,
        description: `Chamonix kindergarten`
      },
      {
        src: `http://picsum.photos/300/200?r=0.9053377256394197`,
        description: `Chamonix parliament building`
      },
      {
        src: `http://picsum.photos/300/200?r=0.1745875758278823`,
        description: `Chamonix central station`
      },
    ]
  }]
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
  SORT_DATA: [
    {
      title: `EVENT`,
      checked: true,
    },
    {
      title: `TIME`,
      checked: false,
    },
    {
      title: `PRICE`,
      checked: false,
    },
    {
      title: `OFFERS`,
      checked: false,
    },
  ],
  NEW_POINT: {
    destination: {
      description: `надо выбрать название точки, изменить время и указать цену`,
      name: `Новая точка`,
      pictures: [],
    },
    type: `taxi`,
    id: `0`,
    is_favorite: false, // eslint-disable-line
    offers: [],
    base_price: `0`, // eslint-disable-line
    date_from: Date.now(), // eslint-disable-line
    date_to: Date.now(), // eslint-disable-line
    title: `Новая точка`
  }
};
