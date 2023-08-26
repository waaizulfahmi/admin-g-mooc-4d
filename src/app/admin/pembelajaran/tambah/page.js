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

const TambahPembelajaran = () => {
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
                    <span className='block font-semibold text-[#EDF3F3]'>Log Out</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[40px] pt-[30px]'>
                <div className='flex items-center gap-3 '>
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin')}>
                        Admin
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span>{' '}
                    <span className='cursor-pointer font-bold' onClick={() => router.replace('/admin/pembelajaran')}>
                        {' '}
                        List Kelas
                    </span>{' '}
                    <span className='font-bold'>{'>'}</span> <span> Tambah Kelas</span>
                </div>
                {/* <div className='mr-[40px] mt-[10px]'>
                    <div className='flex items-center justify-between '>
                        
                        <div className='flex items-center gap-4'>
                            <FillButton className='flex items-center gap-2 rounded-rad-5 px-[30px] py-[10px]'>
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
                </div> */}
                <div style={{ height: 'calc(100vh - 220px)' }} className='mr-[40px] mt-[40px]  '>
                    <div className='w-max rounded-[28px] bg-white px-[54px] py-[40px] drop-shadow'>
                        <h1 className='text-[20px] font-bold leading-[20px]'>Tambah Kelas</h1>
                        <form className='mt-[20px] flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Nama Kelas <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Deskripsi <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Nama Materi <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor=''>
                                    Link <span className='text-alert-1'>*</span>
                                </label>
                                <input
                                    type='text'
                                    className='w-full cursor-pointer appearance-none rounded-[10px]   bg-[#EDF3F3] py-1 font-monsterrat outline-none'
                                />
                                <span className='text-[12px] font-bold'>Tambah Materi+</span>
                            </div>
                            <div className='mt-[10px] flex items-center justify-center'>
                                <button
                                    type='submit'
                                    className='w-max    rounded-[10px] bg-primary-1  px-[40px] py-[8px] font-bold text-white'>
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <DeletAdminNotif isVisible={notif} handleVisible={handleNotif} time={2000} />
        </section>
    );
};

export default TambahPembelajaran;
