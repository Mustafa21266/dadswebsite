import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getAllReservations } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../MetaData";
import Loader from "../Loader";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      places: [],
      articles: [],
      reservations: [],
      loading: true,
    };
    store.dispatch(getAllUsers()).then(async (usersData) => {
      await store.dispatch(getAllReservations()).then((reservationData) => {
        if (reservationData.success === true) {
          this.setState({
            users: usersData.users,
            places: store.getState().place.places,
            articles: store.getState().article.articles,
            reservations: reservationData.reservations,
            loading: false,
          });
        } else {
          toast.error(reservationData.message);
          this.setState({
            loading: false,
          });
        }
      });
    });
  }
  componentDidMount() {}
  setPlaces() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "العنوان",
          field: "address",
          sort: "asc",
        },
        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.places.forEach((place) => {
      data.rows = data.rows.concat({
        id: place._id,
        name: place.name,
        address: `${place.address}`,
        createdAt: String(place.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/places/update/${place._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  setArticles() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "عنوان المقاله",
          field: "articleHeadline",
          sort: "asc",
        },
        {
          label: "مقدمه المقالة",
          field: "articleIntro",
          sort: "asc",
        },
        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.articles.forEach((article) => {
      data.rows = data.rows.concat({
        id: article._id,
        articleHeadline: article.articleHeadline,
        articleIntro: `${article.articleIntro}`,
        createdAt: String(article.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/article/edit/${article._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  setUsers() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "رقم التليفون",
          field: "phoneNo",
          sort: "asc",
        },
        {
          label: "الدور",
          field: "role",
          sort: "asc",
        },

        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.users.forEach((user) => {
      data.rows = data.rows.concat({
        id: user._id,
        name: user.name,
        phoneNo: `${user.phoneNo}`,
        role: `${user.role}`,
        createdAt: String(user.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/user/update/${user._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  setReservations() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "بأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "المكان",
          field: "place",
          sort: "asc",
        },
        {
          label: "اليوم",
          field: "day",
          sort: "asc",
        },
        {
          label: "الشهر",
          field: "month",
          sort: "asc",
        },
        {
          label: "السنه",
          field: "year",
          sort: "asc",
        },
        {
          label: "من",
          field: "fromTime",
          sort: "asc",
        },
        {
          label: "إلي",
          field: "toTime",
          sort: "asc",
        },
        {
          label: "ملاحظات",
          field: "additionalNotes",
          sort: "asc",
        },

        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },

        {
          label: "سعر الكشف",
          field: "reservationPrice",
          sort: "asc",
        },
        {
          label: "الحاله",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.reservations.forEach((reservation) => {
      data.rows = data.rows.concat({
        id: reservation._id,
        name: reservation.name,
        place: `${reservation.reservationDetails.place.name}`,
        day: `${reservation.reservationDetails.dayNumber} | ${reservation.reservationDetails.dayText}`,
        month: `${reservation.reservationDetails.month}`,
        year: `${reservation.reservationDetails.year}`,
        fromTime: `${reservation.reservationDetails.fromTime}`,
        toTime: `${reservation.reservationDetails.toTime}`,
        additionalNotes: `${reservation.additionalNotes}`,
        createdAt: String(reservation.createdAt).substring(0, 10),
        reservationPrice: reservation.reservationDetails.place.reservationPrice,
        status: `${reservation.status}`,
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/reservation/update/${reservation._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"لوجة تحكم الأدمن"}
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
              style={{ padding: "30px" }}
              dir="rtl"
            >
              <div className="col-12 col-lg-2" dir="ltr">
                <h1 style={{ textAlign: "center" }}>
                  <i className="bi bi-speedometer"></i>
                </h1>
                <h1 style={{ textAlign: "center" }}> لوحة التحكم</h1>
                <br></br>
                <ul className="nav flex-column nav-pills nav-fill">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      الرئيسية
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="reservation-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reservation"
                      type="button"
                      role="tab"
                      aria-controls="reservation"
                      aria-selected="false"
                    >
                      الحجوزات
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="user-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#user"
                      type="button"
                      role="tab"
                      aria-controls="user"
                      aria-selected="false"
                    >
                      المستخدمين
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="place-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#place"
                      type="button"
                      role="tab"
                      aria-controls="place"
                      aria-selected="false"
                    >
                      الأماكن
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="article-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#article"
                      type="button"
                      role="tab"
                      aria-controls="article"
                      aria-selected="false"
                    >
                      المقالات
                    </a>
                  </li>
                </ul>

                {/* 
                <ul className="nav flex-column" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="reservation-tab" data-bs-toggle="tab" data-bs-target="#reservation" type="button" role="tab" aria-controls="reservation" aria-selected="false">reservation</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user" type="button" role="tab" aria-controls="user" aria-selected="false">user</button>
                    </li>
                </ul> */}
                <br></br>
                <hr></hr>
                <br></br>
              </div>
              <div className="col-12 col-lg-10">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div
                        className="col-12 col-lg-6"
                        style={{ textAlign: "center" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-person"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.users.length}
                            </h4>
                            <p className="card-text text-center">مستخدمين</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("user-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-lg-6"
                        style={{ textAlign: "center" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-house-door"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.places.length}
                            </h4>
                            <p className="card-text text-center">أماكن</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("place-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div
                        className="col-12 col-lg-6"
                        style={{ textAlign: "center" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-layout-text-sidebar-reverse"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.articles.length}
                            </h4>
                            <p className="card-text text-center">مقالات</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("article-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-lg-6"
                        style={{ textAlign: "center" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-calendar4-week"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.reservations.length}
                            </h4>
                            <p className="card-text text-center">الحجوزات</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document
                                  .getElementById("reservation-tab")
                                  .click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="reservation"
                    role="tabpanel"
                    aria-labelledby="reservation-tab"
                  >
                    <MDBDataTable
                      data={this.setReservations()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="user"
                    role="tabpanel"
                    aria-labelledby="user-tab"
                  >
                    <MDBDataTable
                      data={this.setUsers()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="place"
                    role="tabpanel"
                    aria-labelledby="place-tab"
                  >
                    <Link
                      className="btn btn-primary d-block mx-auto"
                      to="/admin/places/create"
                      style={{ width: "200px" }}
                    >
                      إضافه مكان جديد
                    </Link>
                    <br></br>
                    <hr></hr>
                    <MDBDataTable
                      data={this.setPlaces()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="article"
                    role="tabpanel"
                    aria-labelledby="article-tab"
                  >
                    <Link
                      className="btn btn-primary d-block mx-auto"
                      to="/admin/article/create"
                      style={{ width: "200px" }}
                    >
                      إضافه مقاله جديدة
                    </Link>
                    <br></br>
                    <hr></hr>
                    <MDBDataTable
                      data={this.setArticles()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Fragment>
    );
  }
}
export default withRouter(Dashboard);
