const Error = ({ error }) => {
    return (
        <div className='flex-grow flex flex-col justify-center items-center gap-6 px-4'>
            <h3 className='text-xl sm:text-2xl md:text-3xl font-medium text-center text-red-600'>
                ERROR {error.code} ({error.status})
            </h3>
            <p className='text-base sm:text-lg md:text-xl text-center text-white'>
                {error.message}
            </p>
            <button
            onClick={()=> window.location.reload()}
                className='flex gap-2 items-center border-0 text-base sm:text-lg text-white bg-red-600 px-8 py-2 rounded-3xl'>
                Refresh
            </button>
        </div>
    );
};

export default Error;
