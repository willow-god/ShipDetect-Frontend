import { createLazyFileRoute } from '@tanstack/react-router'
import SamplePicture from '@/features/identify/sample/picture'
export const Route = createLazyFileRoute(
  '/_authenticated/identify/sample/picture/',
)({
  component: SamplePicture,
})
