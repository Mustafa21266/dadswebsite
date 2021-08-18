import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { cancelReservation } from "../../actions/reservationActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader";
class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: store
        .getState()
        .reservation.currentUserReservations.filter(
          (reservation) => reservation._id === this.props.match.params.id
        )[0],
      edited: false,
      loading: true,
    };
    this.handleCancelReservation = this.handleCancelReservation.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  async handleCancelReservation(e) {
    store
      .dispatch(cancelReservation(this.props.match.params.id))
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
                  <MetaData
                    title={`تفاصيل الحجز: #${this.state.reservation._id}`}
                    description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
                    image={
                      "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
                    }
                    url={window.location.href}
                  />
                  <br></br>
                  <br></br>
                  <h1 className="text-center">تفاصيل الحجز</h1>
                  <br></br>
                  <br></br>
                  <hr></hr>
                  <br></br>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    {this.state.edited ? <Redirect to="/me" /> : ""}
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
                        <br></br>
                        {this.state.reservation.status === "قادم" && (
                          <Fragment>
                            <button
                              type="button"
                              className="btn btn-outline-danger d-block mx-auto"
                              style={{
                                borderRadius: "50px",
                                padding: "10px 30px",
                              }}
                              onClick={this.handleCancelReservation}
                            >
                              إلغاء الحجز
                            </button>
                          </Fragment>
                        )}
                        {/* {this.state.reservation.status === "" &&  (
                                                <Fragment>
                                                    <button type="button" className="btn btn-danger d-block mx-auto" onClick={this.handleCancelReservation}>إلغاء الحجز</button>
                                                </Fragment>
                                            )
                                            } */}
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
export default withRouter(ReservationDetails);
