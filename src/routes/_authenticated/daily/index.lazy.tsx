import { createLazyFileRoute } from '@tanstack/react-router'
import Daily from '@/features/daily'


export const Route = createLazyFileRoute('/_authenticated/daily/')({
  component: Daily,
})
