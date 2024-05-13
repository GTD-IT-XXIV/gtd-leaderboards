# GTD Leaderboards

## Table of Content

- [Project Setup](#project-setup)

## Project Setup

### Prerequisites

1. Install Node Version Manager (NVM). Installation: [macOS/Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating), [Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#overview).
2. Install Node.js Iron (LTS):

```bash
# For macOS/Linux
nvm install --lts=iron
nvm use --lts=iron
```

```pwsh
# For Windows
nvm install lts
nvm use lts
```

3. Install pnpm using Corepack (or alternatively, [using npm](https://pnpm.io/installation#using-npm)):

```bash
corepack enable pnpm
```

4. Install Docker. Installation: [macOS](https://docs.docker.com/desktop/install/mac-install/), [Linux](https://docs.docker.com/desktop/install/linux-install/), [Windows](https://docs.docker.com/desktop/install/windows-install/).

5. Install ngrok. Installation: [ngrok Quickstart](https://ngrok.com/docs/getting-started/)

### Setting Up

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` contents to `.env` and fill the environment variables (instructions inside file):

```bash
cp .env.example .env
```

3. Start the database:

```bash
pnpm db:start
```

4. Run the migrations:

```bash
pnpm prisma migrate dev
```

5. Run ngrok to expose the development server to the internet:

```bash
ngrok http 8080
```

6. Copy the ngrok URL to the `WEBHOOK_DOMAIN` environment variable in `.env`.

5. Run the development server:

```bash
pnpm dev
```

### Additional Tools

#### Prisma Studio

See development database contents:

```bash
pnpm db:studio
```
