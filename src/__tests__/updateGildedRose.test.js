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
  {
    name: 'Backstage pass',
    productionDate: '2019-01-01',
    sellIn: 15,
    quality: 1,
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
    .toHaveLength(3);
});

test('should double decrease quality when over production date', () => {
  const result1 = updateGildedRose(MOCK_GOODS);

  expect(result1[0].quality)
    .toBe(8);

  MockDate.set(new Date('2019-01-11'));

  expect(updateGildedRose(result1)[0].quality)
    .toBe(6);
});

test('should quality always greater or equal to 0', () => {
  MockDate.set(new Date('2020-02-23'));

  expect(updateGildedRose(MOCK_GOODS)[1].quality)
    .toBe(0);
});

test('should increase quality for Backstage pass when close to show day', () => {
  MockDate.set(new Date('2019-01-3'));

  expect(updateGildedRose(MOCK_GOODS)[2].quality)
    .toBe(2);
});


test('should increase quality for Backstage pass by two per day when 10 days close to show day', () => {
  MockDate.set(new Date('2019-01-8'));

  expect(updateGildedRose(MOCK_GOODS)[2].quality)
    .toBe(3);
});

test('should increase quality for Backstage pass by 3 per day when 5 days close to show day', () => {
  MockDate.set(new Date('2019-01-11'));

  expect(updateGildedRose(MOCK_GOODS)[2].quality)
    .toBe(4);
});


test('should default quality to 0 for Backstage pass when over show day', () => {
  MockDate.set(new Date('2019-02-11'));

  expect(updateGildedRose(MOCK_GOODS)[2].quality)
    .toBe(0);
});
