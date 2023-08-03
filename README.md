# Shopify Node.js x Express.js x React.js Boilerplate

An embedded app starter template to get up and ready with Shopify app development with JavaScript. This is heavily influenced by the choices Shopify Engineering team made in building their [starter template](https://github.com/Shopify/shopify-app-template-node) to ensure smooth transition between templates.

I've included [notes](/docs/NOTES.md) on this repo which goes over the repo on why certain choices were made.

I also did make a video going over the entire repo as of November 4, 2022. If there's any substantial changes, the video here will be updated to reflect it.

[![Creating a Shopify app from scratch](https://img.youtube.com/vi/iV_3ENCraaM/0.jpg)](https://www.youtube.com/watch?v=iV_3ENCraaM)

## Supporting repositories

- NEW! [Next.js + Prisma](https://github.com/kinngh/shopify-nextjs-prisma-app): A Shopify app boilerplate built with Next.js and Prisma ORM, with deployments available on Vercel.
- [WIP] [`npx create-shop-app@latest`](https://github.com/kinngh/create-shop-app): A CLI tool to generate embedded Shopify app boilerplate with a tech stack of your own.

## Tech Stack

- React.js
  - `raviger` for routing.
- Express.js
- MongoDB
- Vite
- Ngrok
- Apollo/Client

## Why I made this

The Shopify CLI generates an amazing starter app but it still needs some more boilerplate code and customizations so I can jump on to building apps with a simple clone. This includes:

- MongoDB based session and database management.
- Monetization (recurring subscriptions) ready to go.
- Webhooks isolated and setup.
- React routing taken care of (I miss Next.js mostly because of routing and under the hood improvements).
- Misc boilerplate code and templates to quickly setup inApp subscriptions, routes, webhooks and more.

## Notes

### Setup

- Refer to [SETUP](/docs/SETUP.md)

### Misc

- Storing data is kept to a minimal to allow building custom models for flexibility.
  - Session persistence is also kept to a minimal and based on the Redis example provided by Shopify, but feel free to modify as required.

SHOPIFY_API_KEY=7b7274195e893cc66728d24439275621
SHOPIFY_API_SECRET=3b0bd4f6e79bb56be066f999ba342965
SHOPIFY_API_SCOPES=read_content, write_content
SHOPIFY_APP_URL=https://d7d2-103-251-17-93.ngrok-free.app
SHOPIFY_API_VERSION="2023-04"
MONGO_URL= "mongodb://mongo:4cUZODmtdYJWuLtC6NLR@containers-us-west-69.railway.app:7048"
ENCRYPTION_STRING=ENCRYPTION_STRING
NPM_CONFIG_FORCE=true
zendesk_api_token  = 3bLzn0Hj4iAd79lKo3e0I9M4us6iEqm7wB9KCI1u
zendesk_remote_Uri = https://rex4263.zendesk.com/api/v2
zendesk_username = tamoghanamondal.zerone@gmail.com









shopify UserName : fotogi1692@anwarb.com

password : 65nuzrMc+8,VAmb


<!-- https://admin.shopify.com/store/quickstart-b1d6d5a7/apps/7b7274195e893cc66728d24439275621 -->

shopify url -  https://admin.shopify.com/store/quickstart-b1d6d5a7/apps/7b7274195e893cc66728d24439275621

zendeskPassword - hJC4w8RTdH5Zz7C