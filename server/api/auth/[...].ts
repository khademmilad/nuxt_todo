import { NuxtAuthHandler } from '#auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

async function doFinalSignoutHandshake(refreshToken: string) {
  try {
    console.log('[Keycloak Logout] Starting logout process...')
    // Use issuer as-is (already configured with host.docker.internal)
    const issuerUrl = process.env.KEYCLOAK_ISSUER as string
    const logoutUrl = `${issuerUrl}/protocol/openid-connect/logout`
    const clientId = process.env.KEYCLOAK_CLIENT_ID as string
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET as string
    
    console.log(`[Keycloak Logout] Logout URL: ${logoutUrl}`)
    
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    })
    
    const response = await fetch(logoutUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })
    
    console.log(`[Keycloak Logout] Response status: ${response.status}`)
    
    if (!response.ok) {
      const text = await response.text()
      console.error(`[Keycloak Logout] Failed:`, text)
    } else {
      console.log('[Keycloak Logout] Success')
    }
  } catch (err) {
    console.error('[Keycloak Logout] Error:', err)
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  useSecureCookies: false,
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
  providers: [
    // @ts-expect-error
    KeycloakProvider.default({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      // Use issuer as-is (host.docker.internal works for both container and browser)
      issuer: process.env.KEYCLOAK_ISSUER as string,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
      }
      if (profile) {
        token.profile = profile
      }
      return token
    },
    async session({ session, token }) {
      if (!token || !token.accessToken) {
        return null as any
      }
      // @ts-ignore
      session.accessToken = token.accessToken
      // @ts-ignore
      session.idToken = token.idToken
      // @ts-ignore
      session.refreshToken = token.refreshToken
      // @ts-ignore
      session.profile = token.profile
      return session
    }
  },
  events: {
    async signOut({ token }: any) {
      console.log('[Auth] signOut event')
      if (token?.refreshToken) {
        await doFinalSignoutHandshake(token.refreshToken as string)
      } else {
        console.log('[Auth] No refresh token')
      }
    }
  },
  debug: false,
})
