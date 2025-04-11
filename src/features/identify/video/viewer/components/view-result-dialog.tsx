import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

export type ResultItem = {
  ship_id: string
  video_id: number
  category: number
  confidence: number
  timestamp: string
  region_url: string
  bbox: string // JSON string like "[100, 150, 200, 80]"
}

interface Props {
  data: ResultItem
  onClose: () => void
}

export function ViewResultDialog({ data, onClose }: Props) {
  const [showBbox, setShowBbox] = useState(false)

  let bboxCoords: [number, number, number, number] = [0, 0, 0, 0]
  try {
    bboxCoords = JSON.parse(data.bbox) as [number, number, number, number]
  } catch (_error) {
    toast({
      title: '解析 BBox 数据失败',
      description: '请检查数据格式',
      variant: 'destructive',
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>图片预览</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-4">
          <Label htmlFor="bbox-toggle">显示 BBox</Label>
          <Switch
            id="bbox-toggle"
            checked={showBbox}
            onCheckedChange={setShowBbox}
          />
        </div>

        <div className="relative w-full overflow-hidden border rounded-md max-h-[600px]">
          <img
            src={data.region_url}
            alt="识别结果"
            className="w-full h-auto object-contain"
          />
          {showBbox && (
            <div
              className="absolute border-2 border-red-500"
              style={{
                left: bboxCoords[0],
                top: bboxCoords[1],
                width: bboxCoords[2],
                height: bboxCoords[3],
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
