import logo from '../assets/logo.svg';

const Header = ({ getChannelVideos }) => {
    const isChannelStored = (channelId) => {
        if (localStorage.getItem('channel')) {
            const channel = JSON.parse(localStorage.getItem('channel'));
            const { id } = channel;
            if (channelId === id) return true;
            return false;
        }
        return false;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isChannelStored(e.target.id.value)) getChannelVideos(e.target.id.value);
    };

    return (
        <header className='w-full py-4 text-white bg-[#070707] z-50 border-b border-gray-800 sticky top-0 start-0'>
            <div className='container mx-auto px-4 flex flex-wrap justify-between items-center gap-2 sm:gap-4'>
                <a
                    href='#'
                    className='text-white w-12 h-8 sm:w-16 sm:h-10'
                >
                    <img
                        className='w-full h-full'
                        src={logo}
                        alt='Logo'
                    />
                </a>
                <form
                    className='relative max-w-[300px] flex-grow border border-gray-700 overflow-hidden rounded-3xl'
                    onSubmit={submitHandler}
                >
                    <input
                        className='w-full outline-0 border-0 text-red-600 text-sm sm:text-base py-2 ps-4 pe-11 bg-transparent'
                        type='text'
                        name='id'
                        id='channel-id'
                        placeholder='Enter Channel Id'
                        required={true}
                    />
                    <button
                        type='submit'
                        className='absolute end-0 top-0 h-full rounded-e flex justify-center items-center px-3 bg-[#ffffff1b] border-s border-gray-600'
                    >
                        <svg
                            className='h-4'
                            viewBox='0 0 512 512'
                        >
                            <path
                                className='fill-red-600'
                                d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
