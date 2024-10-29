import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
    // destructuring prop types
        let { title, description, imageUrl, newsUrl, author, date} = this.props;
        return (
            <div className="my-3">
              <div>
                    <img 
                    // if image is not avalibe, use the default one
                          src={imageUrl ? imageUrl : "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} 
                          className="card-img-top" 
                          alt={title || "News Item Image"} />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                  {/* converting date format to GMT */}
                        <p className="card-text"><small className="text-muted">By {author ? author:"Unknown" } on  {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem