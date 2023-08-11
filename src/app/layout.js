import './globals.css';
import { Montserrat } from 'next/font/google';
import PropTypes from 'prop-types';

const monsterrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-monsterrat',
    weight: ['400', '500', '600', '700'],
});

export const metadata = {
    title: 'VoiceSee',
    description: 'Apps for who have spirit of learning!',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' className={`${monsterrat.variable}`}>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
