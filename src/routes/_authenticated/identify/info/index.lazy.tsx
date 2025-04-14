import { createLazyFileRoute } from '@tanstack/react-router'
import IdentifyInfo from '@/features/identify/info'

export const Route = createLazyFileRoute('/_authenticated/identify/info/')({
  component: IdentifyInfo,
})
