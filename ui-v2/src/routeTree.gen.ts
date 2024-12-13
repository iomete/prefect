/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as WorkPoolsImport } from './routes/work-pools'
import { Route as VariablesImport } from './routes/variables'
import { Route as SettingsImport } from './routes/settings'
import { Route as NotificationsImport } from './routes/notifications'
import { Route as EventsImport } from './routes/events'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as ConcurrencyLimitsImport } from './routes/concurrency-limits'
import { Route as BlocksImport } from './routes/blocks'
import { Route as AutomationsImport } from './routes/automations'
import { Route as IndexImport } from './routes/index'
import { Route as RunsIndexImport } from './routes/runs/index'
import { Route as FlowsIndexImport } from './routes/flows/index'
import { Route as DeploymentsIndexImport } from './routes/deployments/index'
import { Route as RunsFlowRunIdImport } from './routes/runs/flow-run.$id'
import { Route as FlowsFlowIdImport } from './routes/flows/flow.$id'
import { Route as DeploymentsDeploymentIdImport } from './routes/deployments/deployment.$id'

// Create/Update Routes

const WorkPoolsRoute = WorkPoolsImport.update({
  id: '/work-pools',
  path: '/work-pools',
  getParentRoute: () => rootRoute,
} as any)

const VariablesRoute = VariablesImport.update({
  id: '/variables',
  path: '/variables',
  getParentRoute: () => rootRoute,
} as any)

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const NotificationsRoute = NotificationsImport.update({
  id: '/notifications',
  path: '/notifications',
  getParentRoute: () => rootRoute,
} as any)

