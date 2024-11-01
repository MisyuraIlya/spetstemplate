import React from 'react';
import {useEditContext} from 'react-admin';
// import {
//   LineChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Line,
//   ResponsiveContainer
// } from 'recharts';
// import moment from 'moment';
export default function Chart() {
  const {record, isLoading} = useEditContext()
  if (isLoading || !record.chartData) return null

  // @ts-ignore
  // const formattedData = record.chartData.map(item => ({
  //   ...item,
  //   date: moment(item.date).format('MM/DD/YYYY HH:mm:ss')
  // }));

  return(
    <div style={{ width: '100%', height: 300 }}>
      {/* <ResponsiveContainer>
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="salePrice" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  )
}