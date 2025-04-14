import { css, html, LitElement } from "npm:lit"
import { customElement, property } from "npm:lit/decorators.js"

@customElement("brl-checkbox")
export default class BrlCheckbox extends LitElement {
  @property()
  accessor checked: boolean = false

  @property()
  accessor label = ""

  @property()
  accessor name = ""

  @property()
  override accessor id = ""

  @property()
  accessor disabled = false

  @property()
  accessor required = false

  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    .checkbox-container {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input[type="checkbox"] {
      cursor: pointer;
      margin: 0;
      width: 18px;
      height: 18px;
    }
    
    input[type="checkbox"]:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    label {
      cursor: pointer;
      user-select: none;
      font-size: 14px;
    }
    
    label.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .required::after {
      content: "*";
      color: red;
      margin-left: 4px;
    }
  `

  override render() {
    const checkboxId = this.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`

    return html`
      <div class="checkbox-container">
        <input 
          type="checkbox" 
          id="${checkboxId}"
          name="${this.name}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          @change="${this.#handleChange}"
        />
        <label 
          for="${checkboxId}" 
          class="${this.disabled ? "disabled" : ""} ${this.required ? "required" : ""}"
        >${this.label}</label>
      </div>
    `
  }

  #handleChange(e: Event) {
    this.checked = (e.target as HTMLInputElement).checked
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          checked: this.checked,
          name: this.name,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "brl-checkbox": {
        id?: string
        label?: string
        name?: string
        checked?: boolean
        disabled?: boolean
        required?: boolean
        onChange?: (e: CustomEvent) => void
      }
    }
  }
}
