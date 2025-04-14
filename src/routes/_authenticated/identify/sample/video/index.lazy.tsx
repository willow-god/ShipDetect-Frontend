import { createLazyFileRoute } from '@tanstack/react-router'
import SampleVideo from '@/features/identify/sample/video'

export const Route = createLazyFileRoute(
  '/_authenticated/identify/sample/video/',
)({
  component: SampleVideo,
})

