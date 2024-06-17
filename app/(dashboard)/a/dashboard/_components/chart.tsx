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

export default function SampleChart({
  data,
}: {
  data: { month: string; total_orders: number; total_sales: number }[];
}) {
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
    labels: data.map((data) => data.month),
    datasets: [
      {
        label: "Total Incomes",
        data: data.map((data) => data.total_sales),
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

  return (
    <div className="bg-white p-2">
      <Bar options={options} data={chartData} />
    </div>
  );
}
