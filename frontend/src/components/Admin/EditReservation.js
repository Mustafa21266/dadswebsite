import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  updateReservationStatus,
  deleteReservation,
} from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader";
class EditReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: store
        .getState()
        .auth.reservations.filter(
          (reservation) => reservation._id === this.props.match.params.id
        )[0],
      edited: false,
      loading: true,
    };
    this.handleDeleteReservation = this.handleDeleteReservation.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    const formData = new FormData();
    formData.set("status", document.getElementById("statusSelect").value);
    store
      .dispatch(updateReservationStatus(this.props.match.params.id, formData))
      .then((data) => {
        if (data.success === true) {
          document.getElementById("loader").style.display = "none";
          toast.success(data.message);
          this.setState((state, props) => {
            return { edited: true };
          });
        } else {
          document.getElementById("loader").style.display = "none";
          toast.error(data.message);
        }
      });
    // await store.dispatch(loginAdmin(formData))
  }
  async handleDeleteReservation(e) {
    store
      .dispatch(deleteReservation(this.props.match.params.id))
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          this.setState((state, props) => {
            return { edited: true };
          });
        } else {
          toast.error(data.message);
        }
      });
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"تعديل حجز"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {"_id" in store.getState().auth.user ? (
          <Fragment>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">
              {this.state.loading === true ? (
                <Loader />
              ) : (
                <Fragment>
                  <br></br>
                  <br></br>
                  <h1 className="text-center">تفاصيل الحجز</h1>
                  <br></br>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    {this.state.edited ? (
                      <Redirect to="/admin/dashboard" />
                    ) : (
                      ""
                    )}
                    <div
                      className="col-12 col-lg-4"
                      style={{ padding: "30px" }}
                    >
                      <img
                        src={
                          "avatar" in this.state.reservation.user
                            ? this.state.reservation.user.avatar.url
                            : "images/default_avatar.png"
                        }
                        alt="user avatar"
                        className="img-fluid d-block mx-auto"
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "50%",
                        }}
                      />
                      <br></br>
                    </div>
                    <div
                      className="col-12 col-lg-8"
                      style={{ padding: "30px" }}
                    >
                      <br></br>
                      <form onSubmit={(e) => this.onSubmitHandler(e)}>
                        <div className="form-group"></div>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            {this.state.reservation.name} : بأسم
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            {" "}
                            المكان :{" "}
                            {
                              this.state.reservation.reservationDetails.place
                                .name
                            }
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            {" "}
                            تاريخ :{" "}
                            {
                              this.state.reservation.reservationDetails.dayText
                            }{" "}
                            {
                              this.state.reservation.reservationDetails
                                .dayNumber
                            }{" "}
                            {this.state.reservation.reservationDetails.month} -{" "}
                            {this.state.reservation.reservationDetails.year}
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            {this.state.reservation.reservationDetails.fromTime}{" "}
                            - {this.state.reservation.reservationDetails.toTime}{" "}
                            : الفترة{" "}
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            {String(this.state.reservation.createdAt).substring(
                              0,
                              10
                            )}{" "}
                            : تاريخ الحجز{" "}
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}> : ملاحظات</h4>
                          <br></br>
                          <textarea
                            className="form-control"
                            value={this.state.reservation.additionalNotes}
                            rows="10"
                            readOnly
                          ></textarea>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}>
                            ج.م{" "}
                            {
                              this.state.reservation.reservationDetails.place
                                .reservationPrice
                            }{" "}
                            : سعر الكشف{" "}
                          </h4>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <h4 style={{ textAlign: "right" }}> : حاله الحجز</h4>
                          <br></br>
                          <select
                            id="statusSelect"
                            defaultValue={this.state.reservation.status}
                            className="form-select"
                            aria-label="Default select example"
                            name="role"
                          >
                            <option
                              value="قادم"
                              selected={
                                this.state.reservation.status === "قادم"
                                  ? true
                                  : false
                              }
                            >
                              قادم
                            </option>
                            <option
                              value="تم الحضور"
                              selected={
                                this.state.reservation.status === "تم الحضور"
                                  ? true
                                  : false
                              }
                            >
                              تم الحضور
                            </option>
                            <option
                              value="لم يتم الحضور"
                              selected={
                                this.state.reservation.status ===
                                "لم يتم الحضور"
                                  ? true
                                  : false
                              }
                            >
                              لم يتم الحضور
                            </option>
                            <option
                              value="ملغي"
                              selected={
                                this.state.reservation.status === "ملغي"
                                  ? true
                                  : false
                              }
                            >
                              ملغي
                            </option>
                          </select>
                        </div>
                        <br></br>
                        <button
                          type="submit"
                          className="btn btn-outline-primary d-block mx-auto"
                          style={{ borderRadius: "50px", padding: "10px 30px" }}
                        >
                          تغيير الحاله
                        </button>
                        <br></br>
                        <button
                          type="button"
                          className="btn btn-outline-danger d-block mx-auto"
                          style={{ borderRadius: "50px", padding: "10px 30px" }}
                          onClick={this.handleDeleteReservation}
                        >
                          مسح
                        </button>
                        <br></br>
                        <div id="loader" style={{ display: "none" }}>
                          <div className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <br></br>
          </Fragment>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Fragment>
    );
  }
}
export default withRouter(EditReservation);
