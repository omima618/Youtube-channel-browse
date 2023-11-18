import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetVideosByChannelIdQuery, channelActions } from './store/youtube';
import Header from './components/Header';
import Loader from './components/Loader';
import VideosList from './components/VideosList';
import Error from './components/Error';

function App() {
    const dispatch = useDispatch();
    const [trigger, { isFetching, error, data }] = useLazyGetVideosByChannelIdQuery();
    const getChannelVideos = async (id) => {
        await trigger(id);
    };

    useEffect(() => {
        if (data) {
            const channelId = data?.items[0]?.snippet?.channelId;
            const channelTitle = data?.items[0]?.snippet?.channelTitle;
            const videosArr = data?.items?.map((video, i) => ({
                id: video?.id?.videoId,
                order: i,
                title: video?.snippet?.title,
                posterSrc: video?.snippet?.thumbnails?.high?.url,
                notes: '',
                videoLink: `https://www.youtube.com/embed/${video?.id?.videoId}`,
            }));

            dispatch(
                channelActions.setChannel({
                    channel: { id: channelId, title: channelTitle, videos: videosArr },
                    isStored: false,
                })
            );
        }
    }, [data, dispatch]);

    return (
        <>
            <Header getChannelVideos={getChannelVideos} />
            <main className='min-h-[80vh] flex flex-col'>
                {error ? (
                    <Error error={error.data.error} />
                ) : (
                    <>{isFetching ? <Loader /> : <VideosList />}</>
                )}
            </main>
        </>
    );
}

export default App;
