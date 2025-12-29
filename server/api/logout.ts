export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const refreshToken = body?.refreshToken
    
    if (!refreshToken) {
      console.log('[Logout API] No refresh token provided')
      return { success: false, error: 'No refresh token' }
    }
    
    console.log('[Keycloak Logout] Starting logout process...')
    // Use issuer as-is (already configured with host.docker.internal)
    const issuerUrl = process.env.KEYCLOAK_ISSUER as string
    const logoutUrl = `${issuerUrl}/protocol/openid-connect/logout`
    
    console.log(`[Keycloak Logout] Logout URL: ${logoutUrl}`)
    
    const logoutBody = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID as string,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      refresh_token: refreshToken,
    })
    
    const response = await fetch(logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: logoutBody.toString(),
    })
    
    console.log(`[Keycloak Logout] Response status: ${response.status}`)
    
    if (!response.ok) {
      const text = await response.text()
      console.error(`[Keycloak Logout] Failed:`, text)
      return { success: false, error: text }
    } else {
      console.log('[Keycloak Logout] Success')
      return { success: true }
    }
  } catch (error) {
    console.error('[Keycloak Logout] Error:', error)
    return { success: false, error: String(error) }
  }
})
