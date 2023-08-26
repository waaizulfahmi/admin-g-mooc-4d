'use client';

import { useEffect } from 'react';

const DeletAdminNotif = ({ isVisible, handleVisible, time, type, text }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                handleVisible();
            }, time);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, handleVisible, time]);

    if (isVisible) {
        return (
            <div className={`fixed  inset-0 z-30 flex items-center  justify-center bg-black bg-opacity-60 font-monsterrat`}>
                {/* <div className='flex h-[173px] w-[585px] flex-col items-center justify-center gap-[27px] rounded-rad-7 bg-white'>
                    {notifType[type].icon}
                    <p className={`${notifType[type].style} text-body-4 font-bold`}>{text}</p>
                </div> */}

                {/* <div className='h- w-[400]'></div> */}
            </div>
        );
    }
};

export default DeletAdminNotif;
