import dayjs from 'dayjs';

export default function (goods) {
  return goods.map(v => {
    const expirationDate = dayjs(v.productionDate)
      .add(v.sellIn, 'day');

    const qualityDowngrade = dayjs()
      .diff(expirationDate, 'day') * 2;
    return {
      ...v,
      quality: v.quality - qualityDowngrade
    };
  });
}
