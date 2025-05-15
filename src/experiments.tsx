export const layout = "base.tsx"

function script(text: string) {
  return <script dangerouslySetInnerHTML={{ __html: text }} />
}

export default function Experiments() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Experiments</h2>
      <script src="/client/checkbox.js" type="module"></script>
      <div id="experiments" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <brl-checkbox id="ui-language-name" label="Enable language map in UI language button" />
        <brl-checkbox id="debug-ftl" label="Enable debug FTL keys" />
      </div>
      {script(`
        function initCheckbox(id) {
          const checkbox = document.getElementById(id)
          const enabled = JSON.parse(localStorage.getItem("borealium:experiments:" + id) ?? "false")
          if (enabled) {
            checkbox.checked = true
          }
          checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
              localStorage.setItem("borealium:experiments:" + id, "true")
            } else {
              localStorage.removeItem("borealium:experiments:" + id)
            }
          })
        }
        
        const experiments = document.getElementById("experiments").children
        for (const experiment of experiments) {
          initCheckbox(experiment.id)
        }
      `)}
    </div>
  )
}
