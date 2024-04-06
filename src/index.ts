import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { md5 } from "hono/utils/crypto";


const app = new Hono()

app.get('/store.db', async (c) => {
    const res = await fetch(`https://store-cdn.repressoh.it/store.db`)
    const file = await res.text()

    c.header('Content-Type', 'application/x-sqlite3')
    return c.newResponse(file)
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

app.use('/images/*', serveStatic({ root: './' }))

app.get('/api.php', async (c) => {
    const res = await fetch(`https://store-cdn.repressoh.it/store.db`)
    const file = await res.text()

    const hash = await md5(file)
    return c.json({"hash": hash})
})

export default app