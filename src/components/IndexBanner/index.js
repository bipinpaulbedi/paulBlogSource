import React from 'react'
import SocialLinks from './components/SocialLinks'
import './style.scss'

export default class IndexBanner extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <div className="banner">Hello, I'm <span>Bipin</span> & I craft technology products. This site chronicles my thoughts, stories and ideas.
        <p><SocialLinks /></p>
        <hr />
        </div>
        </React.Fragment>)
    }
}