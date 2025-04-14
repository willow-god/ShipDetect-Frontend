import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from '@/hooks/use-toast'

export type ResultItem = {
  ship_id: string
  video_id: number
  category: string
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
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const bboxCoords = useMemo(() => {
    try {
      return JSON.parse(data.bbox) as [number, number, number, number]
    } catch (_error) {
      toast({
        title: '解析 BBox 数据失败',
        description: '请检查数据格式',
        variant: 'destructive',
      })
      return [0, 0, 0, 0]
    }
  }, [data.bbox])

  const [bboxStyle, setBboxStyle] = useState<React.CSSProperties>({})

  // 自动计算 BBox 的缩放显示位置
  useEffect(() => {
    if (imgRef.current && containerRef.current && showBbox) {
      const img = imgRef.current

      const naturalWidth = img.naturalWidth
      const naturalHeight = img.naturalHeight
      const displayWidth = img.clientWidth
      const displayHeight = img.clientHeight

      const scaleX = displayWidth / naturalWidth
      const scaleY = displayHeight / naturalHeight

      setBboxStyle({
        left: bboxCoords[0] * scaleX,
        top: bboxCoords[1] * scaleY,
        width: bboxCoords[2] * scaleX,
        height: bboxCoords[3] * scaleY,
        position: 'absolute',
        border: '2px solid red',
        pointerEvents: 'none',
      })
    }
  }, [showBbox, imgLoaded, bboxCoords])

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>识别结果预览</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 mt-4">
          {/* 图片预览区域 */}
          <div className="relative w-[480px] flex-shrink-0 border rounded-md overflow-hidden" ref={containerRef}>
            <img
              ref={imgRef}
              src={data.region_url}
              alt="识别结果"
              className="w-full h-auto object-contain"
              onLoad={() => setImgLoaded(true)}
              onError={() => toast({
                title: '图片加载失败',
                description: '请检查 region_url 是否正确',
                variant: 'destructive',
              })}
            />
            {showBbox && <div style={bboxStyle} />}
          </div>

          {/* 信息区域 */}
          <div className="flex flex-col gap-4 flex-1 text-sm">
            <div><strong>船舶 ID：</strong>{data.ship_id}</div>
            <div><strong>类别：</strong>{data.category}</div>
            <div><strong>视频 ID：</strong>{data.video_id}</div>
            <div><strong>置信度：</strong>{data.confidence.toFixed(2)}</div>
            <div><strong>时间戳：</strong>{data.timestamp}</div>
            <div className="flex items-center gap-2 mt-2">
              <Label htmlFor="bbox-toggle">显示 BBox</Label>
              <Switch
                id="bbox-toggle"
                checked={showBbox}
                onCheckedChange={setShowBbox}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
