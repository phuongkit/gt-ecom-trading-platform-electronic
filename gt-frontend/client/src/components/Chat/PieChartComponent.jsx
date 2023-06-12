import * as React from 'react';
import {
  Chart,
  PieSeries,
  Title,
  Legend
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

function PieChartComponent({sentiment}) {
  const data = sentiment?.sentimentDetails?.map((detail) => ({
    sentiment: detail.sentiment,
    percent: detail.percent,
  }));

  return (
    <Chart data={data}>
      <Legend />

      <PieSeries valueField="percent" argumentField="sentiment" />
      <Title text="Analysis sentiment" />
      <Animation />
    </Chart>
  );
}

export default PieChartComponent;