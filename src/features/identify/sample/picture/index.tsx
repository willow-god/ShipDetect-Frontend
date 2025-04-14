import { useState } from 'react'
import axios from 'axios'
import {
  UploadIcon,
  ImageIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Main } from '@/components/layout/main'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface DetectionResult {
  id: number
  category: string
  ship_bbox: number[]
  visualized_ship_image: string
  ship_number: string
  number_bbox: number[]
  visualized_number_on_crop: string
}

export default function PicturePage() {
  const [image, setImage] = useState<File | null>(null)
  const [results, setResults] = useState<DetectionResult[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selectedResult = results.find(r => r.id === selectedId)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImage(file)
  }

  const handleTest = async () => {
    if (!image) return
    const formData = new FormData()
    formData.append('image', image)

    try {
      const res = await axios.post(`${BASE_URL}/sample/test_image`, formData)
      setResults(res.data.results)
      if (res.data.results.length > 0) {
        setSelectedId(res.data.results[0].id)
      }
    } catch (_error) {
      toast({
        title: '上传失败',
        description: '请检查网络或文件格式',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
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
          <h1 className='text-2xl font-bold tracking-tight'>图片测试</h1>
          <div className='flex items-center space-x-2'>
            {/* <Button>导出统计数据</Button> */}
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

          {/* 上传按钮 + 下拉选择 */}
          <div className='flex justify-between items-center flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <Input type='file' accept='image/*' onChange={handleUpload} className='w-[200px]' />
              <Button onClick={handleTest}>
                <UploadIcon className='h-4 w-4' />
                上传检测
              </Button>
            </div>

            {results.length > 0 && (
              <Select onValueChange={(value) => setSelectedId(Number(value))} defaultValue={String(selectedId)}>
                <SelectTrigger className='w-[200px]'>
                  <SelectValue placeholder='选择识别结果' />
                </SelectTrigger>
                <SelectContent>
                  {results.map(res => (
                    <SelectItem key={res.id} value={String(res.id)}>
                      🚢 结果 {res.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* 空状态 */}
          {!image && (
            <div className='text-center text-muted-foreground text-sm border rounded p-6'>
              <ImageIcon className='mx-auto mb-2 h-16 w-6' />
              请上传一张图像进行识别
            </div>
          )}

          {/* 识别结果展示 */}
          {selectedResult && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

              {[
                {
                  title: '原始图像',
                  src: image ? URL.createObjectURL(image) : '',
                },
                {
                  title: '框选船舶图像',
                  src: selectedResult.visualized_ship_image,
                },
                {
                  title: 'OCR识别图像',
                  src: selectedResult.visualized_number_on_crop,
                },
              ].map(({ title, src }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <ImageIcon />
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={src}
                          alt={title}
                          className='rounded-md w-full h-[300px] object-cover cursor-zoom-in hover:scale-[1.02] transition-transform'
                        />
                      </DialogTrigger>
                      <DialogContent className='p-0'>
                        <img src={src} className='w-full h-auto max-h-[90vh] object-contain rounded-md' />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}

              {/* 信息卡片 */}
              <Card className='col-span-full md:col-span-3'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <InfoCircledIcon />
                    识别详情
                  </CardTitle>
                </CardHeader>
                <CardContent className='grid gap-2 md:grid-cols-2 text-sm'>
                  <div><strong>船舶类别：</strong>{selectedResult.category}</div>
                  <div><strong>船舶 bbox：</strong>{JSON.stringify(selectedResult.ship_bbox)}</div>
                  <div><strong>识别船号：</strong>{selectedResult.ship_number || '未识别'}</div>
                  <div><strong>船号 bbox：</strong>{JSON.stringify(selectedResult.number_bbox)}</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        </Tabs>
      </Main>
    </>
  )
}

const topNav = [
  { title: 'Picture', href: 'dashboard/picture', isActive: true, disabled: false },
  { title: 'Overview', href: 'dashboard/overview', isActive: false, disabled: false },
  { title: 'Settings', href: 'dashboard/settings', isActive: false, disabled: true },
]
