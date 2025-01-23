"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { dataset } from "./GDPperCapita";
import { useTheme } from "../themeContext";
import StyledPaper from "./StyledPaper";

interface StackedAreasProps {}

const StackedAreas: React.FC<StackedAreasProps> = () => {
  const { darkMode } = useTheme();

  return (
    <StyledPaper
      sx={{
        p: "20px",
        borderRadius: "8px",
        "& .MuiChartsAxis-line": {
          stroke: darkMode ? "#fff" : "#000",
        },
        "& .MuiChartsAxis-tick": {
          stroke: darkMode ? "#fff" : "#000",
        },
        "& .MuiChartsAxis-label": {
          fill: darkMode ? "#fff" : "#000",
        },
      }}
    >
      <LineChart
        slotProps={{
          legend: {
            labelStyle: {
              fill: darkMode ? "white" : "black",
            },
          },
        }}
        dataset={dataset}
        xAxis={[
          {
            id: "Years",
            dataKey: "date",
            scaleType: "time",
            valueFormatter: (date) => date.getFullYear().toString(),
            tickLabelStyle: {
              fill: darkMode ? "#fff" : "#000",
            },
          },
        ]}
        yAxis={[
          {
            id: "users",
            label: "",
            tickLabelStyle: {
              fill: darkMode ? "#fff" : "#000",
            },
          },
        ]}
        series={[
          {
            id: "Users",
            label: "users",
            dataKey: "us",
            stack: "total",
            area: true,
            showMark: false,
            color: darkMode ? "#4dabf5" : "#1976d2",
          },
          {
            id: "Subscribers",
            label: "Subscribers",
            dataKey: "sb",
            stack: "total",
            area: true,
            showMark: false,
            color: darkMode ? "#66bb6a" : "#2e7d32",
          },
          {
            id: "Sales",
            label: "Sales",
            dataKey: "sa",
            stack: "total",
            area: true,
            showMark: false,
            color: darkMode ? "#ffa726" : "#ed6c02",
          },
          {
            id: "orders",
            label: "orders",
            dataKey: "or",
            stack: "total",
            area: true,
            showMark: false,
            color: darkMode ? "#ef5350" : "#d32f2f",
          },
        ]}
        height={500}
        margin={{ left: 70, top: 200 }}
        sx={{
          ".MuiLineElement-root": {
            stroke: darkMode ? "#fff" : "#000",
          },
          ".MuiMarkElement-root": {
            stroke: darkMode ? "#fff" : "#000",
          },
          ".MuiChartsLegend-label": {
            fill: darkMode ? "#fff" : "#000",
          },
        }}
      />
    </StyledPaper>
  );
};

export default StackedAreas;
