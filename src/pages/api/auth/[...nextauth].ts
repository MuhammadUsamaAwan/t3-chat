import NextAuth, { type NextAuthOptions } from 'next-auth';
// import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '../../../server/env';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: {
          label: 'Name',
          type: 'text',
          placeholder: 'Enter your name',
        },
      },
      async authorize(credentials, _req) {
        const user = { id: 1, name: credentials?.name ?? 'J Smith' };
        return user;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
