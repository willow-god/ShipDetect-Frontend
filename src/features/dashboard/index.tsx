import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategoryCounts } from './components/category-counts'
import { DailyLineChart } from './components/daily-line-chart'
import { DashboardCards } from './components/dashboard-cards'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface DashboardData {
  total_week: number
  total_month: number
  total_year: number
  avg_confidence: number
  daily_pass_counts: { date: string; count: number }[]
  category_counts: { category: string; count: number }[]
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    total_week: 0,
    total_month: 0,
    total_year: 0,
    avg_confidence: 0,
    daily_pass_counts: [],
    category_counts: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}/result/get_all_datas`)
      setData(res.data)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>数据面板</h1>
          <div className='flex items-center space-x-2'>
            <Button>导出统计数据</Button>
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>概览</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                分析
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                报告
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                通知
              </TabsTrigger>
            </TabsList>
          </div>
          <div className='space-y-4'>
            <DashboardCards
              total_week={data.total_week}
              total_month={data.total_month}
              total_year={data.total_year}
              avg_confidence={data.avg_confidence}
            />

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>每日通过量统计</CardTitle>
                  <CardDescription>展示近期通过车辆线性图</CardDescription>
                </CardHeader>
                <CardContent className='pl-2'>
                  <DailyLineChart dailyData={data.daily_pass_counts} />
                </CardContent>
              </Card>

              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>六类航船数量对比</CardTitle>
                  <CardDescription>展示近期识别的六类船舶数量</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryCounts categoryData={data.category_counts} />
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
