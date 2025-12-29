import { NuxtAuthHandler } from '#auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error - Use .default for ESM compatibility
    KeycloakProvider.default({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken
      // @ts-ignore
      session.idToken = token.idToken
      // @ts-ignore
      session.profile = token.profile
      return session
    }
  }
})
