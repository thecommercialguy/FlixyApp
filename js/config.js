let config = null

export async function loadConfig() {
    if (!config) {
        const response = await fetch('/config')
        config = await response.json()
    }
    return config
}