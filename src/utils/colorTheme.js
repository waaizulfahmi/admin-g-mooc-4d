export const colorTheme = (path) => {
    switch (path) {
        case '/':
            return 'bg-white';
        case '/kelas':
            return 'bg-[#F5F5F5]';
        default:
            return 'bg-primary-1';
    }
};
