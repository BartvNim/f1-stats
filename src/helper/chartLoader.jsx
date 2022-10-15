import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export function registerChart () {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
};