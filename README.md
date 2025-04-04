# ShipDetect-Frontend
😀毕业设计前端仓库，实现前端页面，可视化结构

## 文件结构

```txt
ShipDetect-Frontend
├── CHANGELOG.md
├── LICENSE
├── README.md
├── components.json
├── cz.yaml
├── eslint.config.js
├── index.html
├── knip.config.ts
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   └── images
│       ├── favicon.png
│       ├── favicon.svg
│       └── shadcn-admin.png
├── src
│   ├── assets
│   │   └── vite.svg
│   ├── components
│   │   ├── coming-soon.tsx
│   │   ├── command-menu.tsx
│   │   ├── confirm-dialog.tsx
│   │   ├── layout
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── data
│   │   │   │   └── sidebar-data.ts
│   │   │   ├── header.tsx
│   │   │   ├── main.tsx
│   │   │   ├── nav-group.tsx
│   │   │   ├── nav-user.tsx
│   │   │   ├── team-switcher.tsx
│   │   │   ├── top-nav.tsx
│   │   │   └── types.ts
│   │   ├── long-text.tsx
│   │   ├── password-input.tsx
│   │   ├── pin-input.tsx
│   │   ├── profile-dropdown.tsx
│   │   ├── search.tsx
│   │   ├── select-dropdown.tsx
│   │   ├── skip-to-main.tsx
│   │   ├── theme-switch.tsx
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   ├── config
│   │   └── fonts.ts
│   ├── context
│   │   ├── font-context.tsx
│   │   ├── search-context.tsx
│   │   └── theme-context.tsx
│   ├── features
│   │   ├── apps
│   │   │   ├── data
│   │   │   │   └── apps.tsx
│   │   │   └── index.tsx
│   │   ├── auth
│   │   │   ├── auth-layout.tsx
│   │   │   ├── forgot-password
│   │   │   │   ├── components
│   │   │   │   │   └── forgot-password-form.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── otp
│   │   │   │   ├── components
│   │   │   │   │   └── otp-form.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── sign-in
│   │   │   │   ├── components
│   │   │   │   │   └── user-auth-form.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   └── sign-in-2.tsx
│   │   │   └── sign-up
│   │   │       ├── components
│   │   │       │   └── sign-up-form.tsx
│   │   │       └── index.tsx
│   │   ├── chats
│   │   │   ├── components
│   │   │   │   └── new-chat.tsx
│   │   │   ├── data
│   │   │   │   ├── chat-types.ts
│   │   │   │   └── convo.json
│   │   │   └── index.tsx
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   ├── overview.tsx
│   │   │   │   └── recent-sales.tsx
│   │   │   └── index.tsx
│   │   ├── errors
│   │   │   ├── forbidden.tsx
│   │   │   ├── general-error.tsx
│   │   │   ├── maintenance-error.tsx
│   │   │   ├── not-found-error.tsx
│   │   │   └── unauthorized-error.tsx
│   │   ├── settings
│   │   │   ├── account
│   │   │   │   ├── account-form.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── appearance
│   │   │   │   ├── appearance-form.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── components
│   │   │   │   ├── content-section.tsx
│   │   │   │   └── sidebar-nav.tsx
│   │   │   ├── display
│   │   │   │   ├── display-form.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── index.tsx
│   │   │   ├── notifications
│   │   │   │   ├── index.tsx
│   │   │   │   └── notifications-form.tsx
│   │   │   └── profile
│   │   │       ├── index.tsx
│   │   │       └── profile-form.tsx
│   │   ├── tasks
│   │   │   ├── components
│   │   │   │   ├── columns.tsx
│   │   │   │   ├── data-table-column-header.tsx
│   │   │   │   ├── data-table-faceted-filter.tsx
│   │   │   │   ├── data-table-pagination.tsx
│   │   │   │   ├── data-table-row-actions.tsx
│   │   │   │   ├── data-table-toolbar.tsx
│   │   │   │   ├── data-table-view-options.tsx
│   │   │   │   ├── data-table.tsx
│   │   │   │   ├── tasks-dialogs.tsx
│   │   │   │   ├── tasks-import-dialog.tsx
│   │   │   │   ├── tasks-mutate-drawer.tsx
│   │   │   │   └── tasks-primary-buttons.tsx
│   │   │   ├── context
│   │   │   │   └── tasks-context.tsx
│   │   │   ├── data
│   │   │   │   ├── data.tsx
│   │   │   │   ├── schema.ts
│   │   │   │   └── tasks.ts
│   │   │   └── index.tsx
│   │   └── users
│   │       ├── components
│   │       │   ├── data-table-column-header.tsx
│   │       │   ├── data-table-faceted-filter.tsx
│   │       │   ├── data-table-pagination.tsx
│   │       │   ├── data-table-row-actions.tsx
│   │       │   ├── data-table-toolbar.tsx
│   │       │   ├── data-table-view-options.tsx
│   │       │   ├── users-action-dialog.tsx
│   │       │   ├── users-columns.tsx
│   │       │   ├── users-delete-dialog.tsx
│   │       │   ├── users-dialogs.tsx
│   │       │   ├── users-invite-dialog.tsx
│   │       │   ├── users-primary-buttons.tsx
│   │       │   └── users-table.tsx
│   │       ├── context
│   │       │   └── users-context.tsx
│   │       ├── data
│   │       │   ├── data.ts
│   │       │   ├── schema.ts
│   │       │   └── users.ts
│   │       └── index.tsx
│   ├── hooks
│   │   ├── use-dialog-state.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── routeTree.gen.ts
│   ├── routes
│   │   ├── (auth)
│   │   │   ├── 500.tsx
│   │   │   ├── forgot-password.lazy.tsx
│   │   │   ├── otp.tsx
│   │   │   ├── sign-in-2.lazy.tsx
│   │   │   ├── sign-in.tsx
│   │   │   └── sign-up.lazy.tsx
│   │   ├── (errors)
│   │   │   ├── 401.lazy.tsx
│   │   │   ├── 403.lazy.tsx
│   │   │   ├── 404.lazy.tsx
│   │   │   ├── 500.lazy.tsx
│   │   │   └── 503.lazy.tsx
│   │   ├── __root.tsx
│   │   └── _authenticated
│   │       ├── apps
│   │       │   └── index.lazy.tsx
│   │       ├── chats
│   │       │   └── index.lazy.tsx
│   │       ├── help-center
│   │       │   └── index.lazy.tsx
│   │       ├── index.tsx
│   │       ├── route.tsx
│   │       ├── settings
│   │       │   ├── account.lazy.tsx
│   │       │   ├── appearance.lazy.tsx
│   │       │   ├── display.lazy.tsx
│   │       │   ├── index.lazy.tsx
│   │       │   ├── notifications.lazy.tsx
│   │       │   └── route.lazy.tsx
│   │       ├── tasks
│   │       │   └── index.lazy.tsx
│   │       └── users
│   │           └── index.lazy.tsx
│   ├── stores
│   │   └── authStore.ts
│   ├── utils
│   │   ├── auth.ts
│   │   └── handle-server-error.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```