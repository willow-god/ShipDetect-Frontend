// File: pages/result-manager.tsx
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from '@/components/ui/table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { ResultFilterCard } from './components/result-filter-card'
import { ResultTable } from './components/result-table'
import { ViewResultDialog, ResultItem } from './components/view-result-dialog'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function ResultManager() {
  const [results, setResults] = useState<ResultItem[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([])
  const [shipIdKeyword, setShipIdKeyword] = useState('')
  const [searchShipIdKeyword, setSearchShipIdKeyword] = useState('')
  const [dialogData, setDialogData] = useState<ResultItem | null>(null)

  const fetchResults = useCallback(async () => {
    try {
      const params: Record<string, string> = {}

      if (selectedCategories.length > 0) {
        params.category_ids = selectedCategories.join(',')
      }
      if (selectedVideoIds.length > 0) {
        params.video_ids = selectedVideoIds.join(',')
      }
      if (searchShipIdKeyword.trim()) {
        params.ship_id = searchShipIdKeyword.trim()
      }

      const res = await axios.get(`${BASE_URL}/result/get_results`, {
        params,
      })

      setResults(res.data || [])
    } catch (_error) {
      toast({ title: '获取识别结果失败', variant: 'destructive' })
    }
  }, [selectedCategories, selectedVideoIds, searchShipIdKeyword])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-4 space-y-2'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>结果数据管理</h1>
            <p className='text-muted-foreground'>
              管理上传的视频所处理的结果数据，后端为 MySQL 引擎高效存储。
            </p>
          </div>
          {/* <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-2'>
              <span>船舶类别：</span>
              {Object.entries(CATEGORY_MAP).map(([id, label]) => {
                const numericId = parseInt(id)
                return (
                  <label key={id} className='flex items-center space-x-1'>
                    <Checkbox
                      checked={selectedCategories.includes(numericId)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories((prev) =>
                          checked
                            ? [...prev, numericId]
                            : prev.filter((c) => c !== numericId)
                        )
                      }}
                    />
                    <span>{label}</span>
                  </label>
                )
              })}
            </div>
            <div className='flex items-center gap-2'>
              <span>视频ID：</span>
              <MultiSelect
                placeholder='选择视频ID'
                options={Array.from(
                  new Set(results.map((r) => r.video_id))
                ).map((id) => ({
                  label: id.toString(),
                  value: id,
                }))}
                selected={selectedVideoIds}
                setSelected={setSelectedVideoIds}
              />
            </div>
            <div className='flex items-center gap-2'>
              <Input
                placeholder='根据 ship_id 搜索'
                value={shipIdKeyword}
                onChange={(e) => setShipIdKeyword(e.target.value)}
                className='w-64'
              />
              <button
                className='space-x-1'
                onClick={() => {
                  setSearchShipIdKeyword(shipIdKeyword)
                }}
              >
                搜索
              </button>
            </div>
          </div> */}
          <ResultFilterCard
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedVideoIds={selectedVideoIds}
            setSelectedVideoIds={setSelectedVideoIds}
            shipIdKeyword={shipIdKeyword}
            setShipIdKeyword={setShipIdKeyword}
            onSearch={() => setSearchShipIdKeyword(shipIdKeyword)}
          />
        </div>

        <Card>
          <CardContent>
            {/* 使用 ResultTable 组件替代原始表格 */}
            <ResultTable data={results} onView={(item) => setDialogData(item)} />
          </CardContent>
        </Card>

        {dialogData && (
          <ViewResultDialog
            data={dialogData}
            onClose={() => setDialogData(null)}
          />
        )}
      </Main>
    </>
  )
}

const topNav = [
  { title: '概览数据', href: '/dashboard', isActive: false, disabled: false },
  { title: '识别结果', href: '/results', isActive: true, disabled: false },
  { title: '视频管理', href: '/videos', isActive: false, disabled: false },
]
