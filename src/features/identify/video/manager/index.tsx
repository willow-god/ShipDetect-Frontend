import { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowDownUp } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfirmDeleteDialog } from './components/confirm-delete-dialog'
import { UploadDialog } from './components/upload-dialog'

const BASE_URL = import.meta.env.VITE_BASE_URL

type VideoItem = {
  id: number
  video_name: string
  video_url: string
  status: string
  created_at: string
}

export default function VideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [sortAsc, setSortAsc] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/video/get_all_videos`)
      setVideos(
        res.data || [
          {
            id: 0,
            video_name: '无视频',
            video_url: '无视频',
            status: '无视频',
            created_at: '无视频',
          },
        ]
      )
    } catch (_error) {
      toast({
        title: '获取视频列表失败',
        description: '请检查网络连接或服务器状态',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchVideos()
    const intervalId = setInterval(() => {
      fetchVideos()
    }, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleDelete = async () => {
    try {
      for (const id of selectedIds) {
        await axios.delete(`${BASE_URL}/video/delete_video/${id}`)
        toast({
          title: `视频ID ${id} 删除成功`,
          description: '视频数据已删除',
          variant: 'default',
        })
      }
    } catch (_error) {
      toast({
        title: '删除视频失败',
        description: '请检查网络连接或服务器状态',
        variant: 'destructive',
      })
    }
      
    setSelectedIds([])
    setOpenDelete(false)
    fetchVideos()
  }

  const handleSort = () => {
    const sorted = [...videos].sort((a, b) =>
      sortAsc ? a.id - b.id : b.id - a.id
    )
    setSortAsc(!sortAsc)
    setVideos(sorted)
  }

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>视频管理</h1>
          <div className='flex items-center space-x-2'>
            <UploadDialog onUpload={fetchVideos}/>
            <Button
              variant='destructive'
              disabled={selectedIds.length === 0}
              onClick={() => setOpenDelete(true)}
            >
              删除选中（{selectedIds.length}）
            </Button>
          </div>
        </div>

        <Tabs defaultValue='videos' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='videos'>视频列表</TabsTrigger>
            <TabsTrigger value='analytics' disabled>
              视频分析
            </TabsTrigger>
            <TabsTrigger value='reports' disabled>
              视频报告
            </TabsTrigger>
          </TabsList>

          <TabsContent value='videos' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>视频列表</CardTitle>
                <CardDescription>
                  所有上传的视频数据，后端为 MySQL 引擎高效存储。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[90px]'>选中</TableHead>
                      <TableHead className='cursor-pointer' onClick={handleSort}>
                        视频ID <ArrowDownUp className='inline h-4 w-4' />
                      </TableHead>
                      <TableHead>备注名</TableHead>
                      <TableHead>地址</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>上传时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {videos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(video.id)}
                            onCheckedChange={() => handleSelect(video.id)}
                          />
                        </TableCell>
                        <TableCell>{video.id}</TableCell>
                        <TableCell>{video.video_name}</TableCell>
                        <TableCell className='max-w-[300px] truncate'>
                          {video.video_url}
                        </TableCell>
                        <TableCell>{video.status}</TableCell>
                        <TableCell>{video.created_at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ConfirmDeleteDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          onConfirm={handleDelete}
        />
      </Main>
    </>
  )
}

const topNav = [
  {
    title: '概览数据',
    href: '/dashboard',
    isActive: false,
    disabled: false,
  },
  {
    title: '视频管理',
    href: '/videos',
    isActive: true,
    disabled: false,
  },
  {
    title: '乘客统计',
    href: '/dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: '船号统计',
    href: '/dashboard/products',
    isActive: false,
    disabled: true,
  },
]