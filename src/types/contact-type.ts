import { Timestamp } from "firebase/firestore";

export type Contact = {
  data: {
    displayName: string;
    uid: string;
  };
  lastMessage: {
    content: string;
    date: Timestamp | null;
    senderId: string;
  };
};
