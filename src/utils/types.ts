export type OgPoint = {
  number: string;
  points: number;
};

export type HousePoint = {
  name: string;
  points: number;
};

export type OgPoints = OgPoint[];

export type HousePoints = HousePoint[];

export type TopLeaderboardData = {
  [key: number]: { top3OG: OgPoint[]; topHouse: HousePoint };
};

export type AllLeaderboardData = {
  [key: number]: { topOG: OgPoints; topHouse: HousePoints };
};
