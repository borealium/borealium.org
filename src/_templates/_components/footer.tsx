export function Footer(props: { url: string }) {
  return (
    <footer className="footer">
      <span>Divvun Web Portal</span>
      <div className="links">
        <div className="link-group">
          <span>About us</span>
          <ul>
            <li>
              <a href="/">History</a>
            </li>
            <li>
              <a href="/">Members</a>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <span>Proofing tools</span>
          <ul>
            <li>
              <a href="/">Descriptive Link 1</a>
            </li>
            <li>
              <a href="/">Descriptive Link 2</a>
            </li>
            <li>
              <a href="/">Descriptive Link 3</a>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <span>Keyboards</span>
          <ul>
            <li>
              <a href="/">Descriptive Link 1</a>
            </li>
            <li>
              <a href="/">Descriptive Link 2</a>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <span>Dictionaries</span>
          <ul>
            <li>
              <a href="/">Descriptive Link 1</a>
            </li>
            <li>
              <a href="/">Descriptive Link 2</a>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <span>Contact us</span>
          <ul>
            <li>
              <a href="/">Descriptive Link 1</a>
            </li>
            <li>
              <a href="/">Descriptive Link 2</a>
            </li>
            <li>
              <a href="/">Descriptive Link 3</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="copyright">© Copyright 2000-2023 Divvun</p>
    </footer>
  )
}
