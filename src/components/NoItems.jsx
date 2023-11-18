import noVideos from '../assets/no-videos.webp';
import search from '../assets/search.webp';

const NoItems = ({ type }) => {
    return (
        <div className='py-12 flex-grow flex flex-col gap-4 justify-center items-center'>
            <div className='max-w-[80%] aspect-[1/1] w-36'>
                <img
                    className='w-full'
                    src={type === 'noVideos' ? noVideos : search}
                    alt='No Videos Available'
                    loading='lazy'
                />
            </div>
            <p className='text-gray-400 text-center text-xl'>
                {type === 'noVideos'
                    ? 'No videos to show ❗'
                    : 'Enter channel id to browse channel videos'}
            </p>
        </div>
    );
};

export default NoItems;
