import {
  IconLayoutDashboard,
  IconChartHistogram,
  IconDatabase,
  IconVideo,
  IconFileSearch,
  IconSettings,
  IconUser,
  IconUserCog,
  IconAdjustments,
  IconReload,
  IconShip,
  IconListDetails,
  IconDeviceAnalytics,
  IconUsersGroup,
  IconTools,
  IconHelpCircle,
  IconQuestionMark,
  IconPhoneCall,
  IconBug,
  IconFileText,
  IconLockAccess,
  IconKey,
  IconBrowserCheck,
  IconNotification,
  IconPalette,
  IconBarrierBlock,
  IconServerOff,
  IconChecklist,
  IconError404,
  IconPackages,
  IconHome,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'LiuShen',
    email: '01@liushen.fun',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: '船舶身份识别检测',
      logo: Command,
      plan: 'FastAPI + Vite + Shadcn',
    },
    {
      name: 'LiuShen',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: '清羽飞扬',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: '快速开始',
      items: [
        {
          title: '主页',
          url: '/',
          icon: IconHome,
        }
      ],
    },
    {
      title: '仪表板',
      items: [
        {
          title: '数据面板',
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: '系统状态',
          url: '/status',
          icon: IconDeviceAnalytics,
        },
        {
          title: '今日统计',
          url: '/daily',
          icon: IconChartHistogram,
        },
      ],
    },
    {
      title: '识别功能',
      items: [
        {
          title: '视频数据',
          icon: IconDatabase,
          items: [
            {
              title: '数据管理',
              url: '/identify/video/manager',
              icon: IconVideo,
            },
            {
              title: '数据查看',
              url: '/identify/video/viewer',
              icon: IconFileText,
            },
          ],
        },
        {
          title: '样例测试',
          icon: IconBug,
          items: [
            {
              title: '单图识别',
              url: '/identify/sample/picture',
              icon: IconFileSearch,
            },
            {
              title: '视频识别',
              url: '/identify/sample/video',
              icon: IconVideo,
            },
          ],
        },
        {
          title: '船号管理',
          icon: IconShip,
          url: '/identify/info',
        },
      ],
    },
    {
      title: '系统操作',
      items: [
        {
          title: '用户管理',
          icon: IconUser,
          items: [
            {
              title: '用户列表',
              url: '/settings',
              icon: IconUsersGroup,
            },
            {
              title: '管理用户',
              url: '/settings/account',
              icon: IconUserCog,
            },
          ],
        },
        {
          title: '系统参数',
          icon: IconSettings,
          items: [
            {
              title: '模型参数配置',
              url: '/settings',
              icon: IconAdjustments,
            },
            {
              title: '系统信息',
              url: '/settings/account',
              icon: IconTools,
            },
            {
              title: '重启系统',
              url: '/settings/account',
              icon: IconReload,
            },
          ],
        },
      ],
    },
    {
      title: '示例页面',
      items: [
        {
          title: '数据面板',
          icon: IconLayoutDashboard,
          items: [
            {
              title: '任务内容',
              url: '/tasks',
              icon: IconChecklist,
            },
            {
              title: '涉及应用',
              url: '/apps',
              icon: IconPackages,
            },
            {
              title: '后台消息',
              url: '/chats',
              badge: '3',
              icon: IconFileText,
            },
            {
              title: '用户管理',
              url: '/users',
              icon: IconUsersGroup,
            },
          ],
        },
        {
          title: '示例页面',
          icon: IconBrowserCheck,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
              icon: IconKey,
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
              icon: IconKey,
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
              icon: IconUser,
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
              icon: IconLockAccess,
            },
            {
              title: 'OTP',
              url: '/otp',
              icon: IconKey,
            },
          ],
        },
        {
          title: '问题页面',
          icon: IconError404,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLockAccess,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUser,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
        {
          title: '管理页面',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTools,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
      ],
    },
    {
      title: '帮助与说明',
      items: [
        {
          title: '使用说明',
          url: '/help-center',
          icon: IconHelpCircle,
        },
        {
          title: '常见问题',
          url: '/help-center',
          icon: IconQuestionMark,
        },
        {
          title: '联系方式',
          url: '/help-center',
          icon: IconPhoneCall,
        },
      ],
    },
  ],
}