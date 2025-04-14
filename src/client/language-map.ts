import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import { decode as decodeCbor } from "npm:cbor2"

class LanguageMap extends HTMLElement {
  shapes: any
  #cleanup?: () => void
  #observer?: MutationObserver

  constructor() {
    super()
  }

  static get observedAttributes() {
    return ["baseNodes"]
  }

  #_baseNodes: any
  get baseNodes() {
    if (!this.#_baseNodes) {
      this.#_baseNodes = JSON.parse(this.getAttribute("baseNodes") || "[]")
    }
    return this.#_baseNodes
  }

  #buildUI() {
    const { shapes, baseNodes } = this
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

      .expand-button:hover {
        background: #f0f0f0;
      }

      .expand-button svg {
        width: 24px;
        height: 24px;
      }
      
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

      .language-button:hover {
        background: #f0f0f0;
      }

      .language-button svg {
        width: 24px;
        height: 24px;
      }

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

      .graph svg {
        display: block;
      }
    `

    shadow.appendChild(style)

    const expandButton = document.createElement("button")
    expandButton.classList.add("expand-button")
    expandButton.setAttribute("aria-label", "Expand graph")
    expandButton.setAttribute("type", "button")
    expandButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

    if (localStorage.getItem("borealium:experiments:ui-language-name") === "true") {
      const languageButton = document.createElement("button")
      languageButton.classList.add("language-button")
      languageButton.setAttribute("aria-label", "Change language display")
      languageButton.setAttribute("type", "button")
      languageButton.innerHTML = isOriginalLanguage ? translateOffIcon : translateOnIcon

      graph.appendChild(languageButton)

      languageButton.addEventListener("click", () => {
        isOriginalLanguage = !isOriginalLanguage

        // Toggle between autonym and title display in the existing viz
        const labels = labelGroup.selectAll("text")
        labels.text((d: any) => isOriginalLanguage ? d.node.id : d.node.title)

        // Update the button icon to indicate current state
        languageButton.innerHTML = isOriginalLanguage ? translateOffIcon : translateOnIcon

        // Refresh the visualization to update label dimensions with the new text
        updateViz()
      })
    }

    expandButton.addEventListener("click", () => {
      isExpanded = !isExpanded
      graph.classList.toggle("expanded")

      // Update the button icon
      expandButton.innerHTML = isExpanded
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h6v6M21 3h-6v6M3 21h6v-6M21 21h-6v-6"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'

      updateViz()
    })

    shadow.appendChild(graph)

    // Get parent div and set up dimensions
    const container = d3.select(graph).node()
    const baseWidth = 800
    const baseHeight = 1200
    const aspectRatio = baseHeight / baseWidth

    // Create SVG that fills container
    const svg = d3
      .select(graph)
      .append("svg")
      .style("display", "block")
      .style("position", "absolute")
      .style("margin", "auto")

    // Calculate geographic bounds (same as before)
    let allCoords = []
    shapes.SE.features[0].geometry.coordinates.forEach((polygon) => {
      polygon[0].forEach((coord) => {
        allCoords.push(coord)
      })
    })

    const lonExtent = d3.extent(allCoords, (d) => d[0])
    const latExtent = d3.extent(allCoords, (d) => d[1])

    // Create groups for our elements
    const pathGroup = svg.append("g")
    const nodeGroup = svg.append("g")
    const labelGroup = svg.append("g")

    // At the top level, create a countries array
    const countries = [
      { id: "SE", data: shapes.SE },
      { id: "NO", data: shapes.NO },
      { id: "FO", data: shapes.FO }, // Faroe Islands
      { id: "DK", data: shapes.DK }, // Denmark
      { id: "GL", data: shapes.GL }, // Greenland
      { id: "RU", data: shapes.RU }, // Russia
      { id: "FI", data: shapes.FI },
      { id: "IS", data: shapes.IS }, // Iceland
    ]

    // Offset and scale down Greenland's coordinates
    shapes.GL.features[0].geometry.coordinates = shapes.GL.features[0].geometry.coordinates.map((polygon) => {
      return polygon.map((ring) => {
        // Find center point of the polygon
        const centerLon = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length
        const centerLat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length

        return ring.map((coord) => {
          // Scale coordinates relative to center point (0.6 = 60% of original size)
          const scaledLon = centerLon + (coord[0] - centerLon) * 0.4
          const scaledLat = centerLat + (coord[1] - centerLat) * 0.4
          // Then apply the eastward offset
          // return [scaledLon + 15, scaledLat];
          return [scaledLon + 35, scaledLat]
        })
      })
    })

    // Offset and scale up Faroe Islands' coordinates
    shapes.FO.features[0].geometry.coordinates = shapes.FO.features[0].geometry.coordinates.map((polygon) => {
      return polygon.map((ring) => {
        const centerLon = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length
        const centerLat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length

        return ring.map((coord) => {
          // Scale up to 140% of original size
          const scaledLon = centerLon + (coord[0] - centerLon) * 4
          const scaledLat = centerLat + (coord[1] - centerLat) * 4
          // return [scaledLon, scaledLat - 2];
          return [scaledLon + 6, scaledLat - 2]
        })
      })
    })

    // Offset and scale down Iceland's coordinates
    shapes.IS.features[0].geometry.coordinates = shapes.IS.features[0].geometry.coordinates.map((polygon) => {
      return polygon.map((ring) => {
        const centerLon = ring.reduce((sum, coord) => sum + coord[0], 0) / ring.length
        const centerLat = ring.reduce((sum, coord) => sum + coord[1], 0) / ring.length

        return ring.map((coord) => {
          // Scale down to 80% of original size
          const scaledLon = centerLon + (coord[0] - centerLon) * 0.8
          const scaledLat = centerLat + (coord[1] - centerLat) * 0.8
          // return [scaledLon + 2, scaledLat];
          return [scaledLon + 15, scaledLat - 1.4]
        })
      })
    })

    // At the top level, define our region bounds
    const NORDIC_BOUNDS = {
      longitude: [-4.5, 39], // Original was [-75, 55] - reduced 10% west, 30% east
      latitude: [72, 52], // Keeping latitude the same
    }

    // Update zoom behavior definition
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8]) // Keep zoom constraints
      .translateExtent([
        [0, 0],
        [baseWidth, baseHeight],
      ])
      .extent([
        [0, 0],
        [baseWidth, baseHeight],
      ])
      .filter((event) => {
        const isExpanded = d3.select(graph).classed("expanded")
        const transform = d3.zoomTransform(svg.node())

        // Allow panning (mouse drag) when expanded
        if (isExpanded && event.type === "mousedown") return true

        // Otherwise only allow interaction when zoomed in or during programmatic zoom
        return (transform.k > 1 || event.type === "zoom") && !event.button
      })

    // Apply the zoom behavior to the SVG
    svg.call(zoom)

    // Add these color constants at the top level, using the Borealium color scheme
    const COLORS = {
      background: "hsl(180, 19%, 94%)", // --color-bg
      primary: "hsl(197, 76%, 15%)", // --color-primary
      primaryLight: "hsl(197, 30%, 30%)", // --color-primary-light
      primaryDark: "hsl(197, 76%, 10%)", // --color-primary-dark
      white: "rgba(255, 255, 255, 0.95)", // --color-white
      border: "#b1c3d0", // --color-border
      brand: {
        blue: "#159dd7", // --color-brand
        green: "#04bf93", // --color-brand (alternate)
      },
    }

    // Add these constants near the top of the file
    const BASE_FONT_SIZE = 18
    const MIN_FONT_SIZE = 9
    const MAX_FONT_SIZE = 32

    function updateViz() {
      const containerWidth = Math.min(
        document.body.clientWidth | 0,
        container.clientWidth | 0,
      )
      const containerHeight = Math.min(
        document.body.clientHeight | 0,
        container.clientHeight | 0,
      )

      // Remove existing ocean background first
      svg.selectAll("rect.ocean").remove()

      // Update ocean background with calculated opacity
      svg
        .insert("rect", ":first-child")
        .attr("class", "ocean")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .attr("fill", COLORS.brand.blue)
        .attr("opacity", 0.2) // Use calculated opacity

      // Filter features and their coordinates for the projection
      const combinedFeatures = {
        type: "FeatureCollection",
        features: countries.flatMap((country) => {
          const feature = country.data.features[0]
          return {
            ...feature,
            geometry: {
              ...feature.geometry,
              coordinates: feature.geometry.coordinates
                .map((polygon) => {
                  const filtered = polygon[0].filter((coord) => {
                    return (
                      coord[0] >= NORDIC_BOUNDS.longitude[0] &&
                      coord[0] <= NORDIC_BOUNDS.longitude[1] &&
                      coord[1] >= NORDIC_BOUNDS.latitude[0] &&
                      coord[1] <= NORDIC_BOUNDS.latitude[1]
                    )
                  })
                  return [filtered]
                })
                .filter((poly) => poly[0].length > 0), // Remove empty polygons
            },
          }
        }),
      }

      const projection = d3
        .geoConicConformal()
        .center([10, 63])
        .rotate([-10, 0])
        .parallels([80, 100])
        .fitExtent(
          [
            [0, 0],
            [containerWidth, containerHeight],
          ],
          {
            type: "Feature",
            geometry: {
              type: "MultiPoint",
              coordinates: [
                [NORDIC_BOUNDS.longitude[0], NORDIC_BOUNDS.latitude[0]],
                [NORDIC_BOUNDS.longitude[1], NORDIC_BOUNDS.latitude[1]],
              ],
            },
          },
        )
      // Update SVG size
      svg
        .style("width", `${containerWidth}px`)
        .style("height", `${containerHeight}px`)

      // Clear all paths first
      pathGroup.selectAll("path").remove()

      // Draw all countries
      countries.forEach((country) => {
        drawCountry(country.data, projection)
      })

      // Update nodes with new projected coordinates
      const nodes = baseNodes.map((node) => {
        const [x, y] = projection(node.coordinates)
        return {
          id: node.autonym,
          title: node.title,
          url: "/language/" + node.code,
          x,
          y,
          fx: x,
          fy: y,
          labelPosition: node.labelPosition,
        }
      })

      const nodeXs = nodes.map((d) => d.fx)
      const nodeYs = nodes.map((d) => d.fy)
      const minX = Math.min(...nodeXs) - 100
      const maxX = Math.max(...nodeXs) + 100
      const minY = Math.min(...nodeYs) - 100
      const maxY = Math.max(...nodeYs) + 100

      // Update zoom constraints based on node positions
      zoom
        .translateExtent([
          [minX, minY],
          [maxX, maxY],
        ])
        .extent([
          [0, 0],
          [containerWidth, containerHeight],
        ])

      // Add Voronoi computation
      const voronoi = d3.Delaunay.from(
        nodes,
        (d) => d.fx,
        (d) => d.fy,
      ).voronoi([0, 0, containerWidth, containerHeight])

      const centroids = nodes.map((d, i) => {
        const cell = voronoi.renderCell(i)
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        )
        path.setAttribute("d", cell)
        const bbox = path.getBBox()
        return {
          x: bbox.x + bbox.width / 2,
          y: bbox.y + bbox.height / 2,
        }
      })

      // Add Voronoi cells
      const cells = nodeGroup
        .selectAll("path.voronoi")
        .data(nodes)
        .join("path")
        .attr("class", "voronoi")
        .attr("d", (d, i) => voronoi.renderCell(i))
        .attr("fill", "transparent")
        .attr("opacity", 0)
        .attr("pointer-events", "all")
        .style("cursor", "zoom-in")
        .on("click", function (event, d) {
          event.stopPropagation()

          const currentTransform = d3.zoomTransform(svg.node())
          const isExpanded = d3.select(graph).classed("expanded")

          // If zoomed in, highlight active region with brand green
          // if (currentTransform.k > 1) {
          //   d3.select(this)
          //     .transition()
          //     .duration(200)
          //     .attr("fill", COLORS.brand.green)
          //     .attr("opacity", 0.1);
          // }

          // If we're already zoomed in and clicking the same region, zoom out
          if (
            currentTransform.k > 1 &&
            Math.abs(currentTransform.x - (containerWidth / 2 - d.fx * 4)) <
              1 &&
            Math.abs(currentTransform.y - (containerHeight / 2 - d.fy * 4)) < 1
          ) {
            svg
              .transition()
              .duration(750)
              .call(zoom.transform, d3.zoomIdentity)
              // Only disable zoom behavior after zooming out if not expanded
              .on("end", () => {
                if (!isExpanded) {
                  svg.call(zoom.filter((event) => false))
                }
              })
          } else {
            // Enable zoom behavior before zooming in
            svg.call(
              zoom.filter((event) => {
                const transform = d3.zoomTransform(svg.node())
                const isExpanded = d3.select(graph).classed("expanded")
                return (
                  (transform.k > 1 || isExpanded || event.type === "zoom") &&
                  !event.button
                )
              }),
            )

            // Zoom in to the clicked region
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
        // Update cursor based on zoom state
        .on("mouseover", function (event, d) {
          const currentTransform = d3.zoomTransform(svg.node())
          const isZoomedToThis = currentTransform.k > 1 &&
            Math.abs(currentTransform.x - (containerWidth / 2 - d.fx * 4)) <
              1 &&
            Math.abs(currentTransform.y - (containerHeight / 2 - d.fy * 4)) < 1

          d3.select(this).style(
            "cursor",
            isZoomedToThis ? "zoom-out" : "zoom-in",
          )
        })
        .on("mouseout", function () {
          // Reset any active highlights when moving away
          d3.select(this)
            .transition()
            .duration(200)
            .attr("fill", "transparent")
            .attr("opacity", 0)
        })

      // Move nodes to front
      const node = nodeGroup
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("class", "node")
        .attr("r", 5)
        .attr("cx", (d) => d.fx)
        .attr("cy", (d) => d.fy)
        .style("cursor", "pointer")
        .style("fill", COLORS.white)
        .style("stroke", COLORS.border)
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", COLORS.brand.green)
            .style("stroke", COLORS.brand.green)

          // Update hover states for labels and connectors
          labelBackgrounds
            .filter((l) => l.node.id === d.id)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.brand.green)
            .attr("fill", COLORS.background)

          connectors
            .filter((l) => l.node.id === d.id)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.brand.green)
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("fill", COLORS.white)
            .style("stroke", COLORS.border)

          labelBackgrounds
            .filter((l) => l.node.id === d.id)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.border)
            .attr("fill", COLORS.white)

          connectors
            .filter((l) => l.node.id === d.id)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.border)
        })
        .on("click", (event, d) => {
          event.stopPropagation()
          window.location.href = d.url
        })
        .raise()

      const LABEL_OFFSET_Y = -15 // Initial offset, but we'll adjust based on orbital position

      // Create label data with initial positions
      const labelData = nodes.map((node) => ({
        node: node,
        x: node.fx,
        y: node.fy + LABEL_OFFSET_Y,
        width: 0,
        height: 0,
        angle: 0,
      }))

      // First create background rectangles
      const labelBackgrounds = labelGroup
        .selectAll("rect.label-bg")
        .data(labelData)
        .join("rect")
        .attr("class", "label-bg")
        .attr("fill", COLORS.white)
        .attr("stroke", COLORS.border)
        .attr("rx", 4)
        .attr("ry", 4)
        .style("cursor", "pointer")
        .attr("pointer-events", "all") // Make clickable
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.brand.green)
            .attr("fill", COLORS.background)

          connectors
            .filter((l) => l === d)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.brand.green)

          node
            .filter((n) => n === d.node)
            .transition()
            .duration(200)
            .style("fill", COLORS.brand.green)
            .style("stroke", COLORS.brand.green)
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.border)
            .attr("fill", COLORS.white)

          connectors
            .filter((l) => l === d)
            .transition()
            .duration(200)
            .attr("stroke", COLORS.border)

          node
            .filter((n) => n === d.node)
            .transition()
            .duration(200)
            .style("fill", COLORS.white)
            .style("stroke", COLORS.border)
        })
        .on("click", (event, d) => {
          event.stopPropagation()
          window.location.href = d.node.url
        })

      labelGroup
        .selectAll("rect.label-bg")
        .append("svg:title")
        .text((d) => d.node.title)

      // Create the labels
      const labels = labelGroup
        .selectAll("text")
        .data(labelData)
        .join("text")
        .text((d: any) => isOriginalLanguage ? d.node.id : d.node.title)
        .attr("font-family", "'Noto Sans', 'Noto Sans Hebrew', sans-serif")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", COLORS.primary)
        .attr("font-weight", "bold")
        .attr("pointer-events", "none")

      // Create connectors
      const connectors = labelGroup
        .selectAll("path.connector")
        .data(labelData)
        .join("path")
        .attr("class", "connector")
        .attr("fill", "none")
        .attr("stroke", COLORS.border)
        .attr("pointer-events", "none")

      // Initial measurement of text dimensions
      labels.each(function (d) {
        const bbox = this.getBBox()
        d.width = bbox.width + 12
        d.height = bbox.height + 12
      })

      // Function to update all label-related elements with current scale
      function updateLabelsWithScale(scale = 1) {
        const containerWidth = container.clientWidth | 0
        const pixelRatio = window.devicePixelRatio || 1

        // Calculate base font size accounting for pixel density
        const responsiveFontSize = Math.min(
          MAX_FONT_SIZE,
          Math.max(
            MIN_FONT_SIZE,
            // containerWidth < 600
            (BASE_FONT_SIZE * 0.3 * containerWidth * pixelRatio) /
              (baseWidth * pixelRatio),
            // (BASE_FONT_SIZE * 1.2 * containerWidth * pixelRatio) / (baseWidth * pixelRatio)
          ),
        )

        // More aggressive scaling for high DPR displays
        const dprScale = 1 // pixelRatio > 1 ? Math.log2(pixelRatio) : 1;
        const moderatedScale = 1 // Math.sqrt(1 / scale) * dprScale * 1.2;
        const finalFontSize = responsiveFontSize * moderatedScale

        // Update font size
        labels.style("font-size", `${finalFontSize}px`)

        // Recalculate dimensions with new font size
        labels.each(function (d) {
          const bbox = this.getBBox()
          d.width = bbox.width + finalFontSize
          d.height = bbox.height + finalFontSize
        })

        // Update positions and dimensions
        calculateLabelPositions()

        // Update visual elements
        labelBackgrounds
          .attr("x", (d) => d.x - d.width / 2)
          .attr("y", (d) => d.y - d.height / 2)
          .attr("width", (d) => d.width)
          .attr("height", (d) => d.height)
          .attr("rx", 4 * moderatedScale)
          .attr("ry", 4 * moderatedScale)

        labels.attr("x", (d) => d.x).attr("y", (d) => d.y)

        connectors.attr("d", (d) => d.connectorPath)

        // Update stroke widths
        nodeGroup
          .selectAll("circle")
          .style("stroke-width", `${moderatedScale / 1.05}`)

        labelBackgrounds.attr("stroke-width", `${moderatedScale / 1.05}`)

        connectors.attr("stroke-width", `${moderatedScale / 1.05}`)

        pathGroup
          .selectAll("path")
          .attr("stroke-width", `${moderatedScale / 3}`)
      }

      // Initial update with scale 1
      updateLabelsWithScale(1)

      // Update zoom handler to use the new function
      zoom.on("zoom", (event) => {
        pathGroup.attr("transform", event.transform)
        nodeGroup.attr("transform", event.transform)
        labelGroup.attr("transform", event.transform)

        updateLabelsWithScale(event.transform.k)
      })

      // Orbital layout function
      function calculateLabelPositions() {
        const BASE_OFFSET = 25

        labelData.forEach((d) => {
          const position = d.node.labelPosition || "top"

          switch (position) {
            case "top":
              d.x = d.node.fx
              d.y = d.node.fy - BASE_OFFSET - d.height / 2
              d.connectorPath = `
            M ${d.node.fx},${d.node.fy - 5}
            C ${d.node.fx},${d.node.fy - 5}
              ${d.x},${d.y + d.height / 2}
              ${d.x},${d.y + d.height / 2}
          `
              break
            case "right":
              d.x = d.node.fx + BASE_OFFSET + d.width / 2
              d.y = d.node.fy
              d.connectorPath = `
            M ${d.node.fx + 5},${d.node.fy}
            C ${d.node.fx + 5},${d.node.fy}
              ${d.x - d.width / 2},${d.y}
              ${d.x - d.width / 2},${d.y}
          `
              break
            case "bottom":
              d.x = d.node.fx
              d.y = d.node.fy + BASE_OFFSET + d.height / 2
              d.connectorPath = `
            M ${d.node.fx},${d.node.fy + 5}
            C ${d.node.fx},${d.node.fy + 5}
              ${d.x},${d.y - d.height / 2}
              ${d.x},${d.y - d.height / 2}
          `
              break
            case "left":
              d.x = d.node.fx - BASE_OFFSET - d.width / 2
              d.y = d.node.fy
              d.connectorPath = `
            M ${d.node.fx - 5},${d.node.fy}
            C ${d.node.fx - 5},${d.node.fy}
              ${d.x + d.width / 2},${d.y}
              ${d.x + d.width / 2},${d.y}
          `
              break
          }
        })
      }

      // Add click handler to reset zoom when clicking on empty space
      svg.on("click", (event) => {
        // Only reset if clicking on the base SVG
        if (event.target === svg.node()) {
          svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity)
        }
      })

      // Update country paths
      pathGroup.selectAll("path").attr("stroke", COLORS.border)

      // Add a mutation observer to watch for the expanded class
      this.#observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            const isExpanded = d3.select(graph).classed("expanded")
            if (!isExpanded) {
              document.body.style.overflow = "auto"
              // Reset zoom when unexpanding
              svg
                .transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity)
            } else {
              document.body.style.overflow = "hidden"
            }
          }
        })
      })

      // Start observing the graph element for class changes
      this.#observer.observe(graph, {
        attributes: true,
        attributeFilter: ["class"],
      })
    }

    // Reusable function to draw a country
    function drawCountry(countryData, projection) {
      // Create a clip path at our bounds
      const clipPath = d3.geoClipRectangle(
        NORDIC_BOUNDS.longitude[0], // left
        NORDIC_BOUNDS.latitude[0], // bottom
        NORDIC_BOUNDS.longitude[1], // right
        NORDIC_BOUNDS.latitude[1], // top
      )

      // Create a path generator that includes the clip path
      const path = d3.geoPath(projection).pointRadius(2)

      // Draw each feature with clipping applied
      countryData.features[0].geometry.coordinates.forEach((polygon, index) => {
        if (polygon[0].length < 50) {
          return
        }
        pathGroup
          .append("path")
          .datum({
            type: "Polygon",
            coordinates: polygon,
          })
          .attr("d", path)
          .attr("fill", COLORS.background)
          .attr("stroke", COLORS.border)
          .attr("class", `country-${countryData.features[0].properties.id}`)
      })
    }

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateViz()
    })

    resizeObserver.observe(document.body)

    // Initial render
    updateViz()

    // Cleanup function
    this.#cleanup = () => {
      resizeObserver.disconnect()
      this.#observer?.disconnect()
    }
  }

  connectedCallback() {
    fetch("/static/geo/shapes.cbor")
      .then((res) => res.bytes())
      .then((buffer) => {
        this.shapes = decodeCbor(buffer)
        this.#buildUI()
      })
  }

  disconnectedCallback() {
    this.#cleanup?.()
    this.#cleanup = undefined
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`)
  }
}

customElements.define("brl-language-map", LanguageMap)
