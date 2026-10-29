import { Card, CardContent, Box, Typography } from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ForecastEvolutionData {
  publishTime: string;
  forecast: number;
}

interface ForecastEvolutionChartProps {
  data: ForecastEvolutionData[];
  targetTime: string;
}

function ForecastEvolutionChart({
  data,
  targetTime,
}: ForecastEvolutionChartProps) {
  const chartData = data.map((item) => ({
    publishTime: new Date(item.publishTime).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    forecast: Math.round(item.forecast),
  }));

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: "16px",
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Forecast evolution
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: "11px",
              color: "text.secondary",
            }}
          >
            How the wind forecast changed as the target hour approached
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 2,
            px: 1.5,
            py: 1,
            borderRadius: "8px",
            backgroundColor: "rgba(66, 214, 181, 0.05)",
            border: "1px solid rgba(66, 214, 181, 0.1)",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              color: "text.secondary",
            }}
          >
            Target delivery hour
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: "12px",
              fontWeight: 500,
              color: "primary.main",
            }}
          >
            {new Date(targetTime).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>

        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

              <XAxis
                dataKey="publishTime"
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                width={60}
                tickFormatter={(value) => `${value / 1000}k`}
              />

              <Tooltip
                contentStyle={{
                  background: "#0E1B17",
                  border: "1px solid #1C302A",
                  borderRadius: "10px",
                  fontSize: "11px",
                }}
                formatter={(value) => [
                  `${Number(value).toLocaleString()} MW`,
                  "Forecast",
                ]}
              />

              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#42D6B5"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "#42D6B5",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          sx={{
            mt: 1,
            fontSize: "10px",
            color: "text.secondary",
          }}
        >
          Each point represents a different forecast publication for the same
          delivery hour.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ForecastEvolutionChart;
