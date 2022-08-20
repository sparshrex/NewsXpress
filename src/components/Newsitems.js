import React, { Component } from 'react'

export default class Newsitems extends Component {
  render() {
    let   {title , description,imgUrl,newsUrl} = this.props
    return (
      <div>

        <div className="card">
          <img src={!imgUrl?"https://images.moneycontrol.com/static-mcnews/2021/08/Earnings-770x433.jpg":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}
