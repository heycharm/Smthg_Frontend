import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";

import KpiGrid from "./components/KpiGrid";
import WindGenerationChart from "./components/WindGenerationChart";
import ForecastErrorChart from "./components/ForecastErrorChart";
import DailyAccuracyChart from "./components/DailyAccuracyChart";
import ForecastEvolutionChart from "./components/ForecastEvolutionChart";
import { API_BASE_URL } from "./config";

interface Summary {
  totalHours: number;
  averageActual: number;
  averageForecast: number;
  mae: number;
  rmse: number;
  mape: number;
}

function App() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<
    {
      startTime: string;
      publishTime: string;
      forecast: number;
      actual: number;
      error: number;
    }[]
  >([]);
  const [dailyData, setDailyData] = useState<
    {
      date: string;
      averageActual: number;
      averageForecast: number;
      mae: number;
      mape: number;
    }[]
  >([]);
  const [forecastEvolution, setForecastEvolution] = useState<{
    targetTime: string;
    data: {
      publishTime: string;
      startTime: string;
      forecast: number;
    }[];
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
   const [
     summaryResponse,
     analysisResponse,
     dailyResponse,
     evolutionResponse,
   ] = await Promise.all([
     fetch(`${API_BASE_URL}/api/wind/summary`),
     fetch(`${API_BASE_URL}/api/wind/analysis`),
     fetch(`${API_BASE_URL}/api/wind/daily`),
     fetch(`${API_BASE_URL}/api/wind/forecast-evolution`),
   ]);

        const summaryData = await summaryResponse.json();
        const analysisResult = await analysisResponse.json();
        const dailyResult = await dailyResponse.json();
        const evolutionResult = await evolutionResponse.json();


        setSummary(summaryData);
        setAnalysisData(analysisResult.data);
        setDailyData(dailyResult);
        setForecastEvolution(evolutionResult);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching wind data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#07110F",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 3, md: 4 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            width: "100%",
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "start",
              width: "100%",
            }}
          >
            {/* Left */}
            <Box>
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  lineHeight: 1,
                  mb: 1,
                }}
              >
                UK NATIONAL WIND ANALYTICS
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "30px", md: "36px" },
                  lineHeight: 1.15,
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  color: "text.primary",
                }}
              >
                Wind Generation
              </Typography>

              <Typography
                sx={{
                  mt: 0.75,
                  fontSize: "12px",
                  lineHeight: 1.5,
                  color: "text.secondary",
                }}
              >
                Forecast performance and generation insights
              </Typography>
            </Box>

            {/* Extreme Right */}
            <Chip
              label="January 2026"
              size="small"
              variant="outlined"
              sx={{
                height: 30,
                borderRadius: "8px",
                borderColor: "divider",
                color: "text.secondary",
                fontSize: "11px",
                fontWeight: 500,
                px: 0.5,
                justifySelf: "end",
              }}
            />
          </Box>
        </Box>

        {/* Performance Overview */}
        <Box>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                lineHeight: 1.4,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Performance overview
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: "11px",
                lineHeight: 1.5,
                color: "text.secondary",
              }}
            >
              Latest forecast compared against actual wind generation
            </Typography>
          </Box>

          {/* KPI Cards */}
          {loading ? (
            <KpiSkeleton />
          ) : summary ? (
            <>
              <KpiGrid summary={summary} />
              <WindGenerationChart data={analysisData} />
              <ForecastErrorChart data={analysisData} />
              <DailyAccuracyChart data={dailyData} />
              {forecastEvolution && (
                <ForecastEvolutionChart
                  data={forecastEvolution.data}
                  targetTime={forecastEvolution.targetTime}
                />
              )}
            </>
          ) : (
            <Typography
              sx={{
                fontSize: "12px",
                color: "error.main",
              }}
            >
              Unable to load wind generation data.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

function KpiSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            height: 160,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            p: 3,
          }}
        >
          <Skeleton
            variant="rounded"
            width="35%"
            height={16}
            sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
          />

          <Skeleton
            variant="rounded"
            width="28%"
            height={38}
            sx={{
              mt: 3,
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Skeleton
            variant="rounded"
            width="55%"
            height={13}
            sx={{
              mt: 1.5,
              bgcolor: "rgba(255,255,255,0.05)",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default App;
