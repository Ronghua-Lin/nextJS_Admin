import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/app/lib/models";
import bcrypt from "bcrypt";
import { dbConnect } from "@/app/lib/utils";
import { redirect } from 'next/navigation'

interface credentialType {
  username: string;
  password: string;
}
const login = async (credentials: credentialType) => {
  try {
    await dbConnect();
    
    const user = await User.findOne({ username: credentials.username });
    console.log("check login",user,credentials)
    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    console.log("check password",credentials.password,user.password)
    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    throw new Error("Failed to login!");
  }
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
     
          const user = await login(credentials as credentialType);
          return user;
        } catch (error) {
          return null
        }
      },
     
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },

  
};
