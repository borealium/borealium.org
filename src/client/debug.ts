class Debug extends HTMLElement {
  #debug = localStorage.getItem("borealium:experiments:debug-ftl") != null

  #showKeys = false

  connectedCallback() {
    if (this.#debug) {
      this.innerHTML = "Toggle i18n keys"
      this.style.position = "fixed"
      this.style.top = "8px"
      this.style.left = "8px"
      this.style.width = "100px"
      this.style.height = "32px"
      this.style.display = "flex"
      this.style.alignItems = "center"
      this.style.justifyContent = "center"
      this.style.cursor = "pointer"
      this.style.fontSize = "10px"
      this.style.fontFamily = "monospace"
      this.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      this.style.color = "white"
      this.style.zIndex = "10000"
    }

    this.addEventListener("click", () => {
      this.#showKeys = !this.#showKeys
      if (this.#showKeys) {
        const style = document.createElement("style")
        style.id = "debug-ftl"
        style.innerHTML = `
          .ftl {
            border: 3px solid red;
            position: relative;
          }
          .debug-ftl {
            position: absolute;
            top: -8px;
            left: -16px;
            font-size: 10px;
            font-family: monospace;
            z-index: 20000;
            color: #fdd;
            text-transform: none;
            background-color: black;
            display: block;
            opacity: 0.8;
            line-height: 12px;
            padding: 2px;
          }
        `
        document.head.appendChild(style)
        for (const el of document.querySelectorAll(".ftl")) {
          const inner = document.createElement("div")
          inner.innerHTML = el.getAttribute("data-ftl-key") ?? ""
          inner.classList.add("debug-ftl")
          el.appendChild(inner)
        }
      } else {
        document.querySelector("#debug-ftl")?.remove()
        for (const el of document.querySelectorAll(".debug-ftl")) {
          el.remove()
        }
      }
    })
  }
}

customElements.define("brl-debug", Debug)
