# Wind Generation Analysis — Frontend

React frontend for analysing UK national-level wind generation forecasts and actual generation for **January 2026**.

The application communicates with the Python backend and presents forecast performance through interactive charts and summary metrics.

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- Recharts
- Docker
- Vercel

## Features

The dashboard provides:

- Wind generation actual vs forecast
- Latest forecast analysis
- Forecast error analysis
- Daily forecast accuracy
- Forecast evolution
- MAE
- RMSE
- MAPE
- Average actual generation
- Average forecast generation
- Hours analysed
- January 2026 date selection

## Project Structure

```text
GridBlocksAssignment_Frontend/
├── src/
│   ├── components/
│   │   └── WindGenerationChart.tsx
│   ├── App.tsx
│   ├── config.ts
│   └── main.tsx
├── public/
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

### Files

**`App.tsx`**

Main application component. Handles API data loading and dashboard state.

**`components/WindGenerationChart.tsx`**

Contains the visualisation components for wind generation and forecast analysis.

**`config.ts`**

Reads the backend API URL from the Vite environment configuration.

## Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

The deployed application uses the deployed backend URL as the value of `VITE_API_BASE_URL`.

## Running Locally

### Prerequisites

- Node.js
- npm

Install dependencies:

```bash
npm install --legacy-peer-deps
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Building for Production

```bash
npm run build
```

The production build is generated in the `dist` directory.

## Running with Docker

Build the frontend image:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:8000 \
  -t wind-analysis-frontend .
```

Run the container:

```bash
docker run --rm -p 5173:80 wind-analysis-frontend
```

The application will be available at:

```text
http://localhost:5173
```

## Backend API

The frontend consumes the following backend endpoints:

```text
/api/wind/actuals
/api/wind/forecasts
/api/wind/analysis
/api/wind/summary
/api/wind/daily
/api/wind/forecast-evolution
```

The frontend and backend are maintained as separate applications.

## Deployment

The frontend is deployed using Vercel.

**Live Application:**  
[\[Vercel URL\]](https://windanalysisbychinmay.vercel.app/)

The deployed frontend connects to the publicly deployed Python backend through the `VITE_API_BASE_URL` environment variable.

## AI Tools Used

AI tools were used during development for assistance with:

- Code refinement
- Debugging
- UI implementation
- Troubleshooting build and deployment issues
