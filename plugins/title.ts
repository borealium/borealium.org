export default function title() {
  return (site: Site) => {
    site.process([".html"], (pages) => pages.forEach(titles));

    function titles(page: Page) {
      const { document, data } = page;

      const title = document.querySelector("title")
      if (title && page.title) {
        title.textContent = "Borealium | " + page.title
      }
    }
  }
}
