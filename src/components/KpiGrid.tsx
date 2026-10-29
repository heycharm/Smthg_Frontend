import { Grid } from "@mui/material";
import KpiCard from "./KpiCard";

interface KpiGridProps {
  summary: {
    totalHours: number;
    averageActual: number;
    averageForecast: number;
    mae: number;
    rmse: number;
    mape: number;
  };
}

function KpiGrid({ summary }: KpiGridProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="Average Actual"
          value={summary.averageActual}
          unit="MW"
          description="Average wind generation"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="Average Forecast"
          value={summary.averageForecast}
          unit="MW"
          description="Average forecast generation"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="Mean Absolute Error"
          value={summary.mae}
          unit="MW"
          description="Average forecast deviation"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="RMSE"
          value={summary.rmse}
          unit="MW"
          description="Forecast error magnitude"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="MAPE"
          value={summary.mape}
          unit="%"
          description="Mean absolute percentage error"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <KpiCard
          title="Hours Analysed"
          value={summary.totalHours}
          description="January 2026"
        />
      </Grid>
    </Grid>
  );
}

export default KpiGrid;
