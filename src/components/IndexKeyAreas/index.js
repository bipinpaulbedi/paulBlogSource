import React from 'react'
import FocusArea from '../../images/focus.jpg'

export default class IndexBanner extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <img src={FocusArea} alt="focus image" />
        <div>I care about sharing and learning, thus I write various technical articles but my current key focus areas are <a href="/tags/applied-cryptography" alt="Applied cryptograpy">Applied cryptograpy</a>, <a href="/tags/machine-learning" alt="Machine Learning">Machine Learning/AI</a>, <a href="/tags/algorithm-design" alt="Algorithm design">Algorithm design & data structures</a>, <a href="/tags/security" alt="White Hat Security">White hat security</a></div>
        <hr />
        </React.Fragment>)
    }
}