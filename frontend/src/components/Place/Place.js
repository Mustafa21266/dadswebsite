import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
import { withRouter } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader";
class Place extends Component {
  startDate = new Date();
  daysObj = {
    Sat: "السبت",
    Sun: "الأحد",
    Mon: "الأثنين",
    Tue: "الثلاثاء",
    Wed: "الأربعاء",
    Thu: "الخميس",
    Fri: "الجمعه",
  };
  constructor(props) {
    super(props);
    console.log(
      store
        .getState()
        .place.places.filter(
          (place) => place._id === this.props.match.params.id
        )[0]
        .workingDays.filter(
          (day) =>
            day.day === this.daysObj[String(this.startDate).split(" ")[0]]
        )[0].fromTime
    );
    this.state = {
      place: store
        .getState()
        .place.places.filter(
          (place) => place._id === this.props.match.params.id
        )[0],
      loading: true,
      isOpen: store
        .getState()
        .place.places.filter(
          (place) => place._id === this.props.match.params.id
        )[0]
        .workingDays.filter(
          (day) =>
            day.day === this.daysObj[String(this.startDate).split(" ")[0]]
        )[0].fromTime
        ? true
        : false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  componentDidUpdate(e) {
    if (this.props.match.params.id !== e.match.params.id) {
      this.setState({
        loading: false,
        place: store
          .getState()
          .place.places.filter(
            (place) => place._id === this.props.match.params.id
          )[0],
        isOpen: store
          .getState()
          .place.places.filter(
            (place) => place._id === this.props.match.params.id
          )[0]
          .workingDays.filter(
            (day) =>
              day.day === this.daysObj[String(this.startDate).split(" ")[0]]
          )[0].fromTime
          ? true
          : false,
      });
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData
              title={`${this.state.place.name}`}
              description={this.state.place.description}
              image={this.state.place.placeLogo.url}
              url={window.location.href}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row animate__animated animate__fadeIn animate__slower">
              <div className="col-12">
                <img
                  src={this.state.place.placeLogo.url}
                  className="img-fluid w-100"
                  style={{ height: "15rem" }}
                />
              </div>
            </div>

            <div
              className="row"
              style={{ position: "relative", bottom: "100px" }}
            >
              <div className="col-12">
                <img
                  src={this.state.place.placeCover.url}
                  className="img-fluid d-block mx-auto"
                  style={{
                    height: "300px",
                    width: "300px",
                    borderRadius: "50%",
                    border: "5px solid rgba(0,0,0,0.3)",
                  }}
                />
                <br></br>
                <h1 style={{ textAlign: "center" }}>{this.state.place.name}</h1>
                <br></br>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  {this.state.place.address}{" "}
                  <i className="bi bi-geo-alt-fill"></i>{" "}
                </p>
                <br></br>
                {this.state.isOpen && (
                  <span
                    className="badge rounded-pill bg-success  d-block mx-auto"
                    style={{ width: "150px", padding: "10px" }}
                  >
                    مفتوح اليوم
                  </span>
                )}
                {!this.state.isOpen && (
                  <span
                    className="badge rounded-pill bg-danger d-block mx-auto"
                    style={{ width: "150px", padding: "10px" }}
                  >
                    مغلق اليوم
                  </span>
                )}
                <br></br>
                {"_id" in store.getState().auth.user &&
                  store.getState().auth.user.role === "admin" && (
                    <div className="w-100 d-flex justify-content-center">
                      <Link
                        className="btn btn-outline-info"
                        style={{ borderRadius: "50px", padding: "10px 30px" }}
                        to={`/admin/places/update/${this.props.match.params.id}`}
                      >
                        تعديل
                      </Link>
                    </div>
                  )}

                <br></br>
              </div>
            </div>

            <div
              className="row"
              style={{ position: "relative", bottom: "100px" }}
            >
              <div className="col-12 col-lg-10 mx-auto">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-description-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-description"
                      type="button"
                      role="tab"
                      aria-controls="nav-description"
                      aria-selected="true"
                    >
                      الوصف
                    </button>
                    <button
                      className="nav-link"
                      id="nav-gallery-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-gallery"
                      type="button"
                      role="tab"
                      aria-controls="nav-gallery"
                      aria-selected="false"
                    >
                      الصور
                    </button>
                    <button
                      className="nav-link"
                      id="nav-schedule-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-schedule"
                      type="button"
                      role="tab"
                      aria-controls="nav-schedule"
                      aria-selected="false"
                    >
                      المواعيد
                    </button>
                    <button
                      className="nav-link"
                      id="nav-reservation-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-reservation"
                      type="button"
                      role="tab"
                      aria-controls="nav-reservation"
                      aria-selected="false"
                    >
                      للحجز و الأستعلام
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-description"
                    role="tabpanel"
                    aria-labelledby="nav-description-tab"
                    style={{ padding: "30px" }}
                  >
                    <br></br>
                    <p style={{ textAlign: "right" }}>
                      {this.state.place.description}
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-gallery"
                    role="tabpanel"
                    aria-labelledby="nav-gallery-tab"
                    style={{ padding: "30px" }}
                  >
                    <div
                      id="carouselExampleControls"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={this.state.place.placeImages[0].url}
                            className="img-fluid d-block w-100"
                            style={{ height: "22rem" }}
                            alt="place image"
                          />
                        </div>
                        {this.state.place.placeImages.slice(1).map((img) => (
                          <Fragment key={img._id}>
                            <div className="carousel-item">
                              <img
                                src={img.url}
                                className="img-fluid d-block w-100"
                                style={{ height: "22rem" }}
                                alt="place image"
                              />
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-schedule"
                    role="tabpanel"
                    aria-labelledby="nav-schedule-tab"
                    style={{ padding: "30px" }}
                  >
                    <br></br>
                    <table
                      className="table table-hover table-bordered table-responsive"
                      dir="rtl"
                    >
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">اليوم</th>
                          <th scope="col">من</th>
                          <th scope="col">إلي</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.place.workingDays.map((day, index) => (
                          <Fragment key={`day${index}`}>
                            <tr>
                              <th scope="row">{day.day}</th>
                              <td>{day.fromTime ? day.fromTime : "لا يوجد"}</td>
                              <td>{day.toTime ? day.toTime : "لا يوجد"}</td>
                            </tr>
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-reservation"
                    role="tabpanel"
                    aria-labelledby="nav-reservation-tab"
                    style={{ padding: "30px" }}
                  >
                    <br></br>
                    <h2 className="w-100" style={{ textAlign: "center" }}>
                      <i className="bi bi-telephone-fill">
                        {" "}
                        {this.state.place.clinicNumberOne}
                      </i>
                    </h2>
                    <br></br>
                    <h2 className="w-100" style={{ textAlign: "center" }}>
                      <i className="bi bi-phone-fill">
                        {" "}
                        {this.state.place.clinicNumberTwo}
                      </i>
                    </h2>
                    <br></br>
                    <Link
                      className="btn btn-primary d-block mx-auto"
                      to="/reservations/create"
                      role="button"
                      style={{
                        borderRadius: "50px",
                        padding: "10px 20px",
                        width: "250px",
                      }}
                    >
                      احجز الأن
                    </Link>
                    <br></br>
                    <a
                      href="https://www.vezeeta.com/ar/dr/%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%B5%D9%84%D8%A7%D8%AD-%D8%A7%D9%84%D8%AC%D9%88%D9%87%D8%B1%D9%8A-%D8%AC%D8%B1%D8%A7%D8%AD%D8%A9-%D8%B9%D8%A7%D9%85%D8%A9"
                      target="_blank"
                      className="btn btn-warning d-block mx-auto"
                      style={{
                        borderRadius: "50px",
                        padding: "10px 20px",
                        width: "250px",
                      }}
                    >
                      <img
                        style={{
                          width: "60px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                        src={
                          "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628685314/dadswebsite/vez_s9vplf.png"
                        }
                      />{" "}
                      احجز عن طريق
                    </a>
                    <br></br>
                    <a
                      className="btn btn-outline-secondary d-block mx-auto"
                      style={{
                        borderRadius: "50px",
                        padding: "10px 20px",
                        width: "250px",
                      }}
                      href={`https://www.google.com/maps?saddr=My+Location&daddr=${this.state.place.address}`}
                      target="_blank"
                    >
                      <img
                        src="https://etak-start.s3.eu-west-3.amazonaws.com/media/google-maps.png"
                        className="google-maps-icon"
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <span className="color-white">العنوان علي</span>
                    </a>
                    <br></br>
                  </div>
                </div>
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

export default withRouter(Place);
{
  /* <meta property="og:title" content="{{this.state.article.headline}}" />
<meta property="og:description" content="{{this.state.article.intro_text}}" />
<meta property="og:image" content="https://etak-start.s3.eu-west-3.amazonaws.com/media/{{this.state.article.article_cover}}" />
<meta property="og:url" content="{{metaUrl}}" />
<meta name="twitter:title" content="{{this.state.article.headline}}" />
<meta name="twitter:description" content=" {{this.state.article.intro_text}}" />
<meta name="twitter:image" content=" http://etak-start.s3.eu-west-3.amazonaws.com/media/{{this.state.article.article_cover}}" />
<meta name="twitter:card" content="summary_large_image" /> */
}
