import { createLazyFileRoute } from '@tanstack/react-router'
import VideoManager from '@/features/identify/video/manager'

export const Route = createLazyFileRoute(
  '/_authenticated/identify/video/manager/',
)({
  component: VideoManager,
})