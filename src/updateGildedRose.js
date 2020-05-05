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

  if (updatedQuality > 50) {
    return 50;
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
      return recalculateBackstagePassQuality(good, expirationDate
        .diff(dayjs(), 'day'));
    }
    default: {
      return good.quality - (isExpired ? 2 : 0);
    }
  }
}

function recalculateBackstagePassQuality(good, expirationDiff) {
  if (expirationDiff > 10) {
    return good.quality + 1;
  } else if (expirationDiff > 5) {
    return good.quality + 2;
  } else if (expirationDiff > 0) {
    return good.quality + 3;
  } else {
    return 0;
  }
}
