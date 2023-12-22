import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'ID', type: 'text' },
        password: { label: 'PW', type: 'password' },
      },
      async authorize(credentials) {
        console.log(credentials);
        const response = await fetch('https://localhost:3005/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: credentials?.username,
            password: credentials?.password,
          })
        });

        const token = await response.json();

        if (!token) {
          return null;
        }
        return token;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      return { ...user, ...token };
    },
    async session({ session, token }) {
      session.user = { accessToken: token.accessToken } as any;
      return session;
    },
  },
})

export { handler as GET, handler as POST };