import { Hono } from 'hono'

const app = new Hono()

app.get('/store.db', async (c) => {

    const fileData = await fetch(`https://${c.env?.BASELINK}/store.db`).then(res => res.arrayBuffer())

    return c.newResponse(fileData, {
        headers: {
            'Content-Type': 'application/x-sqlite3',
            'Content-Disposition': 'attachment; filename="store.db"'
        }
        })
})

app.get('/update/homebrew.elf', async (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/homebrew.elf")
})

app.get('/update/homebrew.elf.sig', async (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/homebrew.elf.sig")
})

app.get('/update/remote.md5', async (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/remote.md5")
})

app.get('/api.php', async (c) => {
    try {
        const fileData = await fetch(`https://${c.env?.BASELINK}/store.db`).then(res => res.arrayBuffer())
        
        const hashBuffer = await crypto.subtle.digest('md5', fileData)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const md5 = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

        return c.json({"hash": md5});

    } catch (error) {
        return c.json({ error: error.message }, { status: 500 })
    }
});

export default app
