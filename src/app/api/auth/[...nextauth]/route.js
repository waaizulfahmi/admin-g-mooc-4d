import NextAuth from 'next-auth';
// import { loginApi } from '@/axios/auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'arief@gmail.com',
                },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                try {
                    // const response = await loginApi({
                    //     email: credentials.email,
                    //     password: credentials.password,
                    // });
                    // console.log(response.data);

                    // return response.data;

                    const res = await axios.post(
                        'https://nurz.site/api/login',
                        {
                            email: credentials.email,
                            password: credentials.password,
                        },
                        {
                            headers: {
                                accept: '*/*',
                                withCredentials: true,
                                'Content-Type': 'application/json',
                            },
                        },
                    );

                    console.log(res.data.data);
                    return res.data.data;
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        // eslint-disable-next-line no-unused-vars
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
});

export { handler as GET, handler as POST };
