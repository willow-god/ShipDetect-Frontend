import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <>
      {/* ===== 顶部导航 ===== */}
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== 页面主体 ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>欢迎来到系统</h1>
          <div className='flex items-center space-x-2'>
            <Button variant='outline'>了解更多</Button>
          </div>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>项目简介</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                本系统用于内河船舶身份识别，提供视频检测、单图识别、数据管理等功能。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速入口</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='text-sm text-muted-foreground list-disc list-inside space-y-1'>
                <li>识别记录</li>
                <li>视频数据管理</li>
                <li>系统设置</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>公告通知</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                当前系统处于开发阶段，如遇问题请联系管理员。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ===== 系统说明卡片 ===== */}
        <div className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>系统说明</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-sm text-muted-foreground'>
              <p>
                本系统是为毕业设计开发的<strong>“内河船舶身份识别检测系统”</strong>，采用前后端分离架构，集成图像识别模型用于船舶身份提取，支持数据管理与可视化操作。
              </p>

              <div>
                <strong>功能模块：</strong>
                <ul className='list-disc list-inside'>
                  <li>仪表盘：系统概览与识别数据展示</li>
                  <li>视频数据管理：支持上传、分析与历史视频浏览</li>
                  <li>单图识别测试：上传图片进行船舶识别</li>
                  <li>船舶信息管理：维护船舶基础信息与档案</li>
                  <li>用户管理：支持多用户登录与权限管理</li>
                  <li>识别记录管理：历史识别结果归档、查阅</li>
                  <li>系统设置：参数配置与服务信息管理</li>
                  <li>帮助与说明：提供操作指南与开发背景</li>
                </ul>
              </div>

              <div>
                <strong>技术栈：</strong>
                <ul className='list-disc list-inside'>
                  <li>前端：React + Vite + TypeScript，UI 使用 shadcn/ui</li>
                  <li>后端：FastAPI 构建 REST API，接入图像识别模型</li>
                  <li>数据库：MySQL 或 MariaDB，使用 ORM 管理</li>
                  <li>部署：Docker 管理服务容器，支持多平台部署</li>
                </ul>
              </div>

              <div>
                <strong>系统特点：</strong>
                <ul className='list-disc list-inside'>
                  <li>前后端分离、功能清晰、组件统一</li>
                  <li>支持模型灵活替换，接口文档自动生成</li>
                  <li>仪表盘支持可视化展示，多端兼容</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: '主页',
    href: '/',
    isActive: true,
    disabled: false,
  },
  {
    title: '常用',
    href: '/home/common',
    isActive: false,
    disabled: true,
  },
  {
    title: '收藏',
    href: '/home/favorite',
    isActive: false,
    disabled: true,
  },
  {
    title: '更多',
    href: '/home/more',
    isActive: false,
    disabled: true,
  },
]
