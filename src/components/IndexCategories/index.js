import React from 'react'
import './style.scss'

export default class IndexCategories extends React.PureComponent {
    render() {
        return(<React.Fragment>
        <div className="indexCategoryItem"><a href="/tags/dot-net" alt=".Net">.Net</a></div>
        <div className="indexCategoryItem"><a href="/tags/algorithm-design" alt="Algorithm design">Algorithm design & data structures</a></div>
        <div className="indexCategoryItem"><a href="/tags/applied-cryptography" alt="Applied cryptograpy">Applied cryptograpy</a></div>
        <div className="indexCategoryItem"><a href="/tags/design-patterns" alt="Design patterns">Design patterns</a></div>
        <div className="indexCategoryItem"><a href="/tags/javascript" alt="Javascript">Javascript</a></div>
        <div className="indexCategoryItem"><a href="/tags/machine-learning" alt="Machine Learning">Machine Learning</a></div>
        <div className="indexCategoryItem"><a href="/tags/security" alt="Security">Security</a></div>
        <div className="indexCategoryItem"><a href="/tags/sitecore" alt="Sitecore">Sitecore</a></div>
        <div className="indexCategoryItem"><a href="/tags/technology" alt="Technology">Rest of the world</a></div>
        </React.Fragment>)
    }
}