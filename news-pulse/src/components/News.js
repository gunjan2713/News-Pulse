import React, { Component } from 'react';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';

// news component to fetch and display top headlines based on user-selected options
export class News extends Component {
  // access the API key from environment variables
  API_KEY = process.env.REACT_APP_API_KEY_NEWSAPI;

  // default props for News component, defining default values for country, pageSize, and category
  static defaultProps = {
    country: 'us', 
    pageSize: 9,  
    category: 'general', 
  };

  // propTypes to ensure the props passed are of correct types
  static propTypes = {
    country: PropTypes.string,  
    pageSize: PropTypes.number, 
    category: PropTypes.string, 
  };

  // constructor to initialize state
  constructor() {
    super();
    this.state = {
      articles: [], 
      page: 1,     
    };
  }

  // fetches news articles when the component is mounted
  async componentDidMount() {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API_KEY}&page=1&pagesize=${this.props.pageSize}`;
  // fetching and parsing data
    let response = await fetch(url); 
    let data = await response.json();
  // updating state
    console.log(data); 
    this.setState({ articles: data.articles, totalArticles: data.totalResults }); 
  }

  // handles click on "Next" button to load the next page of articles
  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)) {
      return; 
    } else {
      // construct the URL for the next page
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API_KEY}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    // fetching and parsing data
      let response = await fetch(url); 
      let data = await response.json();
     // updating state
      this.setState({
        page: this.state.page + 1,   
        articles: data.articles,    
      });
    }
  };

  // handles click on "Previous" button to load the previous page of articles
  handlePreviousClick = async () => {
    // construct the URL for the previous page
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.API_KEY}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
  // fetching and parsing data
    let response = await fetch(url); 
    let data = await response.json();
   // updating state
    this.setState({
      page: this.state.page - 1,  
      articles: data.articles,     
    });
  };

  // renders the News component
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsPulse - Top Headlines</h1>

        <div className="row">
          {/*map over articles and render each as a NewsItem component */}
          {this.state.articles.map((article) => (
            <div className="col-md-4" key={article.url}>
              <NewsItem 
            // limiting numbe rof characters of title and desc
                title={article.title ? article.title.slice(0, 60) : ""} 
                description={article.description ? article.description.slice(0, 88) : ""} 
                imageUrl={article.urlToImage} 
                newsUrl={article.url} 
                author={article.author}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          {/* button to go to the previous page */}
          <button disabled={this.state.page < 1} type="button" className="btn btn-dark btn-sm" onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          {/* button to go to the next page */}
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark btn-sm" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
