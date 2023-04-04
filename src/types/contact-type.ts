import { Timestamp } from "firebase/firestore";

export type Contact = {
  data: {
    displayName: string;
    uid: string;
  };
  lastMessage: string;
  date: Timestamp;
};
