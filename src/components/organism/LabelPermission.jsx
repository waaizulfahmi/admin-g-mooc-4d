'use client';

//core
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getMicrophoneStatus, checkPermissionSlice } from '@/redux/check-permission';

const LabelPermission = ({ className = 'px-3 py-1' }) => {
    //redux
    const dispatch = useDispatch();
    const micprohoneStatus = useSelector(getMicrophoneStatus);
    const path = usePathname();
    const { setMicrophoneStatus } = checkPermissionSlice.actions;

    //effects
    useEffect(() => {
        const checkPermission = () => {
            navigator.permissions
                .query(
                    // { name: 'camera' }
                    { name: 'microphone' },
                    // { name: 'geolocation' }
                    // { name: 'notifications' }
                    // { name: 'midi', sysex: false }
                    // { name: 'midi', sysex: true }
                    // { name: 'push', userVisibleOnly: true }
                    // { name: 'push' } // without userVisibleOnly isn't supported in chrome M45, yet
                )
                .then(function (permissionStatus) {
                    // setPermissionMic(permissionStatus?.state); // granted, denied, prompt
                    dispatch(setMicrophoneStatus(permissionStatus?.state));
                    permissionStatus.onchange = function () {
                        dispatch(setMicrophoneStatus(this?.state)); // granted, denied, prompt
                    };
                });
        };
        checkPermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [micprohoneStatus]);

    if (micprohoneStatus === 'granted') {
        return (
            <div
                className={`${className} ${
                    path === '/rapor' ? 'bg-white text-primary-1' : 'bg-primary-1 text-white'
                } h-max rounded-rad-3  text-center `}>
                <h1>Mikrofon Aktif</h1>
            </div>
        );
    }

    return (
        <div className={`${className} h-max rounded-rad-3 bg-red-600 text-center text-white`}>
            <h1>Mikrofon mati</h1>
        </div>
    );
};

LabelPermission.propTypes = {
    className: PropTypes.string,
};

export default LabelPermission;
