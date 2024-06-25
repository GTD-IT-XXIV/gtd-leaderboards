# GTD Leaderboards

## Table of Content

- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Setting Up](#setting-up)
  - [Building](#building)
- [API Endpoints](#api-endpoints)
- [Telegram Bot Commands](#telegram-bot-commands)

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

5. Install ngrok. Installation: [ngrok Quickstart](https://ngrok.com/docs/getting-started/).

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

### Building

1. Build the project:

```bash
pnpm build
```

2. Start the production build:

```bash
pnpm start
```

## API Endpoints

### `GET /leaderboards` (top leaderboards for all days)
Returns top 3 OGs and winning house (with points) for all days and overall in decreasing order.

<details>
<summary>Example</summary>

#### Request
```http
GET /leaderboards
```

#### Response
```json
{
  "1": {
    "top3OG": [
      {
        "number": "7",
        "points": 700
      },
      {
        "number": "6",
        "points": 600
      },
      {
        "number": "5",
        "points": 500
      }
    ],
    "topHouse": {
      "name": "Green",
      "points": 1200
    }
  },
  "2": {
    "top3OG": [
      {
        "number": "1",
        "points": 800
      },
      {
        "number": "2",
        "points": 700
      },
      {
        "number": "3",
        "points": 600
      }
    ],
    "topHouse": {
      "name": "Red",
      "points": 1500
    }
  },
  "3": {
    "top3OG": [
      {
        "number": "5",
        "points": 800
      },
      {
        "number": "6",
        "points": 700
      },
      {
        "number": "7",
        "points": 600
      }
    ],
    "topHouse": {
      "name": "Yellow",
      "points": 1500
    }
  },
  "overall": {
    "top3OG": [
      {
        "number": "5",
        "points": 1700
      },
      {
        "number": "6",
        "points": 1600
      },
      {
        "number": "7",
        "points": 1500
      }
    ],
    "topHouse": {
      "name": "Yellow",
      "points": 3300
    }
  }
}
```

</details>

### `GET /leaderboards/:day` (top leaderboards for specific day)
Returns top 3 OG and winning house (with points) for specific day if a valid day (1-3) is specified. Otherwise, returns results for overall. Both in decreasing order.

<details>
<summary>Example</summary>

#### Request
```http
GET /leaderboards/2
```

#### Response
```json
{
  "top3OG": [
    {
      "number": "7",
      "points": 900
    },
    {
      "number": "6",
      "points": 800
    },
    {
      "number": "8",
      "points": 650
    }
  ],
  "topHouse": {
    "name": "Green",
    "points": 1800
  }
}
```

</details>

### `GET /leaderboards/all` (complete leaderboards for all days)
Returns all OGs and houses (with points) for all days and overall in decreasing order.

<details>
<summary>Example</summary>

#### Request
```http
GET /leaderboards/all
```

#### Response
```json
{
  "1": {
    "topOG": [
      {
        "number": "7",
        "points": 700
      },
      {
        "number": "6",
        "points": 600
      },
      {
        "number": "5",
        "points": 500
      },
      {
        "number": "8",
        "points": 500
      },
      {
        "number": "4",
        "points": 400
      },
      {
        "number": "3",
        "points": 300
      },
      {
        "number": "2",
        "points": 200
      },
      {
        "number": "1",
        "points": 100
      }
    ],
    "topHouse": [
      {
        "name": "Healer",
        "points": 1200
      },
      {
        "name": "Timeturner",
        "points": 1100
      },
      {
        "name": "Changeling",
        "points": 700
      },
      {
        "name": "Wanderer",
        "points": 300
      }
    ]
  },
  "2": {
    "topOG": [
      {
        "number": "1",
        "points": 800
      },
      {
        "number": "2",
        "points": 700
      },
      {
        "number": "3",
        "points": 600
      },
      {
        "number": "4",
        "points": 500
      },
      {
        "number": "5",
        "points": 400
      },
      {
        "number": "6",
        "points": 300
      },
      {
        "number": "7",
        "points": 200
      },
      {
        "number": "8",
        "points": 100
      }
    ],
    "topHouse": [
      {
        "name": "Wanderer",
        "points": 1500
      },
      {
        "name": "Changeling",
        "points": 1100
      },
      {
        "name": "Timeturner",
        "points": 700
      },
      {
        "name": "Healer",
        "points": 300
      }
    ]
  },
  "3": {
    "topOG": [
      {
        "number": "5",
        "points": 800
      },
      {
        "number": "6",
        "points": 700
      },
      {
        "number": "7",
        "points": 600
      },
      {
        "number": "8",
        "points": 500
      },
      {
        "number": "4",
        "points": 400
      },
      {
        "number": "3",
        "points": 300
      },
      {
        "number": "2",
        "points": 200
      },
      {
        "number": "1",
        "points": 100
      }
    ],
    "topHouse": [
      {
        "name": "Timeturner",
        "points": 1500
      },
      {
        "name": "Healer",
        "points": 1100
      },
      {
        "name": "Changeling",
        "points": 700
      },
      {
        "name": "Wanderer",
        "points": 300
      }
    ]
  },
  "overall": {
    "topOG": [
      {
        "number": "5",
        "points": 1700
      },
      {
        "number": "6",
        "points": 1600
      },
      {
        "number": "7",
        "points": 1500
      },
      {
        "number": "4",
        "points": 1300
      },
      {
        "number": "3",
        "points": 1200
      },
      {
        "number": "2",
        "points": 1100
      },
      {
        "number": "8",
        "points": 1100
      },
      {
        "number": "1",
        "points": 1000
      }
    ],
    "topHouse": [
      {
        "name": "Yellow",
        "points": 3300
      },
      {
        "name": "Green",
        "points": 2600
      },
      {
        "name": "Blue",
        "points": 2500
      },
      {
        "name": "Red",
        "points": 2100
      }
    ]
  }
}
```

</details>

### `GET /leaderboards/all/:day` (complete leaderboards for specific day)
Returns all OGs and houses (with points) for specific day if a valid day (1-3) is specified. Otherwise, returns results for overall. Both in decreasing order.

<details>
<summary>Example</summary>

#### Request
```http
GET /leaderboards/all/3
```

#### Response
```json
{
  "topOG": [
    {
      "number": "8",
      "points": 900
    },
    {
      "number": "4",
      "points": 800
    },
    {
      "number": "1",
      "points": 650
    },
    {
      "number": "7",
      "points": 600
    },
    {
      "number": "5",
      "points": 575
    },
    {
      "number": "6",
      "points": 550
    },
    {
      "number": "2",
      "points": 500
    },
    {
      "number": "3",
      "points": 450
    }
  ],
  "topHouse": [
    {
      "name": "Yellow",
      "points": 1800
    },
    {
      "name": "Red",
      "points": 1700
    },
    {
      "name": "Green",
      "points": 1600
    },
    {
      "name": "Blue",
      "points": 1500
    }
  ]
}
```

</details>

## Telegram Bot Commands

### `/announce <password> <optional: 1-3>`
Announce the current leaderboard standings. If a number is provided, announce the standings for that day.

### `/podium <optional: 1-3>`
Display the total leaderboard standings. If a number is provided, display the standings for that day.

### `/setchannel <password>`
Set the announcement chat to the current group chat. Important: The bot must have permission to delete messages in the group chat.
