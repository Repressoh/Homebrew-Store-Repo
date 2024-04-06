# The Homebrew-Store-Repo  [![wakatime](https://wakatime.com/badge/user/018e969e-62ae-4c81-931e-918f7c7b7d66/project/018eaf5e-488d-45fa-8749-0da69c601ad7.svg)](https://wakatime.com/badge/user/018e969e-62ae-4c81-931e-918f7c7b7d66/project/018eaf5e-488d-45fa-8749-0da69c601ad7)
Create your Own Homebrew Store Content Delivery Network easily and for free. 

# Why?

I decided to create this tool after I wanted to host my own repository of the Homebrew Store for PS4.
I only found an app for that and I instead wanted something more scalable

This was a good opportunity to learn more about the PS4 file system and provide a useful tool for everybody.

# How do I use this?

It's pretty easy!

- First of all, fork the repository

- Open the actions tab and click "I understand my workflows, go ahead and enable them"

- Go in your new Repository settings and in "Pages", put your custom domain ( or leave the free one )

- Clone your repository in your local environment

- Edit, in the wrangler.toml file, the "BASELINK" variable to the domain you just configured

- Install the dependencies

```bash
npm install
```

- Edit the store.db file ( I suggest using the [sqlitebrowser tool](https://sqlitebrowser.org/dl/) )

- Deploy to cloudflare Workers

```bash
npm run deploy
```

✅ Done! Wrangler will tell you the link you will have to insert in the Homebrew Store

Remember that you still have to host your .pkg file. If it's under 2gb, you can store it on GitHub

Tip: Cloudflare has a service called Cloudflare R2 that allows you to store up to 5gb for free!

# Disclaimer

Use this at your own risk. I **DO NOT** promote any type of piracy, in fact this repository **DOES NOT** contain any paid game whatsoever. What you do with this is your responsibility and I cannot be held accountable for anything you do with my project in any way.
