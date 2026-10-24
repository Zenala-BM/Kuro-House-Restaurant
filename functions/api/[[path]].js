const API_BASE_URL = 'https://kuro-house-restaurant.onrender.com'

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const apiPath = url.pathname + url.search

  const backendUrl = `${API_BASE_URL}${apiPath}`

  const headers = new Headers(context.request.headers)
  headers.delete('host')

  const backendRequest = new Request(backendUrl, {
    method: context.request.method,
    headers,
    body: ['GET', 'HEAD'].includes(context.request.method)
      ? undefined
      : context.request.body,
    redirect: 'manual',
  })

  const response = await fetch(backendRequest)
  const responseHeaders = new Headers(response.headers)

  // Make the browser treat the session cookie as same-origin.
  const cookie = responseHeaders.get('set-cookie')

  if (cookie) {
    responseHeaders.set(
      'set-cookie',
      cookie
        .replace(/;\s*Domain=[^;]*/gi, '')
        .replace(/;\s*SameSite=None/gi, '; SameSite=Lax')
    )
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
}
