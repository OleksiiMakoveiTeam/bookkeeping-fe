import { components } from "@/api/api"

export type Bot = components["schemas"]["Bot"]
export type FullBot = Omit<components["schemas"]["Bot"], "tasks"> & {
  tasks: components["schemas"]["Task"][]
}
export type Task = components["schemas"]["Task"]
