import { Keyboard, type KeyboardProps } from "@divvun/keyboard"

/** Island wrapper — all behavior lives in the shared @divvun/keyboard core. */
export default function KeyboardIsland(props: KeyboardProps) {
  return <Keyboard {...props} />
}
