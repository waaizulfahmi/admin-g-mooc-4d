//core
import PropTypes from 'prop-types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Links = ({ className = 'flex gap-[40px]', links }) => {
    const path = usePathname();

    return (
        <ul className={`${className}`}>
            {links &&
                links.map((link, index) => {
                    return (
                        <li key={index} className='relative'>
                            <Link
                                className={`${
                                    link?.href?.toLowerCase() === path
                                        ? 'text-primary-1 text-opacity-100'
                                        : ' text-black text-opacity-50'
                                } cursor-pointer font-bold`}
                                href={link?.href}>
                                {link?.name}
                            </Link>
                            {link?.href?.toLowerCase() === path && (
                                <div className='absolute left-1/2 h-[10px] w-[10px] translate-x-[-50%] rounded-full bg-secondary-1'></div>
                            )}
                        </li>
                    );
                })}
        </ul>
    );
};

Links.propTypes = {
    links: PropTypes.array,
    className: PropTypes.string,
};

export default Links;
