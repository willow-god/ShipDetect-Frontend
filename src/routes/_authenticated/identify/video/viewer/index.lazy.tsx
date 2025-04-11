import { createLazyFileRoute } from '@tanstack/react-router'
import VideoViewer from '@/features/identify/video/viewer'

export const Route = createLazyFileRoute(
  '/_authenticated/identify/video/viewer/',
)({
  component: VideoViewer,
})
