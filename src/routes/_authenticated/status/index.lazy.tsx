import { createLazyFileRoute } from '@tanstack/react-router'
import Status from '@/features/status'

export const Route = createLazyFileRoute('/_authenticated/status/')({
  component: Status,
})
