// File: components/result-filter-card.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { MultiSelect } from './multi-select'

const CATEGORY_MAP: Record<number, string> = {
  1: 'Ore Carrier',
  2: 'Bulk Cargo Carrier',
  3: 'General Cargo Ship',
  4: 'Container Ship',
  5: 'Fishing Boat',
  6: 'Passenger Ship',
}

interface Props {
  selectedCategories: number[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
  selectedVideoIds: number[]
  setSelectedVideoIds: React.Dispatch<React.SetStateAction<number[]>>
  shipIdKeyword: string
  setShipIdKeyword: (val: string) => void
  onSearch: () => void
}

export function ResultFilterCard({
  selectedCategories,
  setSelectedCategories,
  selectedVideoIds,
  setSelectedVideoIds,
  shipIdKeyword,
  setShipIdKeyword,
  onSearch,
}: Props) {
  const [videoOptions, setVideoOptions] = useState<
    { label: string; value: number }[]
  >([])

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + '/video/get_video_ids')
      .then((res) => {
        const list = res.data as number[]
        setVideoOptions(
          list.map((id) => ({
            label: id.toString(),
            value: id,
          }))
        )
      })
  }, [])

  return (
    <Card className='mb-4 space-y-4 p-4'>
      {/* 类别选择 */}
      <div className='flex flex-wrap items-center gap-4'>
        <span className='text-sm font-medium'>船舶类别：</span>
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

      {/* 视频ID + 搜索框 */}
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>视频ID：</span>
          <MultiSelect
            placeholder='选择视频ID'
            options={videoOptions}
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
            className='rounded bg-primary px-4 py-2 text-white hover:bg-primary/90'
            onClick={onSearch}
          >
            搜索
          </button>
        </div>
      </div>
    </Card>
  )
}
