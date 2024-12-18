// export interface EventModel {
//   __v: number;
//   _id: string;
//   authorId: string;
//   categories: string;
//   createdAt: string;
//   description: string;
//   endAt: number;
//   locationAddress: string;
//   locationTitle: string;
//   photoUrl: string;
//   position: Position;
//   price: string;
//   date: number;
//   startAt: number;
//   title: string;
//   updatedAt: string;
//   users: string[];
//   followers?: string[];
//   joined: string[];
// }

// export interface Position {
//   _id: string;
//   lat: number;
//   long: number;
// }

export interface EventModel {
  fire_detected : boolean;
  image_url: string;
  area: string;
  parkinglot_counts: ParkinglotCount[];
  timestamp: string
}

export interface ParkinglotCount {
  class: string
  count: number
}