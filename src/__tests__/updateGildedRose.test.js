import updateGildedRose from '../updateGildedRose';

const MOCK_GOODS = [
  {
    name: 'Fake Good1',
    productionDate: '2019-01-01',
    sellIn: 60,
    quality: 0,
  },
  {
    name: 'Fake Good2',
    productionDate: '2019-01-01',
    sellIn: 60,
    quality: 0,
  },
];

test('should return same number of goods', () => {
  expect(updateGildedRose(MOCK_GOODS))
    .toHaveLength(2);
});
