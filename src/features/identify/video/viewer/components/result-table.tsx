import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ResultItem } from './view-result-dialog'
import { useMemo, useState } from 'react'
import {
  TriangleDownIcon,
  TriangleUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
  ClockIcon,
  MarginIcon,
} from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

const CATEGORY_COLOR: Record<string, string> = {
  'ore carrier': 'bg-blue-100/60 text-blue-800 border border-blue-800',
  'bulk cargo carrier': 'bg-green-100/60 text-green-800 border border-green-800',
  'general cargo ship': 'bg-yellow-100/60 text-yellow-800 border border-yellow-800',
  'container ship': 'bg-purple-100/60 text-purple-800 border border-purple-800',
  'fishing boat': 'bg-orange-100/60 text-orange-800 border border-orange-800',
  'passenger ship': 'bg-pink-100/60 text-pink-800 border border-pink-800',
}

export function ResultTable({ data, onView }: { data: ResultItem[], onView: (item: ResultItem) => void }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ship_id: true,
    video_id: true,
    category: true,
    confidence: true,
    timestamp: true,
  })

  const columns = useMemo<ColumnDef<ResultItem>[]>(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'ship_id',
      header: '船舶ID号',
      cell: info => <div className="text-center">{info.getValue() as string}</div>,
    },
    {
      accessorKey: 'video_id',
      header: '视频源ID',
      cell: info => (
        <div className="flex justify-center">
          <span className="border-2 px-2 py-0.5 text-sm rounded">
            VideoID_{info.getValue() as string}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: '类别',
      cell: info => {
        const value = info.getValue() as string
        const colorClass = CATEGORY_COLOR[value] || 'bg-gray-200 text-gray-800'
        return (
          <div className="text-center">
            <span className={cn('px-2 py-1 rounded text-xs', colorClass)}>{value}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'confidence',
      header: '置信度',
      cell: info => (
        <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
          <MarginIcon className="h-4 w-4" />
          {(info.getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'timestamp',
      header: '时间',
      cell: info => (
        <div className="flex justify-center items-center gap-1 text-sm text-gray-600">
          <ClockIcon className="h-4 w-4" />
          {info.getValue() as string}
        </div>
      ),
    },
    {
      id: 'view',
      header: '查看效果',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => (
        <div className="text-center">
          <Button className="h-8" onClick={() => onView(row.original)}>
            查看
          </Button>
        </div>
      ),
    },
  ], [onView])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  })

  return (
    <div className="space-y-4 mt-6">
      {/* 顶部工具栏 */}
      <div className="flex justify-between items-center">
        <span>共 {data.length} 条</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">选择列数据<EyeNoneIcon className="ml-auto h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {table.getAllLeafColumns()
              .filter(column => column.id !== 'view' && column.id !== 'select')
              .map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={() => column.toggleVisibility()}
                >
                  {column.columnDef.header as string}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const sorted = header.column.getIsSorted()
                  const sortIcon = sorted === 'asc'
                    ? <TriangleUpIcon className="ml-1" />
                    : sorted === 'desc'
                      ? <TriangleDownIcon className="ml-1" />
                      : <CaretSortIcon className="ml-1" />

                  return (
                    <TableHead key={header.id} className="text-center h-10">
                      {header.id === 'view' || header.id === 'select' ? (
                        flexRender(header.column.columnDef.header, header.getContext())
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center justify-center cursor-pointer select-none px-2 py-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {sortIcon}
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>排序</DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                              value={header.column.getIsSorted() || 'none'}
                              onValueChange={(value) => {
                                if (value === 'asc') header.column.toggleSorting(false)
                                else if (value === 'desc') header.column.toggleSorting(true)
                                else header.column.clearSorting()
                              }}
                            >
                              <DropdownMenuRadioItem value='none'>默认</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value='asc'>递增</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value='desc'>递减</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioItem value='hide' onSelect={() => header.column.toggleVisibility(false)}>
                              隐藏 <EyeNoneIcon className="ml-auto h-4 w-4" />
                            </DropdownMenuRadioItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 分页 */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          上一页
        </Button>
        <Button variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          下一页
        </Button>
      </div>
    </div>
  )
}
