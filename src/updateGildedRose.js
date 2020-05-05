import dayjs from 'dayjs';

export default function (goods) {
  return goods.map(v => {
    return {
      ...v,
      quality: getQuality(v)
    };
  });
}

function getQuality(good) {
  const updatedQuality = recalculateQuality(good);

  if (updatedQuality < 0) {
    return 0;
  }

  return updatedQuality;
}

function recalculateQuality(good) {
  const expirationDate = dayjs(good.productionDate)
    .add(good.sellIn, 'day');

  const isExpired = dayjs()
    .isAfter(expirationDate, 'day');

  switch (good.name) {
    case 'Backstage pass': {
      return isExpired ? 0 : good.quality + 1;
    }
    default: {
      return good.quality - (isExpired ? 2 : 0);
    }
  }
}
