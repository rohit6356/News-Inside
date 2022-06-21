import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

  static defaultProps = {
    category: 'business',
  }
  static propTypes = {
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0,
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8&pageSize=6`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      loading: false
    })

  }
 
  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=634674a55a654132bcf1c2fdc78a66c8&page=${this.state.page + 1}&pageSize=6`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      loading: false,
      totalResults : parsedata.totalResults,
  }) };

  render() {
    return (

      <div className="my-3">

        <h1 className="text-center">News Inside - Top Headline</h1>

        {/* {this.state.loading && <Spinner/>} */}
        
        

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
            <div className="container">
          <div className="row">
            { this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={ element.title?element.title.slice(0,45):element.title } description={!element.description ? element.description : element.description.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        </div>

     
    )
  }
}
