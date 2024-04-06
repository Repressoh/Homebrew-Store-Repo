import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import getR2file from './utilities/getR2file'
import { md5 } from "hono/utils/crypto";


const app = new Hono()

app.get('/store.db', async (c) => {
    return c.redirect("https://store-cdn.repressoh.it/store.db")
})


app.get('/update/homebrew.elf', async (c) => {
    return c.redirect("https://api.pkg-zone.com/update/homebrew.elf")
})

app.get('/update/homebrew.elf.sig', async (c) => {
    return c.redirect("https://api.pkg-zone.com/update/homebrew.elf.sig")
})

app.get('/update/remote.md5', async (c) => {
    return c.redirect("https://api.pkg-zone.com/update/remote.md5")
})

app.use('/images/*', serveStatic({ root: './' }))

app.get('/api.php', async (c) => {
    const res = await fetch(`https://store-cdn.repressoh.it/store.db`)
    const file = await res.text()

    const hash = md5(file)

    return c.json({"hash": hash})
})

export default app