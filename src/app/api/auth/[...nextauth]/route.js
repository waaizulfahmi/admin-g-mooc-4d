import NextAuth from 'next-auth';
import { loginApi } from '@/axios/auth';
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
                    const response = await loginApi({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    return response.data;
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

        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
});

export { handler as GET, handler as POST };
