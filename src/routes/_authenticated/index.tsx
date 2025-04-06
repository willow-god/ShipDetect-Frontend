import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/features'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
})
