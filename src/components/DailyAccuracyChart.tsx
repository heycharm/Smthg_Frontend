import { Card, CardContent, Box, Typography } from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DailyData {
  date: string;
  averageActual: number;
  averageForecast: number;
  mae: number;
  mape: number;
}

interface DailyAccuracyChartProps {
  data: DailyData[];
}

function DailyAccuracyChart({ data }: DailyAccuracyChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(`${item.date}T00:00:00`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    mae: Math.round(item.mae),
    mape: Number(item.mape.toFixed(2)),
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
            Daily forecast accuracy
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: "11px",
              color: "text.secondary",
            }}
          >
            Daily mean absolute error across January 2026
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
                dataKey="date"
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={20}
              />

              <YAxis
                tick={{
                  fill: "#81908B",
                  fontSize: 10,
                }}
                axisLine={false}
                tickLine={false}
                width={55}
                tickFormatter={(value) => `${value} MW`}
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
                  "MAE",
                ]}
              />

              <Bar dataKey="mae" fill="#42D6B5" radius={[4, 4, 0, 0]} />
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
          Lower MAE indicates better forecast accuracy.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DailyAccuracyChart;
