import { BotPage } from "@/pages/bot/bot"
import Dashboard from "@/pages/dashboard/dashboard"

export enum ROUTE_PATHS {
  DASHBOARD = "/",
  BOT = "/bot/:id"
}

// Keys of this object should match the keys of ROUTE_PATHS
export const ROUTE_NAMES = {
  [ROUTE_PATHS.DASHBOARD]: "Dashboard"
}

export const COMPONENT_MAP_TO_ROUTE = {
  [ROUTE_PATHS.DASHBOARD]: Dashboard,
  [ROUTE_PATHS.BOT]: BotPage
}

export type ROUTE_PATHS_TYPES = keyof typeof ROUTE_PATHS
