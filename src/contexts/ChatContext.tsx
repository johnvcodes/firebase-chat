import { createContext, ReactNode, useContext, useReducer } from "react";
import { Contact } from "../types/contact-type";
import { useAuth } from "./AuthContext";

type ActionType = {
  type: string;
  payload: Contact;
};

type ChatState = Contact & {
  chatId: string;
};

type ChatContextType = {
  chat: ChatState;
  dispatch: React.Dispatch<ActionType>;
};

const ChatContext = createContext<ChatContextType | null>(null);

const initialState: ChatState = {
  chatId: "",
  data: {
    displayName: "",
    uid: "",
  },
  lastMessage: { content: "", date: null, senderId: "" },
};

export function useChat() {
  const currentChatContext = useContext(ChatContext);

  if (!currentChatContext)
    throw new Error("useChat() must be used within <ChatProvider>!");

  return currentChatContext;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(chatReducer, initialState);

  function chatReducer(state: ChatState, action: ActionType): typeof state {
    if (!user) return state;
    switch (action.type) {
      case "changedChat":
        return {
          data: action.payload.data,
          chatId:
            user.uid > action.payload.data.uid
              ? user.uid + action.payload.data.uid
              : action.payload.data.uid + user.uid,
          lastMessage: action.payload.lastMessage,
        };

      default:
        return state;
    }
  }

  const value = {
    chat: state,
    dispatch: dispatch,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
