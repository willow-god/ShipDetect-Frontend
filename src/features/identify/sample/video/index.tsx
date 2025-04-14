import { useState } from 'react'
import {
  UploadIcon,
  VideoIcon,
  InfoCircledIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Main } from '@/components/layout/main'

const BASE_URL = import.meta.env.VITE_BASE_URL

interface OCRResult {
  category: string
  ship_id: string
  ship_confidence: number
  ship_id_confidence: number
  ship_bbox: number[]
  ship_id_bbox: number[]
}

interface FrameData {
  frame_id: number
  timestamp: number
  visualized_frame: string
  results: OCRResult[]
}

export default function VideoDetectPage() {
  const [video, setVideo] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [currentFrameImg, setCurrentFrameImg] = useState<string | null>(null)
  const [frameList, setFrameList] = useState<FrameData[]>([])
  const [selectedFrameId, setSelectedFrameId] = useState<number | null>(null)
  const [selectedResult, setSelectedResult] = useState<OCRResult | null>(null)
  const [showFullImage, setShowFullImage] = useState<boolean>(false)

  const selectedFrame = frameList.find(f => f.frame_id === selectedFrameId)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideo(file)
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const handleProcess = async () => {
    if (!video) return
    setFrameList([])
    setCurrentFrameImg(null)
    setSelectedFrameId(null)
    setSelectedResult(null)

    const formData = new FormData()
    formData.append('video', video)

    try {
      const response = await fetch(`${BASE_URL}/sample/test_video`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok || !response.body) {
        throw new Error('无法连接后端')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue
          try {
            const data: FrameData = JSON.parse(line)
            if (data.visualized_frame) {
              setCurrentFrameImg(`${data.visualized_frame}`)
              setFrameList(prev => [...prev, data])
              setSelectedFrameId(data.frame_id)
            }
          } catch (_e) {
            toast({
              title: '处理失败',
              description: '请检查视频格式',
              variant: 'destructive',
            })
          }
        }
      }
    } catch (_error) {
      toast({
        title: '处理失败',
        description: '请检查网络或文件格式',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <h1 className="text-2xl font-bold mb-4">视频检测</h1>
        <p className="text-sm text-muted-foreground mb-4">
          上传视频文件，点击“开始处理”按钮进行检测，检测结果将在下方展示。
          <br />
          支持的视频格式包括 MP4、AVI、MKV 等，文件大小限制为 1GB。
          <br />
          注意：处理时间可能较长，请耐心等待。
        </p>

        {/* 上传与检测 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input type="file" accept="video/*" onChange={handleUpload} className="md:w-1/2" />
          <Button onClick={handleProcess} className="w-full md:w-auto"><UploadIcon></UploadIcon>上传并处理</Button>
        </div>

        {/* 视频和帧图片展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="rounded-2xl shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><VideoIcon /> 原始视频</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[300px] bg-muted pt-6">
              {videoPreview ? (
                <video controls className="h-full rounded-lg">
                  <source src={videoPreview} type="video/mp4" />
                </video>
              ) : (
                <span className="text-muted-foreground">请上传视频</span>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><VideoIcon /> 检测帧</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[300px] bg-muted cursor-pointer pt-6" onClick={() => setShowFullImage(true)}>
              {currentFrameImg ? (
                <img src={currentFrameImg} className="max-h-full rounded-md object-contain" />
              ) : (
                <span className="text-muted-foreground">请点击“开始处理”</span>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 选择帧 + 识别结果 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* 帧选择和表格 */}
          <Card className="md:col-span-3 rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><InfoCircledIcon /> 帧选择与结果</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                disabled={frameList.length === 0}
                onValueChange={(v) => {
                  const id = Number(v)
                  setSelectedFrameId(id)
                  setSelectedResult(null)
                  const frame = frameList.find(f => f.frame_id === id)
                  if (frame) setCurrentFrameImg(`${frame.visualized_frame}`)
                }}
                value={selectedFrameId?.toString()}
              >
                <SelectTrigger><SelectValue placeholder="选择帧 ID" /></SelectTrigger>
                <SelectContent>
                  {frameList.map(frame => (
                    <SelectItem key={frame.frame_id} value={String(frame.frame_id)}>
                      帧 {frame.frame_id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 max-h-[250px] overflow-y-auto">
                {selectedFrame && (
                  <table className="w-full text-xs text-center">
                  <thead className="bg-muted">
                    <tr><th>类别</th><th>船号</th><th></th></tr>
                  </thead>
                  <tbody>
                    {selectedFrame.results.map((res, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td>{res.category}</td>
                      <td>{res.ship_id || '未识别'}</td>
                      <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedResult(res)}>
                        <EyeOpenIcon className="w-4 h-4" />
                      </Button>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 六个字段展示 */}
          {selectedResult && (
            <Card className="md:col-span-2 rounded-2xl shadow-md h-[300px] overflow-auto">
              <CardHeader>
                <CardTitle>结果详情</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-1">
                <p><b>类别：</b>{selectedResult.category}</p>
                <p><b>船号：</b>{selectedResult.ship_id}</p>
                <p><b>目标置信度：</b>{selectedResult.ship_confidence}</p>
                <p><b>目标框：</b>{JSON.stringify(selectedResult.ship_bbox)}</p>
                <p><b>船号置信度：</b>{selectedResult.ship_id_confidence}</p>
                <p><b>船号框：</b>{JSON.stringify(selectedResult.ship_id_bbox)}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 图片点击放大弹出层 */}
        {showFullImage && currentFrameImg && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center cursor-zoom-out"
            onClick={() => setShowFullImage(false)}
          >
            <img src={currentFrameImg} className="max-h-[90%] max-w-[90%] rounded-xl shadow-lg" />
          </div>
        )}
      </Main>
    </>
  )
}

const topNav = [
  { title: 'Picture', href: 'dashboard/picture', isActive: false, disabled: false },
  { title: 'Video', href: 'dashboard/video', isActive: true, disabled: false },
  { title: 'Overview', href: 'dashboard/overview', isActive: false, disabled: false },
  { title: 'Settings', href: 'dashboard/settings', isActive: false, disabled: true },
]
