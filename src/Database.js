export const POINT_VARIABLES = {
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
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      // TODO  duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
      price: `${Math.floor(Math.random() * 201)}`,
      offers: POINT_VARIABLES.offers,
    },
    {
      icon:
        POINT_VARIABLES.icon[
          Object.keys(POINT_VARIABLES.icon)[
            Math.floor(Math.random() * Object.keys(POINT_VARIABLES.icon).length)]],
      title: POINT_VARIABLES.title[Math.floor(Math.random() * POINT_VARIABLES.title.length)],
      timestart: POINT_VARIABLES.timestart,
      duration: Math.round(Math.random() * 60 * 60 * 24 * 1000),
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
