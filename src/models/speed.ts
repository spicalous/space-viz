
export enum Speed {
  REAL_TIME = "REAL_TIME",
  ONE_MINUTE_PER_SECOND = "ONE_MINUTE_PER_SECOND",
  ONE_HOUR_PER_SECOND = "ONE_HOUR_PER_SECOND",
  ONE_DAY_PER_SECOND = "ONE_DAY_PER_SECOND",
  ONE_WEEK_PER_SECOND = "ONE_WEEK_PER_SECOND",
  TWO_WEEKS_PER_SECOND = "TWO_WEEKS_PER_SECOND",
  FOUR_WEEKS_PER_SECOND = "FOUR_WEEKS_PER_SECOND",
  ONE_YEAR_PER_SECOND = "ONE_YEAR_PER_SECOND",
}

export const SPEED_TO_MS_PER_MS = {
  [Speed.REAL_TIME]: 1000,
  [Speed.ONE_MINUTE_PER_SECOND]: 1000 * 60,
  [Speed.ONE_HOUR_PER_SECOND]: 1000 * 60 * 60,
  [Speed.ONE_DAY_PER_SECOND]: 1000 * 60 * 60 * 24,
  [Speed.ONE_WEEK_PER_SECOND]: 1000 * 60 * 60 * 24 * 7,
  [Speed.TWO_WEEKS_PER_SECOND]: 1000 * 60 * 60 * 24 * 7 * 2,
  [Speed.FOUR_WEEKS_PER_SECOND]: 1000 * 60 * 60 * 24 * 4 * 4,
  [Speed.ONE_YEAR_PER_SECOND]: 1000 * 60 * 60 * 24 * 365
};
