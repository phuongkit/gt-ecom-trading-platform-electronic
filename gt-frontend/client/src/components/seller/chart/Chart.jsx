import { useDispatch, useSelector } from "react-redux";
import "./chart.scss";
import {
  AreaChart,
  Area,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { getStatisticOrdersApi } from "../../../redux/statistic/statisticsApi";


const Chart = ({ aspect, title, groupOrderByDateList }) => {

  const dispatch = useDispatch();
  const getUser = JSON.parse(localStorage.getItem('customerInfo'));


  
  const data = groupOrderByDateList?.map(item => ({ name: item.dateStatistic, uv: item.totalPrice }))
  return (
    <div className="chart">
      <div className="title">Biểu đồ đặt hàng</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
