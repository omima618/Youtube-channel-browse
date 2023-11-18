import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { channelActions } from '../store/youtube';

const Card = ({ video, dragCard, draggedOverCard, onDragHandler }) => {
    const dispatch = useDispatch();
    const [showVideo, setShowVideo] = useState(false);

    const changeNoteHandler = (e) => {
        dispatch(channelActions.addVideoNote({ id: video.id, notes: e.target.value }));
    };

    return (
        <div
            draggable={true}
            onDragStart={() => (dragCard.current = video.order)}
            onDragEnter={() => (draggedOverCard.current = video.order)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={onDragHandler}
            className='flex flex-col cursor-grab w-full min-[500px]:w-[calc((100%_-_2rem)/2)] md:w-[calc((100%_-_4rem)/3)] lg:w-[calc((100%_-_6rem)/4)] overflow-hidden shadow-[0_0_5px_0_#333] rounded-2xl'
        >
            <div
                className='relative w-full aspect-[4/3] cursor-pointer'
                onClick={() => !showVideo && setShowVideo(true)}
            >
                {showVideo ? (
                    <iframe
                        src={video.videoLink}
                        width='100%'
                        height='100%'
                        allow='fullscreen'
                        loading='lazy'
                    ></iframe>
                ) : (
                    <>
                        <img
                            className='w-full h-full'
                            src={video.posterSrc}
                            alt=''
                        />
                        <button className='w-12 h-12 rounded-full bg-[#ffffffc7] flex justify-center items-center absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <svg
                                className='w-6 h-6'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 384 512'
                            >
                                <path
                                    className='fill-red-600'
                                    d='M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z'
                                />
                            </svg>
                        </button>
                    </>
                )}
            </div>
            <div className='p-4 text-white flex-grow flex flex-col justify-between'>
                <h3 className='text-sm md:text-base font-medium mb-4'>{video.title}</h3>
                <textarea
                    className='block w-full min-h-[80px] bg-transparent text-gray-400 outline-none border border-gray-600 p-2 resize-none rounded-md'
                    placeholder='Add notes...'
                    name='video-note'
                    value={video.notes}
                    onChange={changeNoteHandler}
                ></textarea>
            </div>
        </div>
    );
};

export default Card;
