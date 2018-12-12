import React from 'react'
import SocialLinks from './components/SocialLinks'
import './style.scss'

export default class IndexBanner extends React.PureComponent {
    render() {
        return(
        <div className="banner">
            <h2>Hello, I'm <span>Bipin</span> & I craft technology products. This site chronicles my thoughts, stories and ideas.</h2>
            <p><SocialLinks /></p>
            <hr />
        </div>)
    }
}