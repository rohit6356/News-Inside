import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {

    let {title , description , imageUrl , newsUrl , author ,time}  = this.props;

    return (
      <div className="my-3">
        <div className="card" >
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
   <p>by {author?author:"Unknown"} at {new Date(time).toGMTString()}</p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more  . .</a>
  </div>
</div>
      </div>
    )
  }
}