const EventsRoute = EventsImport.update({
  id: '/events',
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const ConcurrencyLimitsRoute = ConcurrencyLimitsImport.update({
  id: '/concurrency-limits',
  path: '/concurrency-limits',
  getParentRoute: () => rootRoute,
} as any)

const BlocksRoute = BlocksImport.update({
  id: '/blocks',
  path: '/blocks',
  getParentRoute: () => rootRoute,
} as any)

const AutomationsRoute = AutomationsImport.update({
  id: '/automations',
  path: '/automations',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RunsIndexRoute = RunsIndexImport.update({
  id: '/runs/',
  path: '/runs/',
  getParentRoute: () => rootRoute,
} as any)

const FlowsIndexRoute = FlowsIndexImport.update({
  id: '/flows/',
  path: '/flows/',
  getParentRoute: () => rootRoute,
} as any)

const DeploymentsIndexRoute = DeploymentsIndexImport.update({
  id: '/deployments/',
  path: '/deployments/',
  getParentRoute: () => rootRoute,
} as any)

const RunsFlowRunIdRoute = RunsFlowRunIdImport.update({
  id: '/runs/flow-run/$id',
  path: '/runs/flow-run/$id',
  getParentRoute: () => rootRoute,
} as any)

const FlowsFlowIdRoute = FlowsFlowIdImport.update({
  id: '/flows/flow/$id',
  path: '/flows/flow/$id',
  getParentRoute: () => rootRoute,
} as any)

const DeploymentsDeploymentIdRoute = DeploymentsDeploymentIdImport.update({
  id: '/deployments/deployment/$id',
  path: '/deployments/deployment/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/automations': {
      id: '/automations'
      path: '/automations'
      fullPath: '/automations'
      preLoaderRoute: typeof AutomationsImport
      parentRoute: typeof rootRoute
    }
    '/blocks': {
      id: '/blocks'
      path: '/blocks'
      fullPath: '/blocks'
      preLoaderRoute: typeof BlocksImport
      parentRoute: typeof rootRoute
    }
    '/concurrency-limits': {
      id: '/concurrency-limits'
      path: '/concurrency-limits'
      fullPath: '/concurrency-limits'
      preLoaderRoute: typeof ConcurrencyLimitsImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsImport
      parentRoute: typeof rootRoute
    }
    '/notifications': {
      id: '/notifications'
      path: '/notifications'
      fullPath: '/notifications'
      preLoaderRoute: typeof NotificationsImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/variables': {
      id: '/variables'
      path: '/variables'
      fullPath: '/variables'
      preLoaderRoute: typeof VariablesImport
      parentRoute: typeof rootRoute
    }
    '/work-pools': {
      id: '/work-pools'
      path: '/work-pools'
      fullPath: '/work-pools'
      preLoaderRoute: typeof WorkPoolsImport
      parentRoute: typeof rootRoute
    }
    '/deployments/': {
      id: '/deployments/'
      path: '/deployments'
      fullPath: '/deployments'
      preLoaderRoute: typeof DeploymentsIndexImport
      parentRoute: typeof rootRoute
    }
    '/flows/': {
      id: '/flows/'
      path: '/flows'
      fullPath: '/flows'
      preLoaderRoute: typeof FlowsIndexImport
      parentRoute: typeof rootRoute
    }
    '/runs/': {
      id: '/runs/'
      path: '/runs'
      fullPath: '/runs'
      preLoaderRoute: typeof RunsIndexImport
      parentRoute: typeof rootRoute
    }
    '/deployments/deployment/$id': {
      id: '/deployments/deployment/$id'
      path: '/deployments/deployment/$id'
      fullPath: '/deployments/deployment/$id'
      preLoaderRoute: typeof DeploymentsDeploymentIdImport
      parentRoute: typeof rootRoute
    }
    '/flows/flow/$id': {
      id: '/flows/flow/$id'
      path: '/flows/flow/$id'
      fullPath: '/flows/flow/$id'
      preLoaderRoute: typeof FlowsFlowIdImport
      parentRoute: typeof rootRoute
    }
    '/runs/flow-run/$id': {
      id: '/runs/flow-run/$id'
      path: '/runs/flow-run/$id'
      fullPath: '/runs/flow-run/$id'
      preLoaderRoute: typeof RunsFlowRunIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/automations': typeof AutomationsRoute
  '/blocks': typeof BlocksRoute
  '/concurrency-limits': typeof ConcurrencyLimitsRoute
  '/dashboard': typeof DashboardRoute
  '/events': typeof EventsRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
  '/variables': typeof VariablesRoute
  '/work-pools': typeof WorkPoolsRoute
  '/deployments': typeof DeploymentsIndexRoute
  '/flows': typeof FlowsIndexRoute
  '/runs': typeof RunsIndexRoute
  '/deployments/deployment/$id': typeof DeploymentsDeploymentIdRoute
  '/flows/flow/$id': typeof FlowsFlowIdRoute
  '/runs/flow-run/$id': typeof RunsFlowRunIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/automations': typeof AutomationsRoute
  '/blocks': typeof BlocksRoute
  '/concurrency-limits': typeof ConcurrencyLimitsRoute
  '/dashboard': typeof DashboardRoute
  '/events': typeof EventsRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
  '/variables': typeof VariablesRoute
  '/work-pools': typeof WorkPoolsRoute
  '/deployments': typeof DeploymentsIndexRoute
  '/flows': typeof FlowsIndexRoute
  '/runs': typeof RunsIndexRoute
  '/deployments/deployment/$id': typeof DeploymentsDeploymentIdRoute
  '/flows/flow/$id': typeof FlowsFlowIdRoute
  '/runs/flow-run/$id': typeof RunsFlowRunIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/automations': typeof AutomationsRoute
  '/blocks': typeof BlocksRoute
  '/concurrency-limits': typeof ConcurrencyLimitsRoute
  '/dashboard': typeof DashboardRoute
  '/events': typeof EventsRoute
  '/notifications': typeof NotificationsRoute
  '/settings': typeof SettingsRoute
  '/variables': typeof VariablesRoute
  '/work-pools': typeof WorkPoolsRoute
  '/deployments/': typeof DeploymentsIndexRoute
  '/flows/': typeof FlowsIndexRoute
  '/runs/': typeof RunsIndexRoute
  '/deployments/deployment/$id': typeof DeploymentsDeploymentIdRoute
  '/flows/flow/$id': typeof FlowsFlowIdRoute
  '/runs/flow-run/$id': typeof RunsFlowRunIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/automations'
    | '/blocks'
    | '/concurrency-limits'
    | '/dashboard'
    | '/events'
    | '/notifications'
    | '/settings'
    | '/variables'
    | '/work-pools'
    | '/deployments'
    | '/flows'
    | '/runs'
    | '/deployments/deployment/$id'
    | '/flows/flow/$id'
    | '/runs/flow-run/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/automations'
    | '/blocks'
    | '/concurrency-limits'
    | '/dashboard'
    | '/events'
    | '/notifications'
    | '/settings'
    | '/variables'
    | '/work-pools'
    | '/deployments'
    | '/flows'
    | '/runs'
    | '/deployments/deployment/$id'
    | '/flows/flow/$id'
    | '/runs/flow-run/$id'
  id:
    | '__root__'
    | '/'
    | '/automations'
    | '/blocks'
    | '/concurrency-limits'
    | '/dashboard'
    | '/events'
    | '/notifications'
    | '/settings'
    | '/variables'
    | '/work-pools'
    | '/deployments/'
    | '/flows/'
    | '/runs/'
    | '/deployments/deployment/$id'
    | '/flows/flow/$id'
    | '/runs/flow-run/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AutomationsRoute: typeof AutomationsRoute
  BlocksRoute: typeof BlocksRoute
  ConcurrencyLimitsRoute: typeof ConcurrencyLimitsRoute
  DashboardRoute: typeof DashboardRoute
  EventsRoute: typeof EventsRoute
  NotificationsRoute: typeof NotificationsRoute
  SettingsRoute: typeof SettingsRoute
  VariablesRoute: typeof VariablesRoute
  WorkPoolsRoute: typeof WorkPoolsRoute
  DeploymentsIndexRoute: typeof DeploymentsIndexRoute
  FlowsIndexRoute: typeof FlowsIndexRoute
  RunsIndexRoute: typeof RunsIndexRoute
  DeploymentsDeploymentIdRoute: typeof DeploymentsDeploymentIdRoute
  FlowsFlowIdRoute: typeof FlowsFlowIdRoute
  RunsFlowRunIdRoute: typeof RunsFlowRunIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AutomationsRoute: AutomationsRoute,
  BlocksRoute: BlocksRoute,
  ConcurrencyLimitsRoute: ConcurrencyLimitsRoute,
  DashboardRoute: DashboardRoute,
  EventsRoute: EventsRoute,
  NotificationsRoute: NotificationsRoute,
  SettingsRoute: SettingsRoute,
  VariablesRoute: VariablesRoute,
  WorkPoolsRoute: WorkPoolsRoute,
  DeploymentsIndexRoute: DeploymentsIndexRoute,
  FlowsIndexRoute: FlowsIndexRoute,
  RunsIndexRoute: RunsIndexRoute,
  DeploymentsDeploymentIdRoute: DeploymentsDeploymentIdRoute,
  FlowsFlowIdRoute: FlowsFlowIdRoute,
  RunsFlowRunIdRoute: RunsFlowRunIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/automations",
        "/blocks",
        "/concurrency-limits",
        "/dashboard",
        "/events",
        "/notifications",
        "/settings",
        "/variables",
        "/work-pools",
        "/deployments/",
        "/flows/",
        "/runs/",
        "/deployments/deployment/$id",
        "/flows/flow/$id",
        "/runs/flow-run/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/automations": {
      "filePath": "automations.tsx"
    },
    "/blocks": {
      "filePath": "blocks.tsx"
    },
    "/concurrency-limits": {
      "filePath": "concurrency-limits.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/events": {
      "filePath": "events.tsx"
    },
    "/notifications": {
      "filePath": "notifications.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/variables": {
      "filePath": "variables.tsx"
    },
    "/work-pools": {
      "filePath": "work-pools.tsx"
    },
    "/deployments/": {
      "filePath": "deployments/index.tsx"
    },
    "/flows/": {
      "filePath": "flows/index.tsx"
    },
    "/runs/": {
      "filePath": "runs/index.tsx"
    },
    "/deployments/deployment/$id": {
      "filePath": "deployments/deployment.$id.tsx"
    },
    "/flows/flow/$id": {
      "filePath": "flows/flow.$id.tsx"
    },
    "/runs/flow-run/$id": {
      "filePath": "runs/flow-run.$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
