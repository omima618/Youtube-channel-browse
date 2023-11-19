import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { channelActions } from '../store/youtube';
import Card from './Card';
import Loader from './Loader';
import NoItems from './NoItems';

const VideosList = () => {
    const dispatch = useDispatch();
    const dragCard = useRef(null);
    const draggedOverCard = useRef(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { channel, isLoading } = useSelector((state) => state.channel);

    const refreshVideos = () => {
        setIsRefreshing(true);
        dispatch(
            channelActions.setChannel({ channel: { ...channel, videos: [] }, isStored: true })
        );
        setTimeout(() => {
            dispatch(channelActions.getStoredChannel());
            setIsRefreshing(false);
        }, 500);
    };

    const sortCardsHandler = () => {
        const clonedVideos = JSON.parse(JSON.stringify(channel.videos));
        const movedCard = clonedVideos.splice(dragCard.current, 1)[0];
        clonedVideos.splice(draggedOverCard.current, 0, movedCard);
        clonedVideos.forEach((video, i) => (video.order = i));
        dispatch(
            channelActions.setChannel({
                channel: { ...channel, videos: clonedVideos },
                isStored: false,
            })
        );
    };

    useEffect(() => {
        dispatch(channelActions.getStoredChannel());
    }, [dispatch]);

    if (!channel && !isLoading) return <NoItems type='search' />;

    return (
        <section className='py-8 flex-grow flex flex-col text-white'>
            {isLoading ? (
                <Loader />
            ) : (
                <div className='container flex-grow flex flex-col mx-auto px-4'>
                    <div className='flex flex-wrap justify-between items-start gap-2 mb-8'>
                        <h2 className='text-red-600 text-lg sm:text-2xl font-medium'>
                            {channel?.title}
                        </h2>
                        <button
                            onClick={refreshVideos}
                            disabled={isRefreshing}
                            className={`${
                                isRefreshing
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'opacity-100 cursor-pointer'
                            } flex gap-2 items-center ms-auto border-0 text-sm sm:text-base text-white bg-red-600 px-3 py-1 rounded-3xl`}
                        >
                            <span className='hidden min-[450px]:inline'>Refresh</span>
                            <svg
                                className='h-4'
                                viewBox='0 0 512 512'
                            >
                                <path
                                    className='fill-white'
                                    d='M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z'
                                />
                            </svg>
                        </button>
                    </div>
                    {isRefreshing ? (
                        <Loader />
                    ) : (
                        <>
                            {channel?.videos?.length > 0 ? (
                                <div className='flex flex-wrap gap-8'>
                                    {channel.videos?.map((video, i) => (
                                        <Card
                                            key={`video-${i}-${video.id}`}
                                            video={video}
                                            dragCard={dragCard}
                                            draggedOverCard={draggedOverCard}
                                            onDragHandler={sortCardsHandler}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <NoItems type='noVideos' />
                            )}
                        </>
                    )}
                </div>
            )}
        </section>
    );
};

export default VideosList;
