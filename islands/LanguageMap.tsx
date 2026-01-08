import { useEffect, useRef } from "preact/hooks"
import * as d3 from "d3"
import { decode as decodeCbor } from "cbor2"

interface LanguageNode {
  autonym: string
  title: string
  code: string
  coordinates: [number, number]
  labelPosition?: "top" | "right" | "bottom" | "left"
}

interface LanguageMapProps {
  baseNodes: LanguageNode[]
  lang: string
}

export default function LanguageMap({ baseNodes, lang }: LanguageMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) { return }
    initialized.current = true // Register the custom element
    ;(() => {
      // Only define the custom element if not already defined
      if (!customElements.get("brl-language-map")) {
        class LanguageMapElement extends HTMLElement {
          shapes: any
          #cleanup?: () => void
          #observer?: MutationObserver
          #_baseNodes: any
          #lang: string = "en"

          constructor() {
            super()
          }

          static get observedAttributes() {
            return ["baseNodes", "lang"]
          }

          get baseNodes() {
            if (!this.#_baseNodes) {
              this.#_baseNodes = JSON.parse(
                this.getAttribute("baseNodes") || "[]",
              )
            }
            return this.#_baseNodes
          }

          #buildUI() {
            const { shapes, baseNodes } = this
            const langPrefix = this.getAttribute("lang") || "en"
            const shadow = this.attachShadow({ mode: "open" })

            const graph = document.createElement("div")
            graph.classList.add("graph")

            const style = document.createElement("style")
            style.innerHTML = `
              .expand-button {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                border: none;
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
              }
              .expand-button:hover { background: #f0f0f0; }
              .expand-button svg { width: 24px; height: 24px; }
              .language-button {
                position: absolute;
                bottom: 16px;
                right: 16px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                border: none;
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
              }
              .language-button:hover { background: #f0f0f0; }
              .language-button svg { width: 24px; height: 24px; }
              .graph {
                position: relative;
                height: 412px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .graph.expanded {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: white;
                z-index: 10000;
              }
              .graph svg { display: block; }
            `

            shadow.appendChild(style)

            const expandButton = document.createElement("button")
            expandButton.classList.add("expand-button")
            expandButton.setAttribute("aria-label", "Expand graph")
            expandButton.setAttribute("type", "button")
            expandButton.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            `
            graph.appendChild(expandButton)

            let isExpanded = false
            let isOriginalLanguage = true

            const translateOnIcon = `<svg viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
            </svg>`
            const translateOffIcon = `<svg viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
            </svg>`

            shadow.appendChild(graph)

            const container = d3.select(graph).node() as HTMLElement
            const baseWidth = 800
            const baseHeight = 1200

            const svg = d3
              .select(graph)
              .append("svg")
              .style("display", "block")
              .style("position", "absolute")
              .style("margin", "auto")

            const pathGroup = svg.append("g")
            const nodeGroup = svg.append("g")
            const labelGroup = svg.append("g")

            const countries = [
              { id: "SE", data: shapes.SE },
              { id: "NO", data: shapes.NO },
              { id: "FO", data: shapes.FO },
              { id: "DK", data: shapes.DK },
              { id: "GL", data: shapes.GL },
              { id: "RU", data: shapes.RU },
              { id: "FI", data: shapes.FI },
              { id: "IS", data: shapes.IS },
            ]

            // Transform country coordinates
            this.#transformCountries(shapes)

            const NORDIC_BOUNDS = {
              longitude: [-4.5, 39],
              latitude: [72, 52],
            }

            const COLORS = {
              background: "hsl(180, 19%, 94%)",
              primary: "hsl(197, 76%, 15%)",
              white: "rgba(255, 255, 255, 0.95)",
              border: "#b1c3d0",
              brand: { blue: "#159dd7", green: "#04bf93" },
            }

            const BASE_FONT_SIZE = 18
            const MIN_FONT_SIZE = 9
            const MAX_FONT_SIZE = 32

            const zoom = (d3.zoom() as any)
              .scaleExtent([1, 8])
              .translateExtent([[0, 0], [baseWidth, baseHeight]])
              .extent([[0, 0], [baseWidth, baseHeight]])
              .filter((event: any) => {
                const isExp = d3.select(graph).classed("expanded")
                const transform = d3.zoomTransform(svg.node() as Element)
                if (isExp && event.type === "mousedown") { return true }
                return (transform.k > 1 || event.type === "zoom") &&
                  !event.button
              })

            svg.call(zoom as any)

            // Variables for label hover effects
            let labelBackgrounds: any
            let connectors: any
            let labels: any
            let node: any

            const updateViz = () => {
              const containerWidth = Math.min(
                document.body.clientWidth || 0,
                container.clientWidth || 0,
              )
              const containerHeight = Math.min(
                document.body.clientHeight || 0,
                container.clientHeight || 0,
              )

              svg.selectAll("rect.ocean").remove()
              svg
                .insert("rect", ":first-child")
                .attr("class", "ocean")
                .attr("width", containerWidth)
                .attr("height", containerHeight)
                .attr("fill", COLORS.brand.blue)
                .attr("opacity", 0.2)

              const projection = d3
                .geoConicConformal()
                .center([10, 63])
                .rotate([-10, 0])
                .parallels([80, 100])
                .fitExtent(
                  [[0, 0], [containerWidth, containerHeight]],
                  {
                    type: "Feature",
                    geometry: {
                      type: "MultiPoint",
                      coordinates: [
                        [NORDIC_BOUNDS.longitude[0], NORDIC_BOUNDS.latitude[0]],
                        [NORDIC_BOUNDS.longitude[1], NORDIC_BOUNDS.latitude[1]],
                      ],
                    },
                  } as any,
                )

              svg.style("width", `${containerWidth}px`).style(
                "height",
                `${containerHeight}px`,
              )
              pathGroup.selectAll("path").remove()

              countries.forEach((country) => {
                this.#drawCountry(
                  country.data,
                  projection,
                  pathGroup,
                  COLORS,
                  d3,
                )
              })

              const nodes = baseNodes.map((n: any) => {
                const [x, y] = projection(n.coordinates) as [number, number]
                return {
                  id: n.autonym,
                  title: n.title,
                  url: `/${langPrefix}/language/${n.code}`,
                  x,
                  y,
                  fx: x,
                  fy: y,
                  labelPosition: n.labelPosition,
                }
              })

              const nodeXs = nodes.map((d: any) => d.fx)
              const nodeYs = nodes.map((d: any) => d.fy)
              const minX = Math.min(...nodeXs) - 100
              const maxX = Math.max(...nodeXs) + 100
              const minY = Math.min(...nodeYs) - 100
              const maxY = Math.max(...nodeYs) + 100

              zoom
                .translateExtent([[minX, minY], [maxX, maxY]])
                .extent([[0, 0], [containerWidth, containerHeight]])

              // Voronoi computation
              const voronoi = d3.Delaunay.from(
                nodes,
                (d: any) => d.fx,
                (d: any) => d.fy,
              ).voronoi([0, 0, containerWidth, containerHeight])

              // Voronoi cells for click-to-zoom
              nodeGroup
                .selectAll("path.voronoi")
                .data(nodes)
                .join("path")
                .attr("class", "voronoi")
                .attr("d", (_d: any, i: number) => voronoi.renderCell(i))
                .attr("fill", "transparent")
                .attr("opacity", 0)
                .attr("pointer-events", "all")
                .style("cursor", "zoom-in")
                .on("click", function (this: any, event: any, d: any) {
                  event.stopPropagation()
                  const currentTransform = d3.zoomTransform(
                    svg.node() as Element,
                  )
                  const isExp = d3.select(graph).classed("expanded")

                  if (
                    currentTransform.k > 1 &&
                    Math.abs(
                        currentTransform.x - (containerWidth / 2 - d.fx * 4),
                      ) < 1 &&
                    Math.abs(
                        currentTransform.y - (containerHeight / 2 - d.fy * 4),
                      ) < 1
                  ) {
                    svg
                      .transition()
                      .duration(750)
                      .call(zoom.transform, d3.zoomIdentity)
                      .on("end", () => {
                        if (!isExp) {
                          svg.call(zoom.filter(() => false))
                        }
                      })
                  } else {
                    svg.call(
                      zoom.filter((event: any) => {
                        const transform = d3.zoomTransform(
                          svg.node() as Element,
                        )
                        const isExpanded = d3.select(graph).classed("expanded")
                        return (transform.k > 1 || isExpanded ||
                          event.type === "zoom") && !event.button
                      }),
                    )

                    const scale = 4
                    const x = containerWidth / 2 - d.fx * scale
                    const y = containerHeight / 2 - d.fy * scale

                    svg
                      .transition()
                      .duration(750)
                      .call(
                        zoom.transform,
                        d3.zoomIdentity.translate(x, y).scale(scale),
                      )
                  }
                })
                .on("mouseover", function (this: any, _event: any, d: any) {
                  const currentTransform = d3.zoomTransform(
                    svg.node() as Element,
                  )
                  const isZoomedToThis = currentTransform.k > 1 &&
                    Math.abs(
                        currentTransform.x - (containerWidth / 2 - d.fx * 4),
                      ) < 1 &&
                    Math.abs(
                        currentTransform.y - (containerHeight / 2 - d.fy * 4),
                      ) < 1
                  d3.select(this).style(
                    "cursor",
                    isZoomedToThis ? "zoom-out" : "zoom-in",
                  )
                })
                .on("mouseout", function (this: any) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("fill", "transparent")
                    .attr("opacity", 0)
                })

              // Nodes (circles)
              node = nodeGroup
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("class", "node")
                .attr("r", 5)
                .attr("cx", (d: any) => d.fx)
                .attr("cy", (d: any) => d.fy)
                .style("cursor", "pointer")
                .style("fill", COLORS.white)
                .style("stroke", COLORS.border)
                .on("mouseover", function (this: any, _event: any, d: any) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", COLORS.brand.green)
                    .style("stroke", COLORS.brand.green)

                  if (labelBackgrounds) {
                    labelBackgrounds
                      .filter((l: any) => l.node.id === d.id)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.brand.green)
                      .attr("fill", COLORS.background)
                  }

                  if (connectors) {
                    connectors
                      .filter((l: any) => l.node.id === d.id)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.brand.green)
                  }
                })
                .on("mouseout", function (this: any, _event: any, d: any) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", COLORS.white)
                    .style("stroke", COLORS.border)

                  if (labelBackgrounds) {
                    labelBackgrounds
                      .filter((l: any) => l.node.id === d.id)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.border)
                      .attr("fill", COLORS.white)
                  }

                  if (connectors) {
                    connectors
                      .filter((l: any) => l.node.id === d.id)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.border)
                  }
                })
                .on("click", (_event: any, d: any) => {
                  _event.stopPropagation()
                  window.location.href = d.url
                })
                .raise()

              const LABEL_OFFSET_Y = -15

              const labelData = nodes.map((n: any) => ({
                node: n,
                x: n.fx,
                y: n.fy + LABEL_OFFSET_Y,
                width: 0,
                height: 0,
                angle: 0,
                connectorPath: "",
              }))

              // Label backgrounds
              labelBackgrounds = labelGroup
                .selectAll("rect.label-bg")
                .data(labelData)
                .join("rect")
                .attr("class", "label-bg")
                .attr("fill", COLORS.white)
                .attr("stroke", COLORS.border)
                .attr("rx", 4)
                .attr("ry", 4)
                .style("cursor", "pointer")
                .attr("pointer-events", "all")
                .on("mouseover", function (this: any, _event: any, d: any) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("stroke", COLORS.brand.green)
                    .attr("fill", COLORS.background)

                  if (connectors) {
                    connectors
                      .filter((l: any) => l === d)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.brand.green)
                  }

                  if (node) {
                    node
                      .filter((n: any) => n === d.node)
                      .transition()
                      .duration(200)
                      .style("fill", COLORS.brand.green)
                      .style("stroke", COLORS.brand.green)
                  }
                })
                .on("mouseout", function (this: any, _event: any, d: any) {
                  d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("stroke", COLORS.border)
                    .attr("fill", COLORS.white)

                  if (connectors) {
                    connectors
                      .filter((l: any) => l === d)
                      .transition()
                      .duration(200)
                      .attr("stroke", COLORS.border)
                  }

                  if (node) {
                    node
                      .filter((n: any) => n === d.node)
                      .transition()
                      .duration(200)
                      .style("fill", COLORS.white)
                      .style("stroke", COLORS.border)
                  }
                })
                .on("click", (_event: any, d: any) => {
                  _event.stopPropagation()
                  window.location.href = d.node.url
                })

              // Labels
              labels = labelGroup
                .selectAll("text")
                .data(labelData)
                .join("text")
                .text((d: any) => isOriginalLanguage ? d.node.id : d.node.title)
                .attr(
                  "font-family",
                  "'Noto Sans', 'Noto Sans Hebrew', sans-serif",
                )
                .attr("font-size", "12px")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("fill", COLORS.primary)
                .attr("font-weight", "bold")
                .attr("pointer-events", "none")

              // Connectors
              connectors = labelGroup
                .selectAll("path.connector")
                .data(labelData)
                .join("path")
                .attr("class", "connector")
                .attr("fill", "none")
                .attr("stroke", COLORS.border)
                .attr("pointer-events", "none")

              // Measure text dimensions
              labels.each(function (this: any, d: any) {
                const bbox = this.getBBox()
                d.width = bbox.width + 12
                d.height = bbox.height + 12
              })

              // Calculate label positions
              function calculateLabelPositions() {
                const BASE_OFFSET = 25

                labelData.forEach((d: any) => {
                  const position = d.node.labelPosition || "top"

                  switch (position) {
                    case "top":
                      d.x = d.node.fx
                      d.y = d.node.fy - BASE_OFFSET - d.height / 2
                      d.connectorPath = `M ${d.node.fx},${
                        d.node.fy - 5
                      } C ${d.node.fx},${d.node.fy - 5} ${d.x},${
                        d.y + d.height / 2
                      } ${d.x},${d.y + d.height / 2}`
                      break
                    case "right":
                      d.x = d.node.fx + BASE_OFFSET + d.width / 2
                      d.y = d.node.fy
                      d.connectorPath = `M ${d.node.fx + 5},${d.node.fy} C ${
                        d.node.fx + 5
                      },${d.node.fy} ${d.x - d.width / 2},${d.y} ${
                        d.x - d.width / 2
                      },${d.y}`
                      break
                    case "bottom":
                      d.x = d.node.fx
                      d.y = d.node.fy + BASE_OFFSET + d.height / 2
                      d.connectorPath = `M ${d.node.fx},${
                        d.node.fy + 5
                      } C ${d.node.fx},${d.node.fy + 5} ${d.x},${
                        d.y - d.height / 2
                      } ${d.x},${d.y - d.height / 2}`
                      break
                    case "left":
                      d.x = d.node.fx - BASE_OFFSET - d.width / 2
                      d.y = d.node.fy
                      d.connectorPath = `M ${d.node.fx - 5},${d.node.fy} C ${
                        d.node.fx - 5
                      },${d.node.fy} ${d.x + d.width / 2},${d.y} ${
                        d.x + d.width / 2
                      },${d.y}`
                      break
                  }
                })
              }

              // Update labels with scale
              function updateLabelsWithScale(scale = 1) {
                const cWidth = container.clientWidth || 0
                const pixelRatio = window.devicePixelRatio || 1

                const responsiveFontSize = Math.min(
                  MAX_FONT_SIZE,
                  Math.max(
                    MIN_FONT_SIZE,
                    (BASE_FONT_SIZE * 0.3 * cWidth * pixelRatio) /
                      (baseWidth * pixelRatio),
                  ),
                )

                const moderatedScale = 1
                const finalFontSize = responsiveFontSize * moderatedScale

                labels.style("font-size", `${finalFontSize}px`)

                labels.each(function (this: any, d: any) {
                  const bbox = this.getBBox()
                  d.width = bbox.width + finalFontSize
                  d.height = bbox.height + finalFontSize
                })

                calculateLabelPositions()

                labelBackgrounds
                  .attr("x", (d: any) => d.x - d.width / 2)
                  .attr("y", (d: any) => d.y - d.height / 2)
                  .attr("width", (d: any) => d.width)
                  .attr("height", (d: any) => d.height)
                  .attr("rx", 4 * moderatedScale)
                  .attr("ry", 4 * moderatedScale)

                labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)

                connectors.attr("d", (d: any) => d.connectorPath)

                nodeGroup
                  .selectAll("circle")
                  .style("stroke-width", `${moderatedScale / 1.05}`)

                labelBackgrounds.attr(
                  "stroke-width",
                  `${moderatedScale / 1.05}`,
                )
                connectors.attr("stroke-width", `${moderatedScale / 1.05}`)
                pathGroup.selectAll("path").attr(
                  "stroke-width",
                  `${moderatedScale / 3}`,
                )
              }

              updateLabelsWithScale(1)

              zoom.on("zoom", (event: any) => {
                pathGroup.attr("transform", event.transform)
                nodeGroup.attr("transform", event.transform)
                labelGroup.attr("transform", event.transform)
                updateLabelsWithScale(event.transform.k)
              })

              svg.on("click", (event: any) => {
                if (event.target === svg.node()) {
                  svg.transition().duration(750).call(
                    zoom.transform,
                    d3.zoomIdentity,
                  )
                }
              })

              pathGroup.selectAll("path").attr("stroke", COLORS.border)

              this.#observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                  if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "class"
                  ) {
                    const isExp = d3.select(graph).classed("expanded")
                    if (!isExp) {
                      document.body.style.overflow = "auto"
                      svg.transition().duration(750).call(
                        zoom.transform,
                        d3.zoomIdentity,
                      )
                    } else {
                      document.body.style.overflow = "hidden"
                    }
                  }
                })
              })

              this.#observer.observe(graph, {
                attributes: true,
                attributeFilter: ["class"],
              })
            }

            // Language toggle button
            const languageButton = document.createElement("button")
            languageButton.classList.add("language-button")
            languageButton.setAttribute("aria-label", "Change language display")
            languageButton.setAttribute("type", "button")
            languageButton.innerHTML = isOriginalLanguage
              ? translateOffIcon
              : translateOnIcon
            graph.appendChild(languageButton)

            languageButton.addEventListener("click", () => {
              isOriginalLanguage = !isOriginalLanguage
              if (labels) {
                labels.text((d: any) =>
                  isOriginalLanguage ? d.node.id : d.node.title
                )
              }
              languageButton.innerHTML = isOriginalLanguage
                ? translateOffIcon
                : translateOnIcon
              updateViz()
            })

            expandButton.addEventListener("click", () => {
              isExpanded = !isExpanded
              graph.classList.toggle("expanded")
              expandButton.innerHTML = isExpanded
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h6v6M21 3h-6v6M3 21h6v-6M21 21h-6v-6"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'
              updateViz()
            })

            const resizeObserver = new ResizeObserver(() => updateViz())
            resizeObserver.observe(document.body)
            updateViz()

            this.#cleanup = () => {
              resizeObserver.disconnect()
              this.#observer?.disconnect()
            }
          }

          #transformCountries(shapes: any) {
            // Scale Greenland
            if (shapes.GL?.features?.[0]) {
              shapes.GL.features[0].geometry.coordinates = shapes.GL.features[0]
                .geometry.coordinates.map((polygon: any) =>
                  polygon.map((ring: any) => {
                    const centerLon = ring.reduce((sum: number, c: number[]) =>
                      sum + c[0], 0) / ring.length
                    const centerLat = ring.reduce((sum: number, c: number[]) =>
                      sum + c[1], 0) / ring.length
                    return ring.map((coord: number[]) => [
                      centerLon + (coord[0] - centerLon) * 0.4 + 35,
                      centerLat + (coord[1] - centerLat) * 0.4,
                    ])
                  })
                )
            }
            // Scale Faroe Islands
            if (shapes.FO?.features?.[0]) {
              shapes.FO.features[0].geometry.coordinates = shapes.FO.features[0]
                .geometry.coordinates.map((polygon: any) =>
                  polygon.map((ring: any) => {
                    const centerLon = ring.reduce((sum: number, c: number[]) =>
                      sum + c[0], 0) / ring.length
                    const centerLat = ring.reduce((sum: number, c: number[]) =>
                      sum + c[1], 0) / ring.length
                    return ring.map((coord: number[]) => [
                      centerLon + (coord[0] - centerLon) * 4 + 6,
                      centerLat + (coord[1] - centerLat) * 4 - 2,
                    ])
                  })
                )
            }
            // Scale Iceland
            if (shapes.IS?.features?.[0]) {
              shapes.IS.features[0].geometry.coordinates = shapes.IS.features[0]
                .geometry.coordinates.map((polygon: any) =>
                  polygon.map((ring: any) => {
                    const centerLon = ring.reduce((sum: number, c: number[]) =>
                      sum + c[0], 0) / ring.length
                    const centerLat = ring.reduce((sum: number, c: number[]) =>
                      sum + c[1], 0) / ring.length
                    return ring.map((coord: number[]) => [
                      centerLon + (coord[0] - centerLon) * 0.8 + 15,
                      centerLat + (coord[1] - centerLat) * 0.8 - 1.4,
                    ])
                  })
                )
            }
          }

          #drawCountry(
            countryData: any,
            projection: any,
            pathGroup: any,
            COLORS: any,
            d3: any,
          ) {
            const path = d3.geoPath(projection)
            countryData.features[0].geometry.coordinates.forEach(
              (polygon: any) => {
                if (polygon[0].length < 50) { return }
                pathGroup
                  .append("path")
                  .datum({ type: "Polygon", coordinates: polygon })
                  .attr("d", path)
                  .attr("fill", COLORS.background)
                  .attr("stroke", COLORS.border)
              },
            )
          }

          connectedCallback() {
            fetch("/static/geo/shapes.cbor")
              .then((res) => res.arrayBuffer())
              .then((buffer) => {
                this.shapes = decodeCbor(new Uint8Array(buffer))
                this.#buildUI()
              })
              .catch((err) => console.error("Failed to load shapes:", err))
          }

          disconnectedCallback() {
            this.#cleanup?.()
          }
        }

        customElements.define("brl-language-map", LanguageMapElement)
      }

      // Now that custom element is registered, add it to the container
      if (containerRef.current) {
        // Hide fallback content
        const fallback = containerRef.current.querySelector(".fallback")
        if (fallback) {
          ;(fallback as HTMLElement).style.display = "none"
        }

        const mapEl = document.createElement("brl-language-map")
        mapEl.setAttribute("baseNodes", JSON.stringify(baseNodes))
        mapEl.setAttribute("lang", lang)
        containerRef.current.appendChild(mapEl)
      }
    })()
  }, [baseNodes, lang])

  return (
    <div
      ref={containerRef}
      class="language-map-container"
      style={{ minHeight: "412px" }}
    >
      {/* Fallback content while loading */}
      <div
        class="fallback"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "32px",
        }}
      >
        {baseNodes.map((node) => (
          <a
            key={node.code}
            class="download-button"
            href={`/${lang}/language/${node.code}`}
            title={node.title}
          >
            <div class="button-text">
              <span>{node.autonym}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
