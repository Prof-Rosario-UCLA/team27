import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { client, getDB } from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
  ],
  secret: process.env.AUTH_GOOGLE_SECRET || "",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
      }
      return session;
    },

    async signIn({ user }) {
      const db = await getDB();

      const existingUser = await db
        .collection("users")
        .findOne({ email: user.email });

      if (existingUser) {
        console.log("User login:", user.email);
      }

      return true;
    },
  },
};