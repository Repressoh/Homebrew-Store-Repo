import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import getSHA from './utilities/getSHA'
import getR2file from './utilities/getR2file'

const app = new Hono()

app.get('/store.db', async (c) => {
    const file = await getR2file(c.env, "store.db")
    return c.text(file)
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
    const hash = await getSHA(c.env, "store.db")
    return c.json({"hash": hash})
})

export default app