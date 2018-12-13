import React from 'react'
import FocusAreaImage from '../../images/focus.jpg'
import styled from 'styled-components'

const CategoriesList = styled.div`
width: 100%;`

export default class IndexBanner extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <img src={FocusAreaImage} alt="focus image" />
        <div>I care about sharing and learning, thus I write various technical articles but my current key focus areas are 
            <CategoriesList><a href="/tags/applied-cryptography" alt="Applied cryptograpy">Applied cryptograpy</a></CategoriesList>
            <CategoriesList><a href="/tags/machine-learning" alt="Machine Learning">Machine Learning/AI</a></CategoriesList>
            <CategoriesList><a href="/tags/algorithm-design" alt="Algorithm design">Algorithm design & data structures</a></CategoriesList>
            <CategoriesList><a href="/tags/security" alt="White Hat Security">White hat security</a></CategoriesList>
        </div>
        <hr />
        </React.Fragment>)
    }
}