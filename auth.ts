import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, email, credentials }) {
      // `profile` からの URL がないため、`pathname` の取得方法を修正
      const isAuthenticated = !!user; // ユーザーが存在するかどうかで認証状態を判断
      const pathname = "/protected-page"; // 固定のパスや条件に応じて設定

      if (pathname === "/protected-page" && !isAuthenticated) return false;
      return true;
    },

    jwt({ token, trigger, session, account }) {
      if (account) {
        token.id = account.providerAccountId;
      }

      if (trigger === "update") token.name = session.name;
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    maxAge: 600,
  },
});
