import { Box, Card, CardContent, Typography } from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
}

function KpiCard({ title, value, unit, description }: KpiCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "16px",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: "rgba(66, 214, 181, 0.35)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(66, 214, 181, 0.07)",
              color: "primary.main",
            }}
          >
            <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>

        <Typography
          sx={{
            mt: 2.5,
            fontSize: "27px",
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            color: "text.primary",
          }}
        >
          {value}

          {unit && (
            <Box
              component="span"
              sx={{
                ml: 0.75,
                fontSize: "12px",
                fontWeight: 400,
                color: "text.secondary",
              }}
            >
              {unit}
            </Box>
          )}
        </Typography>

        <Typography
          sx={{
            mt: 0.75,
            fontSize: "10px",
            color: "text.secondary",
            opacity: 0.65,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KpiCard;
