"use client";
import React from "react";
import { BarElement } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getAllPendapatanBulananByYear } from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

export default function SampleChart({ data }: { data: any }) {
  //   const { data, mutate, isLoading } = getAllPendapatanBulananByYear(2024);
  console.log(data);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Penjualan Bulanan Keseluruhan",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const chartData = {
    labels: ["1", "2"].map((data) => data),
    datasets: [
      {
        label: "Total Incomes",
        data: [1, 2].map((data) => data),
        backgroundColor: [
          "#F05252",
          "#C27803",
          "#0E9F6E",
          "#3F83F8",
          "#6875F5",
          "#9061F9",
          "#E74694",
        ],
        borderColor: "black",
        borderWidth: 0,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
