import { useCallback, useEffect, useState } from 'react'
import { TrashIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { AddShipDialog, ShipProfile } from './components/add-ship-dialog'
import { EditShipDialog } from './components/edit-ship-dialog'

export default function ShipManagePage() {
  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState<ShipProfile[]>([])
  const [editShip, setEditShip] = useState<ShipProfile | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleSearch = useCallback(async () => {
    const query = searchText.trim()
    const url = query
      ? `${import.meta.env.VITE_BASE_URL}/ship_id/ship_profiles/search?q=${query}`
      : `${import.meta.env.VITE_BASE_URL}/ship_id/ship_profiles`

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error('网络错误')
      const data = await res.json()
      setResults(data)
    } catch (_e) {
      toast({
        title: '加载失败',
        description: '请检查网络或后端服务',
        variant: 'destructive',
      })
    }
  }, [searchText])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/ship_id/ship_profiles/${id}`,
        {
          method: 'DELETE',
        }
      )
      if (res.ok) {
        toast({ title: '删除成功' })
        setResults(results.filter((r) => r.id !== id))
      } else {
        throw new Error()
      }
    } catch {
      toast({ title: '删除失败', variant: 'destructive' })
    } finally {
      setConfirmDeleteId(null)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  return (
    <div className='p-6'>
      <h1 className='mb-4 text-2xl font-bold'>船舶信息管理</h1>

      {/* 搜索区 */}
      <div className='mb-6 flex gap-2'>
        <Input
          placeholder='请输入船号关键词'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='max-w-md'
        />
        <Button onClick={handleSearch}>搜索</Button>
        <Button variant='outline' onClick={() => setShowAddDialog(true)}>
          + 添加船舶
        </Button>
      </div>

      {/* 卡片区 */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {results.map((ship) => (
          <Card key={ship.id} className='relative'>
            <CardHeader>
              <CardTitle className='flex items-start justify-between text-sm'>
                <span>{ship.ship_id}</span>
                <div className='flex gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-6 w-6'
                    onClick={() => setEditShip(ship)}
                  >
                    <Pencil2Icon className='h-4 w-4' />
                  </Button>

                  {editShip && (
                    <EditShipDialog
                      open={!!editShip}
                      onOpenChange={() => setEditShip(null)}
                      ship={editShip}
                      onSuccess={(updated) => {
                        setResults((prev) =>
                          prev.map((item) =>
                            item.id === updated.id ? updated : item
                          )
                        )
                      }}
                    />
                  )}
                  <Button
                    size='icon'
                    variant='ghost'
                    className='h-6 w-6'
                    onClick={() => setConfirmDeleteId(ship.id)}
                  >
                    <TrashIcon className='h-4 w-4 text-red-500' />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-1 text-xs'>
              <p>
                <b>类别：</b>
                {ship.category_name}
              </p>
              <p>
                <b>船号：</b>
                {ship.ship_id}
              </p>
              <p>
                <b>创建时间：</b>
                {ship.created_at}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 删除确认弹窗 */}
      <Dialog
        open={confirmDeleteId !== null}
        onOpenChange={() => setConfirmDeleteId(null)}
      >
        <DialogContent className='space-y-4'>
          <h2 className='text-lg font-semibold'>确认删除？</h2>
          <p className='text-sm text-muted-foreground'>删除后将无法恢复</p>
          <div className='flex justify-end gap-4'>
            <Button variant='outline' onClick={() => setConfirmDeleteId(null)}>
              取消
            </Button>
            <Button
              variant='destructive'
              onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
            >
              确认删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 添加船舶弹窗 */}
      <AddShipDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={(newShip) => setResults([...results, newShip])}
      />
    </div>
  )
}
