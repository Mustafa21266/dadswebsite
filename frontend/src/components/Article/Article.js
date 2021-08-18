import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
import { withRouter } from "react-router-dom";
import { formatRelative } from "date-fns";
import MetaData from "../MetaData";
import Loader from "../Loader";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
class Article extends Component {
  constructor(props) {
    super(props);
    const articles = store.getState().article.articles;
    this.state = {
      article: articles.filter(
        (article) => article._id === this.props.match.params.id
      )[0],
      loading: true,
      articles: this.shuffleArray(
        articles.filter((article) => article._id !== this.props.match.params.id)
      ),
      url: window.location.href,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
      document.getElementById("articleHTML").innerHTML =
        this.state.article.articleHTML;
    }, 1000);
  }
  componentDidUpdate(e) {
    if (this.props.match.params.id !== e.match.params.id) {
      const articles = store.getState().article.articles;
      this.setState({
        article: articles.filter(
          (article) => article._id === this.props.match.params.id
        )[0],
        loading: false,
        articles: this.shuffleArray(
          articles.filter(
            (article) => article._id !== this.props.match.params.id
          )
        ),
        url: window.location.href,
      });
      document.getElementById("articleHTML").innerHTML =
        this.state.article.articleHTML;
    }
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  hoverHandler(e) {
    // e.target.style.border = '3px solid rgba(0,0,0,0.5)'
    if (e.target.tagName === "A") {
      e.target.style.opacity = "0.4";
      e.target.style.transform = "scale(1.1)";
      e.target.style.transition = "opacity 1s, transform 1s";
    }
  }
  hoverAwayHandler(e) {
    e.target.style.opacity = "1";
    e.target.style.transform = "scale(1)";
    e.target.style.transition = "opacity 1s, transform 1s";
  }
  scrollToTop(e) {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
    //    window.scroll(0,0)
  }
  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData
              title={`${this.state.article.articleHeadline}`}
              description={this.state.article.articleIntro}
              image={this.state.article.articleCover.url}
              url={this.state.url}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row animate__animated animate__fadeIn animate__slower">
              <div className="col-12 col-lg-10 d-block mx-auto background-class">
                <br></br>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-end bg-transparent">
                    <li className="breadcrumb-item active" aria-current="page">
                      {this.state.article.articleHeadline}
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/articles/all">كل المقالات</Link>
                    </li>
                  </ol>
                </nav>
                <hr />
                <div className="row">
                  <div className="col-12" style={{ padding: "0px" }}>
                    <img
                      id="coverForArticle"
                      className="img-fluid cover"
                      src={
                        this.state.article &&
                        this.state.article.articleCover.url
                      }
                      alt="Card image cap"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 mx-auto">
                    <br></br>
                    <br></br>
                    <h1>{this.state.article.articleHeadline}</h1>
                    <br></br>
                    <p style={{ fontSize: "1.2rem" }}>
                      {this.state.article.articleIntro}
                    </p>
                    <hr></hr>
                    <br></br>
                    <div className="d-block">
                      {/* (click)="openAuthorProfile($event) */}
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <p className="author-mention text-left">
                          <img
                            className="img-fluid article-avatar"
                            src={this.state.article.user.avatar.url}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                              position: "relative",
                              top: "-2px",
                            }}
                            alt="Card image cap"
                          />
                          <span className="by-class">
                            By <span className="by-class-2">.</span>
                          </span>
                          <span> {this.state.article.user.name}</span>
                        </p>
                        <p
                          className="date-added-style"
                          style={{
                            color: "rgba(0,0,0,0.5)",
                            marginTop: "10px",
                          }}
                        >
                          {formatRelative(
                            new Date(this.state.article.createdAt),
                            Date.now()
                          )}
                        </p>
                      </div>
                      <div>
                        <div style={{ margin: "5px", display: "inline-block" }}>
                          <FacebookShareButton
                            url={this.state.url}
                            quote={this.state.article.articleHeadline}
                            hashtag={"عيادات الدكتور صلاح الجوهري للجراحة"}
                          >
                            <FacebookIcon size={32} round={true} />
                          </FacebookShareButton>
                        </div>

                        <div style={{ margin: "5px", display: "inline-block" }}>
                          <TwitterShareButton
                            url={this.state.url}
                            title={this.state.article.articleHeadline}
                          >
                            <TwitterIcon size={32} round={true} />
                          </TwitterShareButton>
                        </div>

                        <div style={{ margin: "5px", display: "inline-block" }}>
                          <LinkedinShareButton
                            url={this.state.url}
                            title={this.state.article.articleHeadline}
                            summary={this.state.article.articleIntro}
                          >
                            <LinkedinIcon size={32} round={true} />
                          </LinkedinShareButton>
                        </div>

                        <div style={{ margin: "5px", display: "inline-block" }}>
                          <WhatsappShareButton
                            url={this.state.url}
                            title={this.state.article.articleHeadline}
                          >
                            <WhatsappIcon size={32} round={true} />
                          </WhatsappShareButton>
                        </div>

                        <div style={{ margin: "5px", display: "inline-block" }}>
                          <TelegramShareButton
                            url={this.state.url}
                            title={this.state.article.articleHeadline}
                          >
                            <TelegramIcon size={32} round={true} />
                          </TelegramShareButton>
                        </div>
                      </div>
                    </div>

                    <br></br>
                    <hr />
                    <br></br>
                    {"_id" in store.getState().auth.user &&
                      store.getState().auth.user._id ===
                        this.state.article.user._id && (
                        <Link
                          className="btn btn-outline-warning"
                          style={{ borderRadius: "50px", padding: "10px 30px" }}
                          to={`/admin/article/edit/${this.state.article._id}`}
                        >
                          Edit
                        </Link>
                      )}
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <div
                  id="articleHTML"
                  className="article-div color-white"
                  dir="rtl"
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12" dir="rtl">
                {this.state.articles && (
                  <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <a
                      className="text-center"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <h1 className="text-center">إقرأ ايضا</h1>
                    </a>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="carousel-inner" style={{ padding: "20px" }}>
                      <div className="carousel-item active">
                        <div className="row">
                          {this.state.articles &&
                            this.state.articles.slice(0, 3).map((article) => (
                              <div
                                key={article._id}
                                className="col-4 col-md-4 mb-3 d-inline-flex justify-content-center "
                              >
                                <Link
                                  onClick={this.scrollToTop}
                                  onMouseEnter={this.hoverHandler}
                                  onMouseLeave={this.hoverAwayHandler}
                                  key={article._id}
                                  to={`/article/${article._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  <div style={{ margin: "10px" }}>
                                    <div
                                      className="card card-event"
                                      style={{
                                        width: "100%",
                                        maxWidth: "25rem",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        className="card-img-top img-fluid"
                                        src={article.articleCover.url}
                                        style={{
                                          height: "150px",
                                          width: "25rem",
                                        }}
                                        alt="Card image cap"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {article.articleHeadline}
                                        </h5>
                                        <p className="card-text">
                                          {article.articleIntro}
                                        </p>
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "rgba(0,0,0,0.5)",
                                          }}
                                        >
                                          {formatRelative(
                                            new Date(article.createdAt),
                                            Date.now()
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          {this.state.articles &&
                            this.state.articles.slice(3, 6).map((article) => (
                              <div
                                key={article._id}
                                className="col-4 col-md-4 mb-3 d-inline-flex justify-content-center "
                              >
                                <Link
                                  onClick={this.scrollToTop}
                                  onMouseEnter={this.hoverHandler}
                                  onMouseLeave={this.hoverAwayHandler}
                                  key={article._id}
                                  to={`/article/${article._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  <div style={{ margin: "10px" }}>
                                    <div
                                      className="card card-event"
                                      style={{
                                        width: "100%",
                                        maxWidth: "25rem",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        className="card-img-top img-fluid"
                                        src={article.articleCover.url}
                                        style={{
                                          height: "150px",
                                          width: "25rem",
                                        }}
                                        alt="Card image cap"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {article.articleHeadline}
                                        </h5>
                                        <p className="card-text">
                                          {article.articleIntro}
                                        </p>
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "rgba(0,0,0,0.5)",
                                          }}
                                        >
                                          {formatRelative(
                                            new Date(article.createdAt),
                                            Date.now()
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          {this.state.articles &&
                            this.state.articles.slice(6, 9).map((article) => (
                              <div
                                key={article._id}
                                className="col-4 col-md-4 mb-3 d-inline-flex justify-content-center "
                              >
                                <Link
                                  onClick={this.scrollToTop}
                                  onMouseEnter={this.hoverHandler}
                                  onMouseLeave={this.hoverAwayHandler}
                                  key={article._id}
                                  to={`/article/${article._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  <div style={{ margin: "10px" }}>
                                    <div
                                      className="card card-event"
                                      style={{
                                        width: "100%",
                                        maxWidth: "25rem",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        className="card-img-top img-fluid"
                                        src={article.articleCover.url}
                                        style={{
                                          height: "150px",
                                          width: "25rem",
                                        }}
                                        alt="Card image cap"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {article.articleHeadline}
                                        </h5>
                                        <p className="card-text">
                                          {article.articleIntro}
                                        </p>
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "rgba(0,0,0,0.5)",
                                          }}
                                        >
                                          {formatRelative(
                                            new Date(article.createdAt),
                                            Date.now()
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row">
                          {this.state.articles &&
                            this.state.articles.slice(9, 12).map((article) => (
                              <div
                                key={article._id}
                                className="col-4 col-md-4 mb-3 d-inline-flex justify-content-center "
                              >
                                <Link
                                  onClick={this.scrollToTop}
                                  onMouseEnter={this.hoverHandler}
                                  onMouseLeave={this.hoverAwayHandler}
                                  key={article._id}
                                  to={`/article/${article._id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  <div style={{ margin: "10px" }}>
                                    <div
                                      className="card card-event"
                                      style={{
                                        width: "100%",
                                        maxWidth: "25rem",
                                        border: "1px solid rgba(0,0,0,0.2)",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img
                                        className="card-img-top img-fluid"
                                        src={article.articleCover.url}
                                        style={{
                                          height: "150px",
                                          width: "25rem",
                                        }}
                                        alt="Card image cap"
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {article.articleHeadline}
                                        </h5>
                                        <p className="card-text">
                                          {article.articleIntro}
                                        </p>
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "rgba(0,0,0,0.5)",
                                          }}
                                        >
                                          {formatRelative(
                                            new Date(article.createdAt),
                                            Date.now()
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <button
                      style={{ color: "black" }}
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="prev"
                    >
                      <span
                        style={{
                          backgroundColor: "black",
                          padding: "20px",
                          borderRadius: "20px",
                        }}
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span style={{ color: "black" }} className="invisible">
                        Previous
                      </span>
                    </button>
                    <button
                      style={{ color: "black" }}
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide="next"
                    >
                      <span
                        style={{
                          backgroundColor: "black",
                          padding: "20px",
                          borderRadius: "20px",
                        }}
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span style={{ color: "black" }} className="invisible">
                        Next
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Fragment>
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Fragment>
    );
  }
}

export default withRouter(Article);
