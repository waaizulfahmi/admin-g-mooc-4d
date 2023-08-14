import Image from 'next/image';

const MicButton = ({ ...rest }) => {
    return (
        <button
            {...rest}
            className='bg-neutral-5 flex w-max cursor-pointer flex-col items-center gap-[14px] rounded-rad-6 p-[16px] hover:shadow-high'>
            <Image alt='' src={'/images/mic.svg'} width={56} height={56} />
            <h1 className='text-secondary-1 text-center font-bold '>
                Voice Recogniton <br /> Technology
            </h1>
        </button>
    );
};

export default MicButton;
