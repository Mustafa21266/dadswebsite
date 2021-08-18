import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAllArticles, searchArticles } from "../../actions/articleActions";
import store from "../../store";
import { formatRelative } from "date-fns";
// import { format, formatDistance, formatRelative, subDays, formatDistanceToNow } from 'date-fns'
import Pagination from "react-js-pagination";
import MetaData from "../MetaData";
import Loader from "../Loader";
// require("bootstrap/less/bootstrap.less");
class AllArticles extends Component {
  originalArticles = [];
  prev = 0;
  skip = 10;
  page = 1;
  orderBy = 1;
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchArticles: [],
      activePage: 1,
      loading: true,
    };
    store.dispatch(getAllArticles()).then((data) => {
      this.originalArticles = data;
      this.setState({ articles: data, loading: false });
      let counter = 0;
      while (counter < data.length) {
        this.page += 1;
        counter += 9;
      }
    });
    this.searchHandler = this.searchHandler.bind(this);
    this.setCurrentPageNo = this.setCurrentPageNo.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
  }
  componentDidMount() {
    if (!this.state.articles[0]) {
    }
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
  setCurrentPageNo(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  handleChangeSort(e) {
    let asc = document.getElementById("asc");
    let desc = document.getElementById("desc");
    if (e.target.id === "asc") {
      asc.style.color = "red";
      asc.style.textDecoration = "underline";
      desc.style.color = "blue";
      desc.style.textDecoration = "none";
      this.orderBy = 1;
      this.searchHandler("");
    } else {
      desc.style.color = "red";
      desc.style.textDecoration = "underline";
      asc.style.color = "blue";
      asc.style.textDecoration = "none";
      this.orderBy = -1;
      this.searchHandler("");
    }
  }
  searchHandler(e) {
    let searchInput = document.getElementById("searchInput");
    // if (searchInput.value.length === 0) {
    //     this.setState({ articles: this.originalArticles });
    // }
    store
      .dispatch(searchArticles(searchInput.value, this.orderBy))
      .then((data) => {
        this.setState({ articles: data });
      });
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"كل المقالات"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
        و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div
              className="row animate__animated animate__fadeIn animate__slower"
              dir="rtl"
              style={{ padding: "30px" }}
            >
              <div className="col-12 col-lg-2">
                <h1 style={{ textAlign: "center" }}>كل المقالات </h1>
                <br></br>
                <br></br>
                <form className="d-flex">
                  <input
                    id="searchInput"
                    onChange={this.searchHandler}
                    className="form-control me-2"
                    type="search"
                    name="searchTerm"
                    placeholder="تبحث عن مقالة معينة؟"
                    aria-label="Search"
                  />
                  {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
                <div>
                  <br></br>
                  <h3 style={{ textAlign: "center" }}>
                    عدد النتائج : {this.state.articles.length}
                  </h3>
                  <br></br>
                  <h4 style={{ textAlign: "right", marginRight: "30px" }}>
                    الترتيب :{" "}
                  </h4>
                  <button
                    id="desc"
                    type="button"
                    className="btn btn-link d-block mx-auto"
                    style={{ color: "red" }}
                    onClick={this.handleChangeSort}
                  >
                    من الأحدث إلي الأقدم
                  </button>
                  <button
                    id="asc"
                    type="button"
                    className="btn btn-link d-block mx-auto"
                    style={{ textDecoration: "none" }}
                    onClick={this.handleChangeSort}
                  >
                    من الأقدم إلي الأحدث
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-10">
                <div className="d-flex flex-wrap justify-content-center">
                  {this.state.articles.length === 0 && <h1>لا توجد نتائج</h1>}
                  {this.state.articles &&
                    this.state.articles
                      .slice(
                        this.state.activePage * 12 - 12,
                        this.state.activePage * 12
                      )
                      .map((article) => (
                        <Link
                          onMouseEnter={this.hoverHandler}
                          onMouseLeave={this.hoverAwayHandler}
                          key={article._id}
                          to={`/article/${article._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div style={{ margin: "50px" }}>
                            <div
                              className="card card-event"
                              style={{
                                width: "18rem",
                                border: "1px solid rgba(0,0,0,0.2)",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                className="card-img-top img-fluid"
                                src={article.articleCover.url}
                                style={{ height: "150px", width: "18rem" }}
                                alt="article cover"
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
                      ))}
                </div>
                <br></br>
                {this.state.articles.length !== 0 && (
                  <div className="w-100 d-flex justify-content-center">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={12}
                      totalItemsCount={this.state.articles.length}
                      onChange={this.setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Previous"}
                      firstPageText={"First"}
                      lastPageText={"Last"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
                <br></br>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default AllArticles;
