import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts'
  
  interface Props {
    dailyData: { date: string; count: number }[]
  }
  
  // 简单格式化日期，只保留 MM-DD
  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}-${day}`
  }
  
  export function DailyLineChart({ dailyData }: Props) {
    const formattedData = dailyData.map(item => ({
      ...item,
      date: formatDate(item.date),
    }))
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}次`}
          />
          <Tooltip
            wrapperStyle={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
            itemStyle={{ color: '#000' }}
            formatter={(value) => [`${value}次`, '航船数量']}
            labelFormatter={(label) => `日期: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="currentColor"
            strokeWidth={2}
            dot={{ r: 3 }}
            className="stroke-primary"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
  