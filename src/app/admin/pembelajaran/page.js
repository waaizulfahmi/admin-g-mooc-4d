'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';
import { MdDeleteOutline, MdModeEdit, MdSearch } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import FillButton from '@/components/atoms/FillButton';
import BorderedButton from '@/components/atoms/BorderedButton';
import DeletAdminNotif from '@/components/organism/DeletAdminNotif';

const Pembelajaran = () => {
    const [notif, setNotif] = useState(false);

    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);

    const handleNotif = () => setNotif(!notif);
    return (
        <section className='grid h-screen  w-screen grid-cols-12 bg-primary-1 py-[20px]'>
            <div className='relative col-span-2 mx-[40px] '>
                <Image alt='' src={'/images/icon-white.svg'} width={131} height={60} />
                <ul className='mt-[60px] flex flex-col  gap-6'>
                    {navAdmin.length
                        ? navAdmin.map((nav) => (
                              <li
                                  onClick={() => {
                                      dispatch(setActiveMenuId(nav.id));
                                      router.replace('/admin');
                                  }}
                                  key={nav.id}
                                  className='flex cursor-pointer items-center gap-2'>
                                  {activeMenuId === nav.id
                                      ? customNavAdminIcon({ iconName: nav.icon, isActive: true })
                                      : customNavAdminIcon({ iconName: nav.icon, isActive: false })}
                                  <span
                                      className={`${
                                          activeMenuId === nav.id ? 'text-white' : 'text-white opacity-50'
                                      } font-semibold `}>
                                      {nav.path}
                                  </span>
                              </li>
                          ))
                        : null}
                </ul>
                <button
                    type='button'
                    onClick={() => router.replace('/login')}
                    className='absolute bottom-0 flex items-center gap-2 '>
                    <AiOutlinePoweroff className='font-bold text-[#EDF3F3]' />{' '}
                    <span className='block font-semibold text-[#EDF3F3]'>Keluar</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[40px] pt-[30px]'>
                <div className='flex items-center gap-3 '>
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin')}>
                        Admin
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span> <span> List Kelas</span>
                </div>
                <div className='mr-[40px] mt-[10px]'>
                    <div className='flex items-center justify-between '>
                        <h1 className=' text-[30px] font-bold '>List Kelas</h1>
                        <div className='flex items-center gap-4'>
                            <FillButton
                                onClick={() => router.push('/admin/pembelajaran/tambah')}
                                className='flex items-center gap-2 rounded-rad-5 px-[30px] py-[10px]'>
                                <AiOutlinePlus /> Tambah Data
                            </FillButton>
                            <button className='flex items-center gap-2 rounded-rad-5 border border-black px-[20px] py-[10px] font-bold'>
                                <MdSearch className='h-[24px] w-[24px]' />
                                Cari
                            </button>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 pt-3'>
                        <div className='w-max rounded-[6px] border border-black px-2 py-1 font-bold text-black'>
                            <span>Semua</span>
                        </div>
                        <div className='w-max rounded-[6px] border border-black px-2 py-1 font-bold text-black opacity-50'>
                            <span>Mudah</span>
                        </div>
                        <div className='w-max rounded-[6px] border border-black px-2 py-1 font-bold text-black opacity-50'>
                            <span>Menengah</span>
                        </div>
                        <div className='w-max rounded-[6px] border border-black px-2 py-1 font-bold text-black opacity-50'>
                            <span>Sulit</span>
                        </div>
                    </div>
                </div>
                <div
                    style={{ height: 'calc(100vh - 220px)' }}
                    className='mr-[40px] mt-[10px] grid grid-cols-12 gap-[30px] overflow-y-scroll'>
                    <div className='relative col-span-3 h-[400px]   rounded-rad-7  bg-white p-[14px] shadow-lg '>
                        <div className='relative  h-[200px] w-full overflow-hidden rounded-rad-7'>
                            <Image alt='' src={'/images/big-js.svg'} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <h1 className='mt-[14px] text-body-2 font-bold'>JavaScript</h1>
                        <div className='mt-[46px] flex items-center gap-[10px]'>
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <span>(10)</span>
                        </div>
                        <div className='absolute bottom-[14px] left-1/2 flex translate-x-[-50%] gap-2'>
                            <button className='flex items-center gap-2 rounded-[4px] bg-primary-1 px-[12px] py-[6px] text-white'>
                                <MdModeEdit />
                                Edit
                            </button>
                            <button
                                onClick={handleNotif}
                                className='flex items-center gap-2 rounded-[4px] bg-alert-1 px-[12px] py-[6px] text-white'>
                                <MdDeleteOutline />
                                Hapus
                            </button>
                        </div>
                    </div>
                    <div className='relative col-span-3 h-[400px]   rounded-rad-7  bg-white p-[14px] shadow-lg '>
                        <div className='relative  h-[200px] w-full overflow-hidden rounded-rad-7'>
                            <Image alt='' src={'/images/typescript.png'} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <h1 className='mt-[14px] text-body-2 font-bold'>TypeScript</h1>
                        <div className='mt-[46px] flex items-center gap-[10px]'>
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                            <span>(10)</span>
                        </div>
                        <div className='absolute bottom-[14px] left-1/2 flex translate-x-[-50%] gap-2'>
                            <button className='flex items-center gap-2 rounded-[4px] bg-primary-1 px-[12px] py-[6px] text-white'>
                                <MdModeEdit />
                                Edit
                            </button>
                            <button
                                onClick={handleNotif}
                                className='flex items-center gap-2 rounded-[4px] bg-alert-1 px-[12px] py-[6px] text-white'>
                                <MdDeleteOutline />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DeletAdminNotif isVisible={notif} handleVisible={handleNotif} time={2000} />
        </section>
    );
};

export default Pembelajaran;
