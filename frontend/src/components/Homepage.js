import React, { Component } from "react";
import { Fragment } from "react";
import "./Homepage.css";
import { getReviewsVezeeta } from "../actions/rootActions";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
import { getAllPlaces } from "../actions/adminActions";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsVezeeta: [],
      loading: true,
    };
  }
  componentDidMount() {
    getReviewsVezeeta(store.dispatch);
    setTimeout(async () => {
      this.setState((state, props) => {
        return {
          reviewsVezeeta: store.getState().root.reviewsVezeeta,
          loading: false,
        };
      });
    }, 1000);
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`الصفحه الرسمية للدكتور صلاح الجوهري`}
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
            <div>
              <div
                className="jumbotron hospital-container animate__animated animate__fadeIn animate__slower"
                style={{ padding: "0px 20px", paddingTop: "10px" }}
              >
                <div className="row h-100">
                  <div
                    className="col-12 col-lg-7 d-flex"
                    style={{ padding: "20px" }}
                  >
                    <div className="w-100 align-self-center">
                      <div className="">
                        <h1 className="we-care-title">
                          <span style={{ color: "#e62e57" }}>
                            We Take Care Of Your{" "}
                          </span>
                        </h1>
                        {/* <h1  className="we-care-title-3"  style={{textAlign: 'right'}}></h1> */}
                        <h1
                          className="we-care-title-2"
                          style={{ textAlign: "right" }}
                        >
                          <span
                            className="we-care-title-3"
                            style={{ color: "#0e68a4", textAlign: "center" }}
                          >
                            Future{" "}
                          </span>
                          <span style={{ color: "#e62e57" }}>Health.</span>
                        </h1>
                      </div>

                      <p
                        className="lead we-care-title"
                        style={{ textAlign: "right", color: "white" }}
                      >
                        .أستاذ دكتور صلاح الجوهري
                      </p>
                      <hr className="my-4" />
                      <p style={{ textAlign: "right", color: "white" }}>
                        {" "}
                        . أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب
                        طنطا و استشاري الجراحة العامة و جراحات المناظير
                      </p>
                      <Link
                        className="btn btn-primary float-right"
                        to="/reservations/create"
                        role="button"
                        style={{ borderRadius: "50px", padding: "10px 20px" }}
                      >
                        احجز الأن
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <img
                      className="img-fluid d-block mx-auto"
                      src="dad_1.png"
                      style={{ height: "100%", width: "100%" }}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12"></div>
              </div>
              <br></br>
              <br></br>
              <div className="container">
                <h1 className="text-center">رسالتنا</h1>
                <br></br>
                <hr className="my-4" />
                <h1 className="text-center"> ليه تختار عياداتنا؟</h1>
                <br></br>
                <hr className="my-4" />
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <img
                      className="img-fluid d-block mx-auto animate__animated animate__fadeIn animate__slower animate__infinite"
                      style={{ width: "150px" }}
                      src="images/doctor_avatar.png"
                    ></img>
                  </div>
                  <div
                    className="col-12 col-lg-6"
                    style={{ borderLeft: "2px solid black" }}
                  >
                    <h4
                      className="text-right"
                      style={{ fontWeight: 700, textAlign: "right" }}
                    >
                      لأننا نهتم بك
                    </h4>
                    <h5
                      className="text-right"
                      style={{ fontWeight: 500, textAlign: "right" }}
                    >
                      : عشان صحتك أهم
                    </h5>
                    <p className="text-right" style={{ textAlign: "right" }}>
                      {" "}
                      عياداتنا مجهزة بأفضل وسائل الأمان والمعدات الحديثة و ذلك
                      لضمان كفاءه عملية الكشف بنجاح و نتخذ جميع الاجراءات
                      اللازمة لتوصيل الخدمات الطبية بأفضل الطرق العملية
                    </p>
                  </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                  <div
                    className="col-12 col-lg-6"
                    style={{ borderRight: "2px solid black" }}
                  >
                    <h4
                      className="text-right"
                      style={{ fontWeight: 700, textAlign: "right" }}
                    >
                      الخبرة
                    </h4>
                    <h5
                      className="text-right"
                      style={{ fontWeight: 500, textAlign: "right" }}
                    >
                      : عشان عايزينك تطمن
                    </h5>
                    <p className="text-right" style={{ textAlign: "right" }}>
                      الأستاذ الدكتور صلاح الجوهري لديه خبرة عشرات السنين من
                      الجراحة العامة و جراحات الأورام{" "}
                    </p>
                    <p className="text-right" style={{ textAlign: "right" }}>
                      احنا بنضمنلك إتمام العلاج بنجاح و التعافى علي خير بأذن
                      الله
                    </p>
                  </div>
                  <div className="col-12 col-lg-6">
                    <img
                      className="img-fluid d-block mx-auto animate__animated animate__swing animate__infinite"
                      style={{ width: "150px" }}
                      src="images/scalpel-pngrepo-com.png"
                    ></img>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <img
                      className="img-fluid d-block mx-auto animate__animated animate__pulse animate__infinite infinite"
                      style={{ width: "150px" }}
                      src="images/835-8355467_exam-png.png"
                    ></img>
                  </div>
                  <div
                    className="col-12 col-lg-6"
                    style={{ borderLeft: "2px solid black" }}
                  >
                    <h4
                      className="text-right"
                      style={{ fontWeight: 700, textAlign: "right" }}
                    >
                      المتابعة
                    </h4>
                    <h5
                      className="text-right"
                      style={{ fontWeight: 500, textAlign: "right" }}
                    >
                      : عشان مهمتنا مش بتخلص{" "}
                    </h5>
                    <p className="text-right" style={{ textAlign: "right" }}>
                      الدكتور صلاح الجوهرى هيتابع معاك طول فترة العلاج و خدماته
                      لا تنتهي حتى بعد فتره العلاج و التعافى
                    </p>
                    {/* <p className="text-right">و ده عشان </p> */}
                  </div>
                </div>
                <hr className="my-4" />

                <br></br>
                <div className="row">
                  <div className="col-12">
                    {this.state.reviewsVezeeta && (
                      <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <a
                          className="text-center"
                          style={{ color: "black" }}
                          href="https://www.vezeeta.com/ar/dr/%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%B5%D9%84%D8%A7%D8%AD-%D8%A7%D9%84%D8%AC%D9%88%D9%87%D8%B1%D9%8A-%D8%AC%D8%B1%D8%A7%D8%AD%D8%A9-%D8%B9%D8%A7%D9%85%D8%A9#patients-reviews"
                          target="_blank"
                        >
                          <h1 className="text-center">
                            بعض تقييمات عملائنا علي فيزيتا
                          </h1>
                        </a>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <div className="row">
                              {this.state.reviewsVezeeta &&
                                this.state.reviewsVezeeta
                                  .slice(0, 3)
                                  .map((review) => (
                                    <div
                                      key={review._id}
                                      className="col-4 col-md-4 mb-3 d-inline-block"
                                      key={
                                        "review_" +
                                        Date.now() +
                                        Math.random() * 100
                                      }
                                    >
                                      <div className="card">
                                        <br></br>
                                        {review.gender &&
                                        review.gender === "male" ? (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="male_avatar.png"
                                          />
                                        ) : (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="female_avatar.png"
                                          />
                                        )}
                                        <div className="card-body">
                                          <h4 className="card-title text-center">
                                            {review.name}
                                          </h4>
                                          <p className="card-text text-center">
                                            {review.review}
                                          </p>
                                          <hr></hr>
                                          <div id="circle">
                                            <span className="text-center">
                                              {review.rating}{" "}
                                              <i className="fas fa-star"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="row">
                              {this.state.reviewsVezeeta &&
                                this.state.reviewsVezeeta
                                  .slice(3, 6)
                                  .map((review) => (
                                    <div
                                      key={review._id}
                                      className="col-4 col-md-4 mb-3"
                                      key={
                                        "review_" +
                                        Date.now() +
                                        Math.random() * 100
                                      }
                                    >
                                      <div className="card">
                                        <br></br>
                                        {review.gender &&
                                        review.gender === "male" ? (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="male_avatar.png"
                                          />
                                        ) : (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="female_avatar.png"
                                          />
                                        )}
                                        <div className="card-body">
                                          <h4 className="card-title text-center">
                                            {review.name}
                                          </h4>
                                          <p className="card-text text-center">
                                            {review.review}
                                          </p>
                                          <hr></hr>
                                          <div id="circle">
                                            <span className="text-center">
                                              {review.rating}{" "}
                                              <i className="fas fa-star"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="row">
                              {this.state.reviewsVezeeta &&
                                this.state.reviewsVezeeta
                                  .slice(6, 9)
                                  .map((review) => (
                                    <div
                                      key={review._id}
                                      className="col-4 col-md-4 mb-3"
                                      key={
                                        "review_" +
                                        Date.now() +
                                        Math.random() * 100
                                      }
                                    >
                                      <div className="card">
                                        <br></br>
                                        {review.gender &&
                                        review.gender === "male" ? (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="male_avatar.png"
                                          />
                                        ) : (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="female_avatar.png"
                                          />
                                        )}
                                        <div className="card-body">
                                          <h4 className="card-title text-center">
                                            {review.name}
                                          </h4>
                                          <p className="card-text text-center">
                                            {review.review}
                                          </p>

                                          <hr></hr>
                                          <div id="circle">
                                            <span className="text-center">
                                              {review.rating}{" "}
                                              <i className="fas fa-star"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                            </div>
                          </div>
                          <div className="carousel-item">
                            <div className="row">
                              {this.state.reviewsVezeeta &&
                                this.state.reviewsVezeeta
                                  .slice(9, 12)
                                  .map((review) => (
                                    <div
                                      key={review._id}
                                      className="col-4 col-md-4 mb-3"
                                      key={
                                        "review_" +
                                        Date.now() +
                                        Math.random() * 100
                                      }
                                    >
                                      <div className="card">
                                        <br></br>
                                        {review.gender &&
                                        review.gender === "male" ? (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="male_avatar.png"
                                          />
                                        ) : (
                                          <img
                                            className="img-fluid d-block mx-auto review-avatar"
                                            alt="100%x280"
                                            src="female_avatar.png"
                                          />
                                        )}
                                        <div className="card-body">
                                          <h4 className="card-title text-center">
                                            {review.name}
                                          </h4>
                                          <p className="card-text text-center">
                                            {review.review}
                                          </p>

                                          <hr></hr>
                                          <div id="circle">
                                            <span className="text-center">
                                              {review.rating}{" "}
                                              <i className="fas fa-star"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
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
                          <span
                            style={{ color: "black" }}
                            className="invisible"
                          >
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
                          <span
                            style={{ color: "black" }}
                            className="invisible"
                          >
                            Next
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Homepage;
