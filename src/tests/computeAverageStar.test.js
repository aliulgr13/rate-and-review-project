import { computeAverageStar } from '../utils/helpers';

describe('computeAverageStar', () => {
  test('compute average', () => {
    // SETUP
    const reviews = [{ star: 1 }, { star: 5 }];

    // EXECUTE
    const average = computeAverageStar(reviews);

    // ASSERT
    expect(average).toBe(3);
  });

  test('compute average when there are no reviews', () => {
    // SETUP
    const reviews = [];

    // EXECUTE
    const average = computeAverageStar(reviews);

    // ASSERT
    expect(average).toBe(0);
  });
});
