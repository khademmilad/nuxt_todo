import { NuxtAuthHandler } from "#auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"


async function doFinalSignoutHandshake(refreshToken: string) {
    try {
        console.log('Starting logout process ...')
        const issuer = process.env.KEYCLOAK_ISSUER as string
        const clientId = process.env.KEYCLOAK_CLIENT_ID as string
        const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET as string
        const logoutUrl = `${issuer}/protocol/openid-connect/logout`

        console.log('Logout URL:', logoutUrl)
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

        console.log('Logout response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Failed to logout from Keycloak:', errorText)
        } else {
            console.log('Successfully logged out from Keycloak')
        }
    } catch (err) {
        console.error("Error during final signout handshake:", err)
    }
}

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
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
            issuer: process.env.KEYCLOAK_ISSUER as string,
        })
    ],
    callbacks: {
        async jwt({ token, account, profile }: { token: JWT; account: any; profile?: any }) {
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
        async session({ session, token }: { session: Session; token: JWT }) {
            if (!token || !token.accessToken) {
                return session
            }
            (session as any).access_token = token.accessToken;
            (session as any).id_token = token.idToken;
            (session as any).refresh_token = token.refreshToken;
            (session as any).profile = token.profile;
            return session
        }
    },
    events: {
        async signOut({ token }: { token: JWT }) {
            console.log('Sign out event triggered.')
            if (token?.refreshToken) {
                await doFinalSignoutHandshake(token.refreshToken as string)
            } else {
                console.log('No refresh token available for sign out handshake.')
            }
        }
    },
    debug: false
})
