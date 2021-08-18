import React, { Component } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../../store";
import { toast } from "material-react-toastify";
import { createReservation } from "../../actions/reservationActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { da } from "date-fns/locale";
class CreateReservation extends Component {
  daysObj = {
    Sat: "السبت",
    Sun: "الأحد",
    Mon: "الأثنين",
    Tue: "الثلاثاء",
    Wed: "الأربعاء",
    Thu: "الخميس",
    Fri: "الجمعه",
  };
  monthsObj = {
    Jan: ["يناير", "January"],
    Feb: ["فبراير", "February"],
    Mar: ["مارس", "March"],
    Apr: ["إبريل", "April"],
    May: ["مايو", "May"],
    Jun: ["يونيو", "June"],
    Jul: ["يوليو", "July"],
    Aug: ["أغسطس", "August"],
    Sep: ["سبتمبر", "September"],
    Oct: ["أكتوبر", "October"],
    Nov: ["نوفمبر", "November"],
    Dec: ["ديسمبر", "December"],
  };
  startDate = new Date();
  btnActivate = true;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      place: "",
      password: "",
      created: false,
      places: store.getState().place.places,
      additionalNotes: "",
      loading: true,
      selectedPlace: store.getState().place.places[0],
      dateRefresh: false,
      res: {},
      user: store.getState().auth.user,
    };
    this.handleChangePlace = this.handleChangePlace.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
      this.checkDayHandler(this.startDate);
      // document.getElementsByClassName("react-datepicker__input-container")[0].classList.add("d-flex","justify-content-around")
      // let elm = document.createElement("span")
      // elm.textContent = "غير متوفر"
      // elm.style = "color: red;text-align: center;width: 200px;"
      // elm.id = "changeStatus"
      // document.getElementsByClassName("react-datepicker__input-container")[0].appendChild(elm);
    }, 2000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (!regexName.test(e.target.name.value)) {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
    } else {
      document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("name", e.target.name.value);
      let date = String(this.startDate).split(" ");
      let reservationDetails = {
        place: this.state.places.filter(
          (place) => place.name === document.getElementById("placeSelect").value
        )[0]._id,
        dayText: this.daysObj[date[0]],
        dayNumber: date[2],
        month: this.monthsObj[date[1]],
        year: date[3],
        fromTime: e.target.reservationTime.value.split("-")[0].trim(),
        toTime: e.target.reservationTime.value.split("-")[1].trim(),
      };
      formData.set("reservationDetails", JSON.stringify(reservationDetails));
      formData.set("additionalNotes", e.target.additionalNotes.value);
      store.dispatch(createReservation(formData)).then((data) => {
        if (data.success === true) {
          document.getElementById("loader").style.display = "none";
          toast.success(data.message);
          this.setState({ created: true, res: data.reservation });
        } else {
          document.getElementById("loader").style.display = "none";
          toast.error(data.message);
        }
      });
      // await store.dispatch(loginAdmin(formData))
    }
  }
  handleChangePlace(e) {
    this.setState({
      selectedPlace: store
        .getState()
        .place.places.filter((place) => place.name === e.target.value)[0],
    });
  }
  msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
  checkDayHandler(date) {
    // console.log(this.daysObj[date]);

    // console.log(Number(String(new Date()).split(" ")[2]));
    // Date.parse('04 Dec 1995 00:12:00 GMT');
    if (date.length === 3) {
      // console.log(Object.keys(this.daysObj).indexOf(date));
      this.startDate = new Date(
        `${this.monthsObj[String(this.startDate).split(" ")[1]][1]} ${
          Number(String(new Date()).split(" ")[2]) +
          (Object.keys(this.daysObj).indexOf(date) -
            Object.keys(this.daysObj).indexOf(String(new Date()).split(" ")[0]))
        }, ${String(this.startDate).split(" ")[3]} ${
          this.state.selectedPlace.workingDays.filter(
            (day) => day.day === this.daysObj[date]
          )[0].fromTime
        }`
      );
      // console.log(this.startDate);
      // this.startDate = date;
    } else {
      this.startDate = date;
    }
    // console.log(date);
    // const date1 = new Date('December 17, 1995 03:24:00');
    // this.daysObj[String(date).substring(0, 3)] ===
    //       this.state.selectedPlace.workingDays[i].day &&
    //     this.state.selectedPlace.workingDays[i].fromTime !== ""
    // console.log(
    //   new Date(),
    //   Date.parse(new Date()) <= Date.parse(this.startDate),
    //   this.msToTime(new Date().getTime())
    // );
    // console.log(
    //   this.state.selectedPlace.workingDays.filter(
    //     (day) => day.day === this.daysObj[String(this.startDate).split(" ")[0]]
    //   )[0].fromTime
    // );
    for (let i = 0; i < this.state.selectedPlace.workingDays.length; i++) {
      if (
        Date.now() <= Date.parse(this.startDate) &&
        this.state.selectedPlace.workingDays.filter(
          (day) =>
            day.day === this.daysObj[String(this.startDate).split(" ")[0]]
        )[0].fromTime
      ) {
        document
          .getElementsByClassName("react-datepicker__input-container")[0]
          .classList.add("d-flex", "justify-content-around");
        let elm = document.createElement("span");
        elm.textContent = "متوفر";
        elm.style = "color: green;text-align: center;width: 200px;";
        elm.id = "changeStatus";
        if (
          document.getElementsByClassName(
            "react-datepicker__input-container"
          )[0].children[1]
        ) {
          document
            .getElementsByClassName("react-datepicker__input-container")[0]
            .removeChild(
              document.getElementsByClassName(
                "react-datepicker__input-container"
              )[0].children[1]
            );
        }
        document
          .getElementsByClassName("react-datepicker__input-container")[0]
          .appendChild(elm);
        this.btnActivate = false;
        document.getElementById("reservationTime").value =
          this.daysObj[String(date).substring(0, 3)];
        return this.setState({ dateRefresh: true });
        // document.getElementById("resultOfCheck").style.color = "green"
      } else {
        this.btnActivate = true;
        document
          .getElementsByClassName("react-datepicker__input-container")[0]
          .classList.add("d-flex", "justify-content-around");
        let elm = document.createElement("span");
        elm.textContent = "غير متوفر";
        elm.style = "color: red;text-align: center;width: 200px;";
        elm.id = "changeStatus";
        if (
          document.getElementsByClassName(
            "react-datepicker__input-container"
          )[0].children[1]
        ) {
          document
            .getElementsByClassName("react-datepicker__input-container")[0]
            .removeChild(
              document.getElementsByClassName(
                "react-datepicker__input-container"
              )[0].children[1]
            );
        }
        document
          .getElementsByClassName("react-datepicker__input-container")[0]
          .appendChild(elm);
        document.getElementById("reservationTime").value = "";
        return this.setState({ dateRefresh: true });
      }
    }
    // this.btnActivate = true;
    // document
    //   .getElementsByClassName("react-datepicker__input-container")[0]
    //   .classList.add("d-flex", "justify-content-around");
    // let elm = document.createElement("span");
    // elm.textContent = "غير متوفر";
    // elm.style = "color: red;text-align: center;width: 200px;";
    // elm.id = "changeStatus";
    // if (
    //   document.getElementsByClassName("react-datepicker__input-container")[0]
    //     .children[1]
    // ) {
    //   document
    //     .getElementsByClassName("react-datepicker__input-container")[0]
    //     .removeChild(
    //       document.getElementsByClassName(
    //         "react-datepicker__input-container"
    //       )[0].children[1]
    //     );
    // }
    // document
    //   .getElementsByClassName("react-datepicker__input-container")[0]
    //   .appendChild(elm);
    // return this.setState({ dateRefresh: true });
    // document.getElementById("changeStatus").textContent = "غير متوفر"
    // document.getElementById("changeStatus").style = "color: red;text-align: center;width: 200px;"
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"حجز كشف جديد"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        <Fragment>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {this.state.loading === true ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="container-fluid reservation-container">
                <div className="row animate__animated animate__fadeIn animate__slower">
                  {this.state.created ? (
                    <Redirect to={`/me/reservations/${this.state.res._id}`} />
                  ) : (
                    ""
                  )}
                  <div className="col-12 col-lg-6 d-block mx-auto">
                    <div className="login-container input-container">
                      <h1 className="text-center">حجز كشف جديد</h1>
                      <br></br>
                      <form onSubmit={(e) => this.onSubmitHandler(e)}>
                        <div className="form-group">
                          <label
                            for="exampleInputName1"
                            style={{
                              textAlign: "right",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                          >
                            أسم الحاله
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            placeholder="أسم صاحب الحجز"
                            style={{ borderRadius: "25px" }}
                            name="name"
                            defaultValue={
                              this.state.user && this.state.user.name
                            }
                            onChange={(e) =>
                              this.setState((state, props) => {
                                return { name: e.target.value };
                              })
                            }
                            required
                          />
                          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <br></br>
                        <div className="form-group">
                          <label
                            for="placeSelect"
                            style={{
                              textAlign: "right",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                          >
                            المكان
                          </label>
                          <select
                            defaultValue={store.getState().place.places[0].name}
                            id="placeSelect"
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => this.handleChangePlace(e)}
                            required
                          >
                            <option value="def" disabled>
                              اختر المكان
                            </option>
                            {this.state.places.map((place, index) => (
                              <Fragment key={`idx${index}`}>
                                <option value={place.name}>{place.name}</option>
                              </Fragment>
                            ))}
                          </select>
                        </div>
                        <br></br>
                        <div className="form-group">
                          <label
                            for="datePicker"
                            style={{
                              textAlign: "right",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                          >
                            تاريخ الكشف
                          </label>
                          <br></br>
                          <DatePicker
                            className="form-control"
                            style={{ borderRadius: "25px" }}
                            name="datePicker"
                            selected={this.startDate}
                            onChange={(date) => this.checkDayHandler(date)}
                            style={{ width: "75%" }}
                            required
                          />
                        </div>
                        <br></br>
                        <div className="form-group">
                          <label
                            for="reservationTime"
                            style={{
                              textAlign: "right",
                              width: "100%",
                              marginBottom: "20px",
                            }}
                          >
                            الفتره
                          </label>
                          <select
                            id="reservationTime"
                            name="reservationTime"
                            style={{ borderRadius: "25px" }}
                            className="form-select"
                            aria-label="Default select example"
                            required
                            onChange={(e) =>
                              this.checkDayHandler(
                                Object.keys(this.daysObj).find(
                                  (key) => this.daysObj[key] === e.target.value
                                )
                              )
                            }
                          >
                            <option
                              id="noTimes"
                              value="noTimes"
                              style={{ visibility: "hidden" }}
                            >
                              لا توجد مواعيد في هذا اليوم
                            </option>
                            <option selected disabled>
                              اختر معاد الحجز
                            </option>
                            {this.state.selectedPlace &&
                              this.state.selectedPlace.workingDays.map(
                                (day, index) => {
                                  if (day.fromTime) {
                                    return (
                                      <Fragment key={`id${index}`}>
                                        <option value={`${day.day}`}>
                                          {day.fromTime} - {day.toTime} -{" "}
                                          {day.day}
                                        </option>
                                      </Fragment>
                                    );
                                  }
                                }
                              )}
                          </select>
                        </div>
                        <br></br>
                        <div className="form-group">
                          {/* <label for="exampleInputPassword1">Password</label> */}
                          <textarea
                            rows="10"
                            className="form-control"
                            id="exampleInputNotes1"
                            placeholder="ملاحظات"
                            style={{ borderRadius: "25px" }}
                            name="additionalNotes"
                            value={this.state.additionalNotes}
                            onChange={(e) =>
                              this.setState((state, props) => {
                                return { additionalNotes: e.target.value };
                              })
                            }
                          />
                        </div>
                        <br></br>
                        <div className="form-group">
                          <br></br>
                          <h5 style={{ textAlign: "center" }}>
                            سعر الكشف :{" "}
                            {this.state.selectedPlace.reservationPrice} ج.م{" "}
                          </h5>
                        </div>
                        <br></br>
                        {"_id" in store.getState().auth.user ? (
                          <Fragment>
                            <button
                              type="submit"
                              className="btn btn-outline-primary d-block mx-auto"
                              disabled={this.btnActivate}
                              style={{
                                borderRadius: "50px",
                                padding: "10px 30px",
                              }}
                            >
                              تأكيد
                            </button>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <h3 style={{ textAlign: "center" }}>
                              يجب عليك تسجيل دخولك للقيام الحجز
                            </h3>
                            <p className="text-center">
                              سجلت مسبقا؟ <Link to="/login">تسجيل الدخول</Link>
                            </p>
                            <p className="text-center">
                              مستخدم جديد؟{" "}
                              <Link to="/register">تسجيل كمستخدم جديد</Link>
                            </p>
                          </Fragment>
                        )}
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
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      </Fragment>
    );
  }
}
export default CreateReservation;
