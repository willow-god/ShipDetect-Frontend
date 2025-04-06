import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

export default function TodayStats() {
  return (
    <>
      {/* ===== 顶部导航栏 ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== 页面主体内容 ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>今日数据统计</h1>
          <div className='flex items-center space-x-2'>
            <Button variant='outline'>导出今日数据</Button>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader>
              <CardTitle>今日总航船通过量</CardTitle>
              <CardDescription>统计今日所有通过的船舶数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>10532</div>
              <p className='text-xs text-muted-foreground'>较昨日 +3.7%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>识别成功数量</CardTitle>
              <CardDescription>通过系统成功识别的船舶数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>10215</div>
              <p className='text-xs text-muted-foreground'>识别率 97.0%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>疑似未识别数量</CardTitle>
              <CardDescription>可能存在识别问题的船舶数量</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>317</div>
              <p className='text-xs text-muted-foreground'>请检查识别日志</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统运行状态</CardTitle>
              <CardDescription>后台核心服务状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold text-green-600'>运行正常</div>
              <p className='text-xs text-muted-foreground'>无故障报告</p>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: '数据面板',
    href: '/dashboard',
    isActive: false,
    disabled: false,
  },
  {
    title: '今日统计',
    href: '/dashboard/today',
    isActive: true,
    disabled: false,
  },
  {
    title: '历史数据',
    href: '/dashboard/history',
    isActive: false,
    disabled: true,
  },
  {
    title: '系统日志',
    href: '/dashboard/logs',
    isActive: false,
    disabled: true,
  },
]
