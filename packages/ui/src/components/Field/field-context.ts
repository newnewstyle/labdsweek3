"use client"

import * as React from "react"

/*
 * Internal (not exported from the package): links a Field's label, description and error to
 * its control. Field creates the ids; FieldDescription / FieldError register while mounted;
 * the package's controls (Input, Textarea, Checkbox, Switch, SelectTrigger and the InputGroup /
 * Combobox inputs built on them) read the context through useFieldControlProps.
 * Props the caller passes always win.
 */

type FieldMessage = { kind: "label" | "description" | "error"; id: string }

type FieldContextValue = {
  /** Default id for the control, and FieldLabel's default htmlFor. */
  controlId: string
  /** Base for message ids: `${baseId}-description`, `${baseId}-error`. */
  baseId: string
  invalid: boolean
  messages: FieldMessage[]
  register: (message: FieldMessage) => () => void
  /** Controls without their own id, in mount order; only the first keeps controlId. */
  controls: string[]
  claimControl: (token: string) => () => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldContext() {
  return React.useContext(FieldContext)
}

/** State for a Field: ids plus the messages currently rendered inside it. */
function useFieldState(invalid: boolean): FieldContextValue {
  const baseId = `field-${React.useId().replace(/:/g, "")}`
  const [messages, setMessages] = React.useState<FieldMessage[]>([])
  const [controls, setControls] = React.useState<string[]>([])

  const register = React.useCallback((message: FieldMessage) => {
    setMessages((list) => [...list, message])
    return () =>
      setMessages((list) =>
        list.filter((m) => !(m.id === message.id && m.kind === message.kind))
      )
  }, [])

  const claimControl = React.useCallback((token: string) => {
    setControls((list) => [...list, token])
    return () => setControls((list) => list.filter((t) => t !== token))
  }, [])

  return React.useMemo(
    () => ({
      controlId: `${baseId}-control`,
      baseId,
      invalid,
      messages,
      register,
      controls,
      claimControl,
    }),
    [baseId, invalid, messages, register, controls, claimControl]
  )
}

/** Registers a description or error with the surrounding Field while it is shown. */
function useFieldMessage(kind: FieldMessage["kind"], id: string | undefined, shown = true) {
  const field = useFieldContext()
  const messageId = id ?? (field ? `${field.baseId}-${kind}` : undefined)
  const register = field?.register
  React.useEffect(() => {
    if (!register || !messageId || !shown) return
    return register({ kind, id: messageId })
  }, [register, kind, messageId, shown])
  return messageId
}

type ControlAria = {
  id?: string
  "aria-describedby"?: string
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
}

/**
 * Fills in id, aria-describedby and aria-invalid from the surrounding Field.
 * Outside a Field, returns the props unchanged.
 *
 * Only one control owns the Field's id. Every control renders it at first, so a single-control
 * Field has its id in the server HTML; after mount, controls that were not first to claim it drop
 * it, so two controls in one Field never keep a duplicate id. A control with its own id does not
 * claim.
 */
function useFieldControlProps<P extends ControlAria>(props: P): P {
  const field = useFieldContext()
  const token = React.useId()
  const claimControl = field?.claimControl
  const wantsId = props.id === undefined
  React.useEffect(() => {
    if (!claimControl || !wantsId) return
    return claimControl(token)
  }, [claimControl, wantsId, token])

  if (!field) return props
  const ownsId = field.controls.length === 0 || field.controls[0] === token

  return {
    ...props,
    id: props.id ?? (ownsId ? field.controlId : undefined),
    "aria-describedby": props["aria-describedby"] ?? describedByOf(field),
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  }
}

// description first, then error, so a screen reader reads the hint before the problem
function describedByOf(field: FieldContextValue) {
  const ids = [
    ...field.messages.filter((m) => m.kind === "description"),
    ...field.messages.filter((m) => m.kind === "error"),
  ].map((m) => m.id)
  return ids.length ? ids.join(" ") : undefined
}

type GroupAria = ControlAria & { "aria-labelledby"?: string }

/**
 * For a control that is a group of options (RadioGroup): it is not labelable, so FieldLabel's
 * htmlFor cannot name it. It gets aria-labelledby pointing at the FieldLabel instead, plus
 * aria-describedby and aria-invalid. It takes no id and does not claim the control id.
 */
function useFieldGroupProps<P extends GroupAria>(props: P): P {
  const field = useFieldContext()
  if (!field) return props
  const labelledBy = field.messages
    .filter((m) => m.kind === "label")
    .map((m) => m.id)
    .join(" ")
  return {
    ...props,
    "aria-labelledby": props["aria-labelledby"] ?? (labelledBy || undefined),
    "aria-describedby": props["aria-describedby"] ?? describedByOf(field),
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  }
}

export {
  FieldContext,
  useFieldContext,
  useFieldControlProps,
  useFieldGroupProps,
  useFieldMessage,
  useFieldState,
}
