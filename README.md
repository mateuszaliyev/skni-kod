# SKNI KOD

Student Research Group of Computer Science - "Code".

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Clone the repository.

```bash
git clone https://github.com/mateuszaliyev/skni-kod.git
# or
git clone git@github.com:mateuszaliyev/skni-kod.git
```

Go to the project directory.

```bash
cd skni-kod
```

Install dependencies.

```bash
pnpm install
```

Generate
[Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
and
[typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/generator)
types.

```bash
pnpm i18n:build
```

```bash
pnpm prisma:build
```

Rename [`.env.example`](./.env.example) file to `.env` and replace the
placeholder values with your environment variables.

Push the state of your Prisma schema file to the database.

```bash
pnpm prisma:push
```

## Usage

Run the development server.

```bash
pnpm dev
```

Lint code with ESLint.

```bash
pnpm lint
```

Build application for production.

```bash
pnpm build
```

Start production server.

```bash
pnpm start
```

## Deployment

### Vercel

[Vercel](https://vercel.com/) is the easiest deployment target for Next.js apps.

- Push your code to a GitHub repository.
- Go to [Vercel](https://vercel.com/) and sign up with GitHub.
- Create a Project and import the repository you pushed your code to.
- Add your environment variables.
- Click **Deploy**
- Now whenever you push a change to your repository, Vercel will automatically
  redeploy your website!

### Docker

It is also possible to dockerize this application and deploy a container.

1. In your [next.config.mjs](./next.config.mjs), add the `output: "standalone"`
   option to your config.

2. Create a `.dockerignore` file with the following contents:

   ```
   .dockerignore
   .git
   .next
   Dockerfile
   node_modules
   npm-debug.log
   README.md
   ```

3. Create a `Dockerfile` with the following contents:

   ```Dockerfile
   # Install dependencies only when needed

   FROM node:16-alpine AS deps

   # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   # Install dependencies based on the preferred package manager

   COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
   RUN \
      if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
      else echo "Lockfile not found." && exit 1; \
      fi


   # Rebuild the source code only when needed

   FROM node:16-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   # Next.js collects completely anonymous telemetry data about general usage.
   # Learn more here: https://nextjs.org/telemetry
   # Uncomment the following line in case you want to disable telemetry during the build.
   # ENV NEXT_TELEMETRY_DISABLED 1

   RUN yarn build

   # If using npm comment out above and use below instead
   # RUN npm run build

   # Production image, copy all the files and run next

   FROM node:16-alpine AS runner
   WORKDIR /app

   ENV NODE_ENV production

   # Uncomment the following line in case you want to disable telemetry during runtime.
   # ENV NEXT_TELEMETRY_DISABLED 1

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   # You only need to copy next.config.js if you are NOT using the default configuration
   # COPY --from=builder /app/next.config.js ./

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/package.json ./package.json

   # Automatically leverage output traces to reduce image size
   # https://nextjs.org/docs/advanced-features/output-file-tracing

   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

4. You can now build an image to deploy yourself, or use a PaaS such as
   [Railway's](https://railway.app/) automated
   [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles/) to
   deploy your app.

## Authors

- Mateusz Aliyev ([@mateuszaliyev](https://github.com/mateuszaliyev))

## License

[MIT](./LICENSE)
