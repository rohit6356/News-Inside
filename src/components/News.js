import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'



export default class News extends Component {

  static defaultProps = {
    category : 'business',
  }
  static propTypes = {
    category : PropTypes.string,
  }

constructor(){
  super();
  this.state = {
    articles : [],
    loading : false,
    page : 1 
  }
}

async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8&pageSize=21` ;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedata = await data.json();
  this.setState({
    articles : parsedata.articles,
    loading : false
  })

}

// https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8

handlePreClick = async () =>{

  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8&page=${this.state.page-1}&pageSize=21` ;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedata = await data.json();
  this.setState({
    articles : parsedata.articles,
    page : this.state.page -1,
    loading : false
  })
}

handleNextClick = async () => {

  let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8&page=${this.state.page+1}&pageSize=21` ;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedata = await data.json();
  this.setState({
    articles : parsedata.articles,
    page : this.state.page +1,
    loading : false
  })

}

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Inside - Top Headline</h1>
      
   {this.state.loading && <Spinner/>}
        
        <div className="row">          
        {!this.state.loading && this.state.articles.map( (element) => {
            return <div className="col-md-4" key={element.url}>
          <Newsitem title={!element.title?element.title:element.title.slice(0,45)} description={!element.description ? element.description : element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url}/>
          </div>
        })}
        </div>
       
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
       <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
       </div>

      </div>
    )
  }
}
