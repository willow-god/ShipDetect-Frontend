import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'

interface Option {
  label: string
  value: number
}

interface Props {
  options: Option[]
  selected: number[]
  setSelected: (value: number[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  setSelected,
  placeholder = '请选择',
}: Props) {
  const [open, setOpen] = useState(false)

  const toggleOption = (value: number) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='min-w-[200px] justify-between'
        >
          {selected.length === 0
            ? placeholder
            : `已选 ${selected.length} 个`}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleOption(option.value)}
              >
                <div className='mr-2 h-4 w-4'>
                  {selected.includes(option.value) && <Check className='h-4 w-4' />}
                </div>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
