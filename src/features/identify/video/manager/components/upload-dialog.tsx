import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const BASE_URL = import.meta.env.VITE_BASE_URL

export function UploadDialog({ onUpload }: { onUpload: () => void }) {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url')

  const handleUpload = async () => {
    if (uploadMethod === 'file' && file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('video_name', name)
      
      await axios.post(`${BASE_URL}/video/upload_video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    } else {
      await axios.post(`${BASE_URL}/video/add_video`, { video_name: name, video_url: url })
    }
    setOpen(false)
    setFile(null)
    setUrl('')
    setName('')
    onUpload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">添加视频</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] animate-in fade-in-50">
        <DialogHeader>
          <DialogTitle>添加新视频数据源</DialogTitle>
          <DialogDescription>
            添加新的视频数据，数据将在后台进行处理，处理完成后可在数据可视化页面查看。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              视频备注
            </Label>
            <Input placeholder="测试视频-11101" value={name} onChange={e => setName(e.target.value)}  className="col-span-3"/>
          </div>

          {/* 使用shadcn的Select组件实现上传方式选择 */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="upload-method" className="text-right">
              上传方式
            </Label>
            <div className="col-span-3" >
            <Select value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'file' | 'url')}>
              <SelectTrigger>
                <SelectValue placeholder="选择上传方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>选择上传方式</SelectLabel>
                  <SelectItem value="url">视频地址</SelectItem>
                  <SelectItem value="file">在线上传</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
          </div>

          {/* 根据选择显示不同的输入框 */}
          {uploadMethod === 'url' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="video-url" className="text-right">
                视频地址
              </Label>
              <Input placeholder="视频文件网络地址" value={url} onChange={e => setUrl(e.target.value)}  className="col-span-3"/>
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="upload" className="text-right">
                在线上传
              </Label>
              <Input type="file" placeholder="点击上传文件" accept="video/*" onChange={e => setFile(e.target.files?.[0] || null)}  className="col-span-3"/>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleUpload} disabled={!name}>
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
