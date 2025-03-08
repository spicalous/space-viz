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

export const DISPLAY_NAMES = {
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

export const EQUITORIAL_RADI_KILOMETERS = {
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

export const ROTATION_MINUTES = {
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