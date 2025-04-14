import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { ShipProfile } from './add-ship-dialog'  // 复用类型

interface EditShipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ship: ShipProfile
  onSuccess: (updated: ShipProfile) => void
}

interface Category {
  id: number
  name: string
}

export function EditShipDialog({ open, onOpenChange, ship, onSuccess }: EditShipDialogProps) {
  const [shipId, setShipId] = useState(ship.ship_id)
  const [categoryId, setCategoryId] = useState<number>(ship.category_id)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      fetch(`${import.meta.env.VITE_BASE_URL}/ship_id/categories`)
        .then(res => res.json())
        .then(data => {
          const parsed: Category[] = Object.entries(data).map(([id, name]) => ({
            id: Number(id),
            name: name as string
          }))
          setCategories(parsed)
        })
        .catch(() => toast({ title: '获取类别失败', variant: 'destructive' }))
    }
  }, [open])

  const handleSubmit = async () => {
    if (!shipId || !categoryId) {
      toast({ title: '请填写完整信息', variant: 'destructive' })
      return
    }

    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/ship_id/ship_profiles/${ship.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ship_id: shipId,
        category_id: categoryId
      })
    })

    if (res.ok) {
      const updated = await res.json()
      toast({ title: '修改成功' })
      onSuccess(updated)
      onOpenChange(false)
    } else {
      toast({ title: '修改失败', variant: 'destructive' })
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>修改船舶</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium">船号</label>
          <Input value={shipId} onChange={e => setShipId(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">类别</label>
          <Select value={categoryId.toString()} onValueChange={v => setCategoryId(Number(v))}>
            <SelectTrigger><SelectValue placeholder="请选择类别" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => (
                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={handleSubmit} disabled={loading}>{loading ? '提交中...' : '提交'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
