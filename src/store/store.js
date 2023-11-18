import { configureStore } from "@reduxjs/toolkit";
import { YoutubeApi, channelReducer } from "./youtube";


export const store = configureStore({
  reducer: {
    [YoutubeApi.reducerPath]: YoutubeApi.reducer,
    channel: channelReducer
  },
  middleware: (getDeafultMiddleware) => {
    return getDeafultMiddleware().concat(YoutubeApi.middleware);
  },
});
