import MockDate from 'mockdate';

import updateGildedRose from '../updateGildedRose';

const MOCK_GOODS = [
  {

    name: 'Fake Good1',
    productionDate: '2019-01-01',
    sellIn: 8,
    quality: 10,
  },
  {
    name: 'Fake Good2',
    productionDate: '2019-01-01',
    sellIn: 60,
    quality: 0,
  },
];

beforeEach(() => {
  MockDate.set(new Date('2019-01-10'));
});

afterEach(() => {
  MockDate.reset();
});

test('should return same number of goods', () => {
  expect(updateGildedRose(MOCK_GOODS))
    .toHaveLength(2);
});

test('should double decrease quality when over production date', () => {
  expect(updateGildedRose(MOCK_GOODS)[0].quality)
    .toBe(8);

  MockDate.set(new Date('2019-01-11'));

  expect(updateGildedRose(MOCK_GOODS)[0].quality)
    .toBe(6);
});

test('should quality always greater or equal to 0', () => {
  MockDate.set(new Date('2019-02-23'));

  expect(updateGildedRose(MOCK_GOODS)[0].quality)
    .toBe(0);
});
