import React from 'react'
import styled from 'styled-components'
import EverthingElse from '../../images/everythingElse.jpg'
const CategoriesList = styled.div`
    width: 100%;`

export default class IndexCategories extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <img src={EverthingElse} alt="everything else image" />
        <CategoriesList><a href="/tags/dot-net" alt=".Net">.Net</a></CategoriesList>
        <CategoriesList><a href="/tags/algorithm-design" alt="Algorithm design">Algorithm design & data structures</a></CategoriesList>
        <CategoriesList><a href="/tags/applied-cryptography" alt="Applied cryptograpy">Applied cryptograpy</a></CategoriesList>
        <CategoriesList><a href="/tags/design-patterns" alt="Design patterns">Design patterns</a></CategoriesList>
        <CategoriesList><a href="/tags/javascript" alt="Javascript">Javascript</a></CategoriesList>
        <CategoriesList><a href="/tags/machine-learning" alt="Machine Learning">Machine Learning</a></CategoriesList>
        <CategoriesList><a href="/tags/security" alt="Security">Security</a></CategoriesList>
        <CategoriesList><a href="/tags/sitecore" alt="Sitecore">Sitecore</a></CategoriesList>
        <CategoriesList><a href="/tags/technology" alt="Technology">Rest of the world</a></CategoriesList>
        </React.Fragment>)
    }
}