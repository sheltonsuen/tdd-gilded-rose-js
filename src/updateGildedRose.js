import dayjs from 'dayjs';

export default function (goods) {
  return goods.map(v => {
    const expirationDate = dayjs(v.productionDate)
      .add(v.sellIn, 'day');

    const qualityDowngrade = dayjs()
      .isAfter(expirationDate, 'day') ? 2 : 0;

    const updatedQuality = v.quality - qualityDowngrade;

    return {
      ...v,
      quality: updatedQuality < 0 ? 0 : updatedQuality
    };
  });
}
