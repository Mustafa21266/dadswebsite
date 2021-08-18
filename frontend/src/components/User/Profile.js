import React, { Component } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { avatarChange } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { getAllUserReservations } from "../../actions/reservationActions";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().user,
      redirect: "_id" in store.getState().auth.user ? false : true,
      message: "",
      reservations: [],
      loading: true,
    };
  }
  componentDidMount() {
    store.dispatch(getAllUserReservations()).then((data) => {
      console.log(this.state);
      this.setState({ reservations: data.reservations, loading: false });
      if (this.state.message) {
        toast(this.state.message);
      }
    });
  }
  async change() {
    await this.setState({ message: "store.getState().auth.user.message" });
  }
  async changeAvatarHandler(e) {
    const formData = new FormData();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        document.getElementById("avatarImg").setAttribute("src", reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    formData.set("avatar", e.target.files[0]);
    store
      .dispatch(avatarChange(store.getState().auth.user._id, formData))
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
    // console.log(e.target.files[0])
    // const objectURL = URL.createObjectURL(e.target.files[0])
  }
  hoverHandler(e) {
    e.target.style.border = "3px solid rgba(0,0,0,0.5)";
    e.target.style.opacity = "0.4";
    e.target.style.transition = "opacity 2s, border 2s";
  }
  hoverAwayHandler(e) {
    e.target.style.border = "4px solid rgba(0,0,0,0.3)";
    e.target.style.opacity = "1";
    e.target.style.transition = "opacity 2s, border 2s";
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
            <Link
              className="btn btn-primary"
              to={`/me/reservations/${reservation._id}`}
            >
              <i className="bi bi-eye"></i>
            </Link>
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
          title={`حسابي الشخصي`}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {!this.state.redirect ? (
          <Fragment>
            {this.state.loading === true ? (
              <Loader />
            ) : (
              <Fragment>
                <br></br>
                <br></br>
                <br></br>
                <div
                  className="row mt-5 user-info  animate__animated animate__fadeIn"
                  style={{ padding: "20px 50px" }}
                >
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <figure
                        className="avatar avatar-profile"
                        style={{ display: "block", margin: "auto" }}
                      >
                        <img
                          id="avatarImg"
                          className="img-fluid d-block mx-auto"
                          onClick={(e) =>
                            document.getElementById("avatar").click()
                          }
                          src={
                            "avatar" in store.getState().auth.user
                              ? store.getState().auth.user.avatar.url
                              : "images/default_avatar.png"
                          }
                          alt={`${store.getState().auth.user.name} Avatar`}
                          style={{
                            width: "350px",
                            height: "350px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            border: "4px solid rgba(0,0,0,0.2)",
                          }}
                          onMouseEnter={this.hoverHandler}
                          onMouseLeave={this.hoverAwayHandler}
                        />
                        <input
                          onChange={(e) => this.changeAvatarHandler(e)}
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/*"
                          style={{ visibility: "hidden" }}
                        />
                      </figure>
                      <br></br>
                      <Link
                        to="/me/update"
                        id="edit_profile"
                        className="btn btn-primary d-block mx-auto"
                        style={{ width: "150px" }}
                      >
                        تعديل الحساب
                      </Link>
                      <br></br>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            تفاصيل الحساب
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
                            حجوزاتي
                          </button>
                          {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <br></br>
                          <h4
                            style={{ textAlign: "right", marginBottom: "20px" }}
                          >
                            {" "}
                            <span>{store.getState().auth.user.name}</span>{" "}
                            :الأسم
                          </h4>
                          <h4
                            style={{ textAlign: "right", marginBottom: "20px" }}
                          >
                            رقم التليفون:{" "}
                            <span>{store.getState().auth.user.phoneNo}</span>
                          </h4>
                          <h4
                            style={{ textAlign: "right", marginBottom: "20px" }}
                          >
                            تاريخ التسجيل :{" "}
                            <span>
                              {String(
                                store.getState().auth.user.createdAt
                              ).substring(0, 10)}
                            </span>
                          </h4>
                          <h4
                            style={{ textAlign: "right", marginBottom: "20px" }}
                          >
                            {" "}
                            <span>
                              {store
                                .getState()
                                .auth.user.role.charAt(0)
                                .toUpperCase() +
                                store.getState().auth.user.role.substring(1)}
                            </span>
                            : نوع الحساب
                          </h4>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-reservation"
                          role="tabpanel"
                          aria-labelledby="nav-reservation-tab"
                        >
                          <br></br>
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
                        {/* <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Fragment>
    );
  }
}
export default Profile;
