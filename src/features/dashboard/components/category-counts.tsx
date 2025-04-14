import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface Props {
  categoryData: { category: string; count: number }[]
}

const categoryNameMap: Record<string, string> = {
    "ore carrier": "矿砂船",
    "bulk cargo carrier": "散货船",
    "general cargo ship": "杂货船",
    "container ship": "集装箱船",
    "fishing boat": "渔船",
    "passenger ship": "客船",
  }
  

export function CategoryCounts({ categoryData }: Props) {

  
    const mappedData = categoryData.map(item => ({
        ...item,
        category: categoryNameMap[item.category] || item.category,
    }))
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mappedData}>
        <XAxis 
            dataKey="category" 
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
        />
        <YAxis 
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}次`}
        />
        <Tooltip
            wrapperStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ccc' }}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #ccc' }}
            itemStyle={{ color: '#000' }}
            formatter={(value) => [`${value}次`, '航船数量']}
            labelFormatter={(label) => `类别: ${label}`}
        />
        <Bar 
            dataKey="count" 
            fill='currentColor'
            radius={[4, 4, 0, 0]}
            className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
