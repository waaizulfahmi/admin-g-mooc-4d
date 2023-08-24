import { MdPeopleAlt, MdLibraryBooks, MdOutlineClass, MdQuiz } from 'react-icons/md';

export const customNavAdminIcon = ({ iconName, isActive = false }) => {
    switch (iconName) {
        case 'MdPeopleAlt':
            return <MdPeopleAlt className={`${isActive ? 'text-white' : ''} h-[38px] w-[38px] `} />;
        case 'MdLibraryBooks':
            return <MdLibraryBooks className={`${isActive ? 'text-white' : ''} h-[38px] w-[38px] `} />;
        case 'MdOutlineClass':
            return <MdOutlineClass className={`${isActive ? 'text-white' : ''} h-[38px] w-[38px] `} />;
        case 'MdQuiz':
            return <MdQuiz className={`${isActive ? 'text-white' : ''} h-[38px] w-[38px] `} />;
    }
};

export const navAdmin = [
    {
        id: 1,
        icon: 'MdPeopleAlt',
        path: 'Semua Siswa',
    },
    {
        id: 2,
        icon: 'MdLibraryBooks',
        path: 'Kelas',
    },
    {
        id: 3,
        icon: 'MdOutlineClass',
        path: 'Materi',
    },
    {
        id: 4,
        icon: 'MdQuiz',
        path: 'Quiz',
    },
];
