import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.CONNECTOR_EMAIL_SERVER,
         from: process.env.CONNECTOR_EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.CONNECTOR_APPLE_CLIENT_ID,
      clientSecret: {
        appleId: process.env.CONNECTOR_APPLE_CLIENT_ID,
        teamId: process.env.CONNECTOR_APPLE_TEAM_CLIENT_ID,
        privateKey: process.env.CONNECTOR_APPLE_PRIVATE_KEY,
        keyId: process.env.CONNECTOR_APPLE_KEY_CLIENT_ID,
      },
    }),
    */
    {
      id: "google",
      name: "Google",
      type: "oauth",
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: { params: { scope: "openid email profile" } },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
    FacebookProvider({
      clientId: process.env.CONNECTOR_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.CONNECTOR_FACEBOOK_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.CONNECTOR_GITHUB_CLIENT_ID,
      clientSecret: process.env.CONNECTOR_GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.CONNECTOR_GOOGLE_CLIENT_ID,
      clientSecret: process.env.CONNECTOR_GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.CONNECTOR_TWITTER_CLIENT_ID,
      clientSecret: process.env.CONNECTOR_TWITTER_CLIENT_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.CONNECTOR_AUTH0_CLIENT_ID,
      clientSecret: process.env.CONNECTOR_AUTH0_CLIENT_SECRET,
      issuer: process.env.CONNECTOR_AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
