'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  total_week: number
  total_month: number
  total_year: number
  avg_confidence: number
}

export function DashboardCards({
  total_week,
  total_month,
  total_year,
  avg_confidence,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">本周总航船通过量</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_week}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">本月总航船通过量</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_month}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">全年通过航船总量</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_year}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">平均识别置信度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(avg_confidence * 100).toFixed(2)}%</div>
        </CardContent>
      </Card>
    </div>
  )
}
