export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const refreshToken = body?.refreshToken
    if (!refreshToken) {
      console.log("No refresh token provided in logout request.")
      return { success: false, message: "No refresh token provided." }
    }

    console.log('Starting logout process ...')
    const issuerURL = process.env.KEYCLOAK_ISSUER as string
    const logoutURL = `${issuerURL}/protocol/openid-connect/logout`

    const logoutBody = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID as string,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      refresh_token: refreshToken,
    })

    const response = await fetch(logoutURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: logoutBody.toString(),
    })
    console.log('Logout response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Failed to logout from Keycloak:', errorText)
      return { success: false, message: "Failed to logout from Keycloak." }
    } else {
      console.log('Successfully logged out from Keycloak')
      return { success: true, message: "Successfully logged out." }
    }
  } catch (err) {
    console.error("Error during logout:", err)
    return { success: false, error: String(err) }
  }
})