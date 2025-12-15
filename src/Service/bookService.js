const MOCKAPI_URL = 'https://693f3a1b12c964ee6b6f7184.mockapi.io/books'

export async function getBooks() {
  try {
    const res = await fetch(MOCKAPI_URL)
    if (!res.ok) throw new Error('Network response was not ok')
    return await res.json()
  } catch (err) {
    console.warn('getBooks error', err)
    return []
  }
}

export async function createBook(payload) {
  try {
    const res = await fetch(MOCKAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      const message = `Request failed ${res.status} ${res.statusText} - ${text}`
      console.warn('createBook response error:', message)
      throw new Error(message)
    }
    return await res.json()
  } catch (err) {
    console.warn('createBook error', err)
    throw err
  }
}

// (Removed createBookWithProgress — not used; progress handled via uploadService)

export default { getBooks, createBook }
