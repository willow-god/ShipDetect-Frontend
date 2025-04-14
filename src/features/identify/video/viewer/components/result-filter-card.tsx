import { useEffect, useState } from 'react'
import {
  QuestionMarkCircledIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { VideoIcon, TagIcon } from 'lucide-react'
import axios from 'axios'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

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
            label: `VideoID_${id}`,
            value: id,
          }))
        )
      })
  }, [])

  return (
    <Card className='mb-4 p-4'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        {/* 左侧 筛选按钮 */}
        <div className='flex items-center gap-4'>
          {/* 类别按钮 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='h-8'>
                船舶类别
                <PlusCircledIcon className='h-4 w-4 ml-1' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              {Object.entries(CATEGORY_MAP).map(([id, label]) => {
                const numericId = parseInt(id)
                const checked = selectedCategories.includes(numericId)
                return (
                  <DropdownMenuItem
                    key={id}
                    onSelect={(e) => {
                      e.preventDefault()
                      setSelectedCategories((prev) =>
                        checked
                          ? prev.filter((v) => v !== numericId)
                          : [...prev, numericId]
                      )
                    }}
                    className='cursor-pointer space-x-2'
                  >
                    <Checkbox checked={checked} />
                    <span className='flex items-center gap-2'>
                      <TagIcon className='w-4 h-4 text-gray-500' />
                      {label}
                    </span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 视频ID按钮 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='h-8'>
                视频ID
                <PlusCircledIcon className='h-4 w-4 ml-1' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 max-h-64 overflow-y-auto'>
              {videoOptions.map((option) => {
                const checked = selectedVideoIds.includes(option.value)
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={(e) => {
                      e.preventDefault()
                      setSelectedVideoIds((prev) =>
                        checked
                          ? prev.filter((id) => id !== option.value)
                          : [...prev, option.value]
                      )
                    }}
                    className='cursor-pointer space-x-2'
                  >
                    <Checkbox checked={checked} />
                    <span className='flex items-center gap-2'>
                      <VideoIcon className='w-4 h-4 text-gray-500' />
                      {option.label}
                    </span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 右侧 搜索栏 */}
        <div className='flex items-center gap-2'>
          <Input
            placeholder='根据 ship_id 搜索'
            value={shipIdKeyword}
            onChange={(e) => setShipIdKeyword(e.target.value)}
            className='w-64 h-8'
          />
          <Button
            variant='outline'
            className='h-8 border-dashed'
            onClick={onSearch}
          >
            搜索
            <QuestionMarkCircledIcon className='h-4 w-4 ml-1' />
          </Button>
        </div>
      </div>
    </Card>
  )
}
