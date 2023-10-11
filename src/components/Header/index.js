import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="bg-container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="websiteLogo"
      />
    </Link>
  </div>
)
export default withRouter(Header)
