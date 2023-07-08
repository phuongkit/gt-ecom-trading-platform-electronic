import * as React from 'react';
import { Chart, PieSeries, Title, Legend } from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';
import { ESentiment } from '../../utils';

function PieChartComponent({ sentiment }) {
    const data = sentiment
        ? sentiment?.sentimentDetails?.map((detail) => ({
              sentiment: ESentiment.getViFromName(detail.sentiment),
              percent: detail.percent,
          }))
        : [
              { sentiment: ESentiment.NEGATIVE.vi, percent: 0 },
              { sentiment: ESentiment.NEUTRAL.vi, percent: 0 },
              { sentiment: ESentiment.POSITIVE.vi, percent: 0 },
          ];

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
