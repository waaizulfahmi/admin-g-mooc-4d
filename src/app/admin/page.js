'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navAdmin, customNavAdminIcon } from '@/data/nav-path';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveMenuId, adminSlice } from '@/redux/admin';

import { adminGetAllUserApi, adminGetAllClassApi } from '@/axios/admin';

const adminMenu = (idAdminMenu) => {
    switch (idAdminMenu) {
        case 1:
            return 'Semua Siswa';
        case 2:
            return 'Kelas';
        case 3:
            return 'Materi';
        case 4:
            return 'Quiz';
    }
};

const Admin = () => {
    const { setActiveMenuId } = adminSlice.actions;
    const dispatch = useDispatch();
    const activeMenuId = useSelector(getActiveMenuId);
    const { data } = useSession();
    const token = data?.user?.token;
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (token) {
            if (activeMenuId === 1) {
                const fetchApi = async () => {
                    try {
                        const response = await adminGetAllUserApi({ token });
                        setUsers(response.data);
                    } catch (error) {
                        console.log('ADMIN GET ALL USER: ', error.message);
                    }
                };

                fetchApi();
            } else if (activeMenuId === 2) {
                const fetchApi = async () => {
                    try {
                        const response = await adminGetAllClassApi({ token });
                        setClasses(response.data);
                    } catch (error) {
                        console.log('ADMIN GET ALL Class: ', error.message);
                    }
                };

                fetchApi();
            }
        }
    }, [activeMenuId, token]);

    console.log(classes);

    return (
        <section className='grid h-screen  w-screen grid-cols-12 bg-primary-1 py-[20px]'>
            <div className='relative col-span-2 mx-[40px] '>
                <Image alt='' src={'/images/icon-white.svg'} width={131} height={60} />
                <ul className='mt-[60px] flex flex-col  gap-6'>
                    {navAdmin.length
                        ? navAdmin.map((nav) => (
                              <li
                                  onClick={() => dispatch(setActiveMenuId(nav.id))}
                                  key={nav.id}
                                  className='flex cursor-pointer items-center gap-2'>
                                  {activeMenuId === nav.id
                                      ? customNavAdminIcon({ iconName: nav.icon, isActive: true })
                                      : customNavAdminIcon({ iconName: nav.icon, isActive: false })}
                                  <span className={`${activeMenuId === nav.id ? 'text-white' : ''} font-bold `}>{nav.path}</span>
                              </li>
                          ))
                        : null}
                </ul>
                <button
                    type='button'
                    onClick={() => router.replace('/login')}
                    className='absolute bottom-0 flex  items-center gap-2 '>
                    <AiOutlinePoweroff className='font-bold text-[#EDF3F3]' />{' '}
                    <span className='block font-semibold text-[#EDF3F3]'>Log Out</span>
                </button>
            </div>
            <div className='col-span-10  rounded-bl-[28px] rounded-tl-[28px] bg-[#EDF3F3] pl-[40px] pt-[30px]'>
                <h1 className='text-[40px] font-bold leading-[50px] '>Dashboard</h1>
                <p className='text-[16px] font-semibold '>{adminMenu(activeMenuId)}</p>
                {activeMenuId === 1 ? (
                    <div
                        style={{ height: 'calc(100vh - 200px)' }}
                        className='mr-[40px] mt-[20px] overflow-x-auto overflow-y-scroll rounded-[28px]  bg-white '>
                        <table className=' w-full  text-left '>
                            <thead className='sticky top-0   border-b border-gray-400  bg-gray-50 font-bold text-black'>
                                <tr>
                                    <th scope='col' className='px-6 py-4'>
                                        No
                                    </th>
                                    <th scope='col' className='px-6 py-4'>
                                        Nama
                                    </th>
                                    <th scope='col' className='px-6 py-4'>
                                        Email
                                    </th>
                                    <th scope='col' className='px-6 py-4'>
                                        Foto
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    ? users.map((user) => (
                                          <tr key={user.id_user} className='border-b border-gray-400 '>
                                              <th scope='row' className='whitespace-nowrap px-6 py-4  font-medium text-black'>
                                                  {user.id_user}
                                              </th>
                                              <td className='px-6 py-4 font-medium text-black'>{user.name}</td>
                                              <td className='px-6 py-4  font-medium text-black'>{user.email}</td>
                                              <td className='px-6 py-4  font-medium text-black'>tidak ada</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                ) : activeMenuId === 2 ? (
                    <div style={{ height: 'calc(100vh - 200px)' }} className='mr-[40px] mt-[20px] bg-red-500'>
                        <h1>Ada Kelas</h1>
                    </div>
                ) : activeMenuId === 3 ? (
                    <div style={{ height: 'calc(100vh - 200px)' }} className='mr-[40px] mt-[20px] bg-yellow-500'>
                        <h1>Ada Materi</h1>
                    </div>
                ) : activeMenuId === 4 ? (
                    <div style={{ height: 'calc(100vh - 200px)' }} className='mr-[40px] mt-[20px] bg-green-500'>
                        <h1>Ada Quiz</h1>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Admin;
