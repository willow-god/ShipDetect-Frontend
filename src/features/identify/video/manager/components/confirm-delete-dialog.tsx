import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'
  
  export function ConfirmDeleteDialog({
    open,
    onOpenChange,
    onConfirm,
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
  }) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">
            删除操作不可撤销，确定删除选中视频吗？
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              确认删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  