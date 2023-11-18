import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

export const YoutubeApi = createApi({
    reducerPath: 'youtube',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.googleapis.com/youtube/v3/',
    }),
    endpoints: (builder) => ({
        getVideosByChannelId: builder.query({
            query: (channelId) =>
                `search?part=snippet&channelId=${channelId}&part=snippet,id&order=date&maxResults=100&key=${
                    import.meta.env.VITE_API_KEY
                }`,
        }),
    }),
});

const initialState = {
    channel: null,
    isLoading: true,
};

const updateLocalStorage = (updetedChannel) => {
    localStorage.removeItem('channel');
    localStorage.setItem('channel', JSON.stringify(updetedChannel));
};

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        getStoredChannel: (state) => {
            if (localStorage.getItem('channel'))
                state.channel = JSON.parse(localStorage.getItem('channel'));
            state.isLoading = false;
        },
        setChannel: (state, action) => {
            state.channel = action.payload.channel;
            if (!action.payload.isStored) updateLocalStorage(state.channel);
            state.isLoading = false;

        },
        addVideoNote: (state, action) => {
            const videoId = action.payload.id;
            const notes = action.payload.notes;
            const videoIndex = state.channel.videos.findIndex((video) => video.id === videoId);
            state.channel.videos[videoIndex].notes = notes;
            updateLocalStorage(state.channel);
        },
    },
});

export const channelActions = channelSlice.actions;
export const channelReducer = channelSlice.reducer;
export const { useLazyGetVideosByChannelIdQuery } = YoutubeApi;
