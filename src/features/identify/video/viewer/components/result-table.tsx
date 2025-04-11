// components/result-table.tsx
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    VisibilityState,
  } from '@tanstack/react-table'
  import { useState, useMemo } from 'react'
  import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from '@/components/ui/table'
  import { Button } from '@/components/ui/button'
  import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
  import { ResultItem } from './view-result-dialog'
  
  export function ResultTable({ data, onView }: { data: ResultItem[], onView: (item: ResultItem) => void }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
      ship_id: true,
      video_id: true,
      category: true,
      confidence: true,
      timestamp: true,
    })
  
    const columns = useMemo<ColumnDef<ResultItem>[]>(
      () => [
        {
          accessorKey: 'ship_id',
          header: 'Ship ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'video_id',
          header: 'Video ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'category',
          header: '类别',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'confidence',
          header: '置信度',
          cell: info => (info.getValue() as number).toFixed(2),
        },
        {
          accessorKey: 'timestamp',
          header: '时间',
          cell: info => info.getValue(),
        },
        {
          id: 'view',
          header: '查看',
          cell: ({ row }) => (
            <button
              className='text-blue-500 underline'
              onClick={() => onView(row.original)}
            >
              查看
            </button>
          ),
        },
      ],
      [onView]
    )
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnVisibility,
      },
      onSortingChange: setSorting,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })
  
    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <div>
            <span>共 {data.length} 条</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>列选择</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {table.getAllLeafColumns().map(column => (
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
  
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='cursor-pointer select-none'
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <div className='flex justify-end gap-2'>
          <Button variant='outline' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            上一页
          </Button>
          <Button variant='outline' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            下一页
          </Button>
        </div>
      </div>
    )
  }
  