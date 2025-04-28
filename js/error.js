export async function handleServerError(response) {
    const errorText = await response.text()
    console.error('Response Body:', errorText)
    throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`)
}