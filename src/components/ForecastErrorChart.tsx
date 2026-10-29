import { Card, CardContent, Box, Typography } from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface WindData {
  startTime: string;
  error: number;
}

interface ForecastErrorChartProps {
  data: WindData[];
}

function ForecastErrorChart({ data }: ForecastErrorChartProps) {
  const chartData = data.map((item) => ({
    time: new Date(item.startTime).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    error: Math.round(item.error),
  }));

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: "16px",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Forecast error
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: "11px",
              color: "text.secondary",
            }}
          >
            Difference between actual and forecast wind generation
          </Typography>
        </Box>

        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                dataKey="time"
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />

              <YAxis
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                width={55}
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
                  "Forecast error",
                ]}
              />

              <ReferenceLine y={0} stroke="rgba(255,255,255,0.25)" />

              <Bar dataKey="error" fill="#42D6B5" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          sx={{
            mt: 1,
            fontSize: "10px",
            color: "text.secondary",
          }}
        >
          Positive values indicate actual generation was higher than forecast.
          Negative values indicate over-forecasting.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ForecastErrorChart;
