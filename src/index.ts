import { Hono } from 'hono'

type Bindings = {
    BASELINK: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.onError((_err,c) => {
    return c.json({ error: 'Internal Server Error' }, { status: 500 })
})

app.notFound((c) => {
    return c.redirect("https://github.com/Repressoh/Homebrew-Store-Repo")
})

app.get('/store.db', async (c) => {

    const fileData = await fetch(`https://${c.env.BASELINK}/store.db`).then(res => res.arrayBuffer())

    return c.newResponse(fileData, {
        headers: {
            'Content-Type': 'application/x-sqlite3',
            'Content-Disposition': 'attachment; filename="store.db"'
        }
        })
})

app.get('/update/homebrew.elf', (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/homebrew.elf")
})

app.get('/update/homebrew.elf.sig', (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/homebrew.elf.sig")
})

app.get('/update/remote.md5', (c) => {
    return c.redirect("https://github.com/LightningMods/PS4-Store/releases/latest/download/remote.md5")
})

app.get('/api.php', async (c) => {
    const fileData = await fetch(`https://${c.env.BASELINK}/store.db`).then(res => res.arrayBuffer())

    const hashBuffer = await crypto.subtle.digest('md5', fileData)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const md5 = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')

    return c.json({"hash": md5});
});

export default app
