import {
  Card,
  CardContent,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import { useMemo, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WindData {
  startTime: string;
  forecast: number;
  actual: number;
}

interface WindGenerationChartProps {
  data: WindData[];
}

function WindGenerationChart({ data }: WindGenerationChartProps) {
  const [selectedDate, setSelectedDate] = useState("all");

  const availableDates = useMemo(() => {
    return Array.from(
      new Set(data.map((item) => item.startTime.substring(0, 10))),
    );
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedDate === "all") {
      return data;
    }

    return data.filter(
      (item) => item.startTime.substring(0, 10) === selectedDate,
    );
  }, [data, selectedDate]);

  const chartData = filteredData.map((item) => ({
    time: new Date(item.startTime).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    actual: Math.round(item.actual),
    forecast: Math.round(item.forecast),
  }));

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: "16px",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Wind generation performance
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: "11px",
                color: "text.secondary",
              }}
            >
              Actual generation compared with the latest available forecast
            </Typography>
          </Box>

          <Select
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            size="small"
            sx={{
              minWidth: 145,
              height: 34,
              fontSize: "11px",
              borderRadius: "8px",
              color: "text.secondary",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
            }}
          >
            <MenuItem value="all" sx={{ fontSize: "11px" }}>
              All January
            </MenuItem>

            {availableDates.map((date) => (
              <MenuItem key={date} value={date} sx={{ fontSize: "11px" }}>
                {new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ width: "100%", height: 360 }}>
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
                labelStyle={{
                  color: "#81908B",
                  marginBottom: 4,
                }}
                formatter={(value, name) => [
                  `${Number(value).toLocaleString()} MW`,
                  name === "actual" ? "Actual" : "Forecast",
                ]}
              />

              <Line
                type="monotone"
                dataKey="actual"
                stroke="#42D6B5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#8A9A95"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 18,
                height: 2,
                backgroundColor: "primary.main",
              }}
            />
            <Typography
              sx={{
                fontSize: "10px",
                color: "text.secondary",
              }}
            >
              Actual
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 18,
                borderTop: "2px dashed #8A9A95",
              }}
            />
            <Typography
              sx={{
                fontSize: "10px",
                color: "text.secondary",
              }}
            >
              Forecast
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WindGenerationChart;
