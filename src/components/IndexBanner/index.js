import React from 'react'
import SocialLinks from './components/SocialLinks'
import './style.scss'

export default class IndexBanner extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <div className="banner">Hello<span>,</span> I<span>'</span>m Bipin <span>&</span> I craft technology products<span>.</span> This site chronicles my thoughts<span>,</span> stories and ideas<span>.</span>
        <p><SocialLinks /></p>
        <hr />
        </div>
        </React.Fragment>)
    }
}