export enum AstronomicalObjects {
  SUN = "SUN",
  MERCURY = "MERCURY",
  VENUS = "VENUS",
  EARTH = "EARTH",
  MARS = "MARS",
  JUPITER = "JUPITER",
  SATURN = "SATURN",
  URANUS = "URANUS",
  NEPTUNE = "NEPTUNE",
  PLUTO = "PLUTO",
  MOON = "MOON"
}

export const DISPLAY_NAMES: Record<AstronomicalObjects, string> = {
  [AstronomicalObjects.SUN]: "Sun",
  [AstronomicalObjects.MERCURY]: "Mercury",
  [AstronomicalObjects.VENUS]: "Venus",
  [AstronomicalObjects.EARTH]: "Earth",
  [AstronomicalObjects.MARS]: "Mars",
  [AstronomicalObjects.JUPITER]: "Jupiter",
  [AstronomicalObjects.SATURN]: "Saturn",
  [AstronomicalObjects.URANUS]: "Uranus",
  [AstronomicalObjects.NEPTUNE]: "Neptune",
  [AstronomicalObjects.PLUTO]: "Pluto",
  [AstronomicalObjects.MOON]: "Moon",
};

export const EQUITORIAL_RADI_KILOMETERS_EQUAL: Record<AstronomicalObjects, number> = {
  [AstronomicalObjects.SUN]: 10,
  [AstronomicalObjects.MERCURY]: 5,
  [AstronomicalObjects.VENUS]: 5,
  [AstronomicalObjects.EARTH]: 5,
  [AstronomicalObjects.MARS]: 5,
  [AstronomicalObjects.JUPITER]: 5,
  [AstronomicalObjects.SATURN]: 5,
  [AstronomicalObjects.URANUS]: 5,
  [AstronomicalObjects.NEPTUNE]: 5,
  [AstronomicalObjects.PLUTO]: 5,
  [AstronomicalObjects.MOON]: 2
};

export const EQUITORIAL_RADI_KILOMETERS_REALISTIC: Record<AstronomicalObjects, number> = {
  [AstronomicalObjects.SUN]: 695,
  [AstronomicalObjects.MERCURY]: 2.4397,
  [AstronomicalObjects.VENUS]: 6.0518,
  [AstronomicalObjects.EARTH]: 6.3781,
  [AstronomicalObjects.MARS]: 3.3962,
  [AstronomicalObjects.JUPITER]: 71.492,
  [AstronomicalObjects.SATURN]: 60.268,
  [AstronomicalObjects.URANUS]: 25.559,
  [AstronomicalObjects.NEPTUNE]: 24.764,
  [AstronomicalObjects.PLUTO]: 1.1883,
  [AstronomicalObjects.MOON]: 1.7374
};

export const ROTATION_MINUTES: Record<AstronomicalObjects, number> = {
  [AstronomicalObjects.SUN]: 36072,
  [AstronomicalObjects.MERCURY]: 84450,
  [AstronomicalObjects.VENUS]: 349946,
  [AstronomicalObjects.EARTH]: 1436,
  [AstronomicalObjects.MARS]: 1477,
  [AstronomicalObjects.JUPITER]: 596,
  [AstronomicalObjects.SATURN]: 639,
  [AstronomicalObjects.URANUS]: 1034,
  [AstronomicalObjects.NEPTUNE]: 967,
  [AstronomicalObjects.PLUTO]: 9197,
  [AstronomicalObjects.MOON]: 39343
};

export const SUN_ORBIT_DURATION_MINUTES = {
  [AstronomicalObjects.MERCURY]: 126676,
  [AstronomicalObjects.VENUS]: 323568,
  [AstronomicalObjects.EARTH]: 525960,
  [AstronomicalObjects.MARS]: 989251,
  [AstronomicalObjects.JUPITER]: 6242514,
  [AstronomicalObjects.SATURN]: 15500087,
  [AstronomicalObjects.URANUS]: 44219318,
  [AstronomicalObjects.NEPTUNE]: 86706432,
  [AstronomicalObjects.PLUTO]: 130453946
};