import type { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

/** List look: `default` = pill on a grey track, `line` = underline. */
type TabsListVariant = "default" | "line"

type TabsListProps = TabsPrimitive.List.Props & { variant?: TabsListVariant }

export type { TabsListProps, TabsListVariant }
