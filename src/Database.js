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
      base_price: 1100,
      date_from: 1554565793332,
      date_to: 1554650059890,
      destination: {
        description: `Berlin, with a beautiful old town, for those who value comfort and coziness.`,
        name: `Berlin`,
        pictures: [
          {
            src: `http://picsum.photos/300/200?r=0.6523051117485081`,
            description: `Berlin zoo`,
          },
          {
            src: `http://picsum.photos/300/200?r=0.5451715361774769`,
            description: `Berlin street market`,
          },
          {
            src: `http://picsum.photos/300/200?r=0.6804491447406271`, description: `Berlin zoo`
          },
          {
            src: `http://picsum.photos/300/200?r=0.8150529531193353`,
            description: `Berlin central station`,
          },
          {
            src: `http://picsum.photos/300/200?r=0.9044259912844539`, description: `Berlin zoo`
          },
          {
            src: `http://picsum.photos/300/200?r=0.7958295330474146`, description: `Berlin zoo`
          },
          {
            src: `http://picsum.photos/300/200?r=0.7971568801402835`,
            description: `Berlin biggest supermarket`,
          },
        ],
      },
      id: `0`,
      // eslint-disable-next-line
      is_favorite: false,
      offers: [
        {
          title: `Choose the time of check-out`,
          price: 50,
          accepted: false,
        },
        {
          title: `Add breakfast`,
          price: 140,
          accepted: true,
        },
        {
          title: `Order a meal from the restaurant`,
          price: 70,
          accepted: false,
        },
      ],
      type: `check-in`,
    }
  ]
};
