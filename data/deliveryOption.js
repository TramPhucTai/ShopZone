import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  const deliveryDate = isWeekend(deliveryOption.deliveryDays)

  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

function isWeekend(deliveryDays) {
  let deliveryDate = dayjs();
  let formatDate;
  let i = 0;

  while (i < deliveryDays) {
    deliveryDate = deliveryDate.add(1, 'days');

    formatDate = deliveryDate.format('dddd');

    if (formatDate !== 'Saturday' && formatDate !== 'Sunday') {
      i++;
    } 
  }

  return deliveryDate;
};
