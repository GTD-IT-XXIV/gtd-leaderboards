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
  [key: string]: { top3OG: OgPoint[]; topHouse: HousePoint };
};

export type AllLeaderboardData = {
  [key: string]: { topOG: OgPoints; topHouse: HousePoints };
};
