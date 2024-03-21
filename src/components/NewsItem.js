import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    //destructuring before retur ad after render and same in functional pass prop direct and use props.name
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://ichef.bbci.co.uk/news/1024/branded_news/15540/production/_132906378_sunak_ukparly.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ left: "90%", zIndex: 1 }}
              >
                {source}
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small class="text-muted">
                {/* if smple then also {author} or {date} and extra code of js also indicating{} */}
                By {author ? author : "Unknown"} on
                {new Date(date).toGMTString()}
              </small>
            </p>
            {/* <a href="/newsdetail" className="btn btn-sm btn-primary">
              Read more
            </a> */}
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
