import { page } from "fresh"
import type { PageProps } from "fresh"
import { define } from "../../utils.ts"
import KeyboardIsland from "../../islands/Keyboard.tsx"
import {
  DeviceVariant,
  enumerateLayers,
  type KeyboardLayout,
  type LayerState,
  loadKeyboardLayout,
  Platform,
} from "@divvun/keyboard"

interface KeyboardPageData {
  layout: KeyboardLayout
  layers: LayerState[]
}

export const handler = define.handlers({
  async GET() {
    // Server-side fetch + transform — the island receives the finished
    // layout as props and never talks to GitHub from the browser.
    const loaded = await loadKeyboardLayout({
      kbd: "sme",
      layout: "se-NO",
      platform: Platform.MacOS,
      variant: DeviceVariant.Primary,
    })
    return page<KeyboardPageData>({
      layout: loaded.layout,
      layers: enumerateLayers(loaded.layout),
    })
  },
})

export default define.page(function KeyboardPage(
  { data }: PageProps<KeyboardPageData>,
) {
  return (
    <main style={{ maxWidth: "60rem", margin: "0 auto", padding: "1rem" }}>
      <h1>Northern Sami keyboard</h1>
      <KeyboardIsland
        layout={data.layout}
        layers={data.layers}
        initialLayer="default"
      />
    </main>
  )
})
