export const layout = "base.tsx"

function script(text: string) {
  return <script dangerouslySetInnerHTML={{ __html: text }} />
}

export default function Experiments() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Experiments</h2>
      <script src="/client/checkbox.js" type="module"></script>
      <div id="experiments">
        <brl-checkbox id="ui-language-name" label="Enable language map in UI language button" />
      </div>
      {script(`
        function initCheckbox(id) {
          const checkbox = document.getElementById(id)
          const enabled = JSON.parse(localStorage.getItem("borealium:experiments:" + id) ?? "false")
          if (enabled) {
            checkbox.checked = true
          }
          checkbox.addEventListener("change", (e) => {
            localStorage.setItem("borealium:experiments:" + id, e.target.checked)
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
