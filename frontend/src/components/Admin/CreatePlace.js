import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { createPlace } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
class CreatePlace extends Component {
  formData = new FormData();

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      address: "",
      password: "",
      startingWorkingHour: "",
      endingWorkingHour: "",
      clinicNumberOne: "",
      clinicNumberTwo: "",
      placeCreated: false,
      reservationPrice: "",
      schedule: [
        {
          day: "السبت",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الأحد",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الأثنين",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الثلاثاء",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الأربعاء",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الخميس",
          fromTime: "",
          toTime: "",
        },
        {
          day: "الجمعه",
          fromTime: "",
          toTime: "",
        },
      ],
      refreshTable: false,
      loading: true,
    };
    this.addDayHandler = this.addDayHandler.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    this.formData.set("name", e.target.name.value);
    this.formData.set("description", e.target.description.value);
    this.formData.set("address", e.target.address.value);
    this.formData.set("user", store.getState().auth.user._id);
    // this.formData.set('startingWorkingHour', e.target.startingWorkingHour.value);
    // this.formData.set('endingWorkingHour', e.target.endingWorkingHour.value);
    this.formData.set("clinicNumberOne", e.target.clinicNumberOne.value);
    this.formData.set("clinicNumberTwo", e.target.clinicNumberTwo.value);
    this.formData.set("reservationPrice", e.target.reservationPrice.value);
    this.formData.set("workingDays", JSON.stringify(this.state.schedule));
    await store.dispatch(createPlace(this.formData)).then((data) => {
      if (data.success === true) {
        document.getElementById("loader").style.display = "none";
        toast.success(data.message);
        this.setState((state, props) => {
          return { placeCreated: true };
        });
      } else {
        document.getElementById("loader").style.display = "none";
        toast.error(data.message);
      }
    });
  }
  async changePlaceLogoHandler(e) {
    this.formData.set("placeLogo", e.target.files[0]);
  }
  async changePlaceCoverHandler(e) {
    this.formData.set("placeCover", e.target.files[0]);
  }
  async addPlaceImages(e) {
    document.getElementById("placeImagesPreview").innerHTML = "";
    // this.formData.set('placeImages',[])
    this.formData.set(`placeImagesLength`, e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      this.formData.set(`placeImages${i}`, e.target.files[i]);
      let newPlaceImg = document.createElement("img");
      newPlaceImg.src = URL.createObjectURL(e.target.files[i]);
      newPlaceImg.style.height = "50px";
      newPlaceImg.style.width = "100px";
      newPlaceImg.style.margin = "10px";
      document.getElementById("placeImagesPreview").appendChild(newPlaceImg);
    }
  }
  addDayHandler(e) {
    this.setState({
      schedule: this.state.schedule.map((day) => {
        if (day.day === document.getElementById("daySelect").value) {
          day.fromTime = this.convertTime(
            document.getElementById("fromTime").value
          );
          day.toTime = this.convertTime(
            document.getElementById("toTime").value
          );
          return day;
        }
        return day;
      }),
    });
  }
  convertTime(date) {
    let timeString = date;
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 || H === 24 ? "AM" : "PM";
    if (h < 10) {
      timeString = "0" + h + timeString.substr(2, 3) + " " + ampm;
    } else {
      timeString = h + timeString.substr(2, 3) + " " + ampm;
    }
    return timeString;
  }
  render() {
    return (
      <Fragment>
        {store.getState().auth.user ? (
          <Fragment>
            <MetaData
              title={"إنشاء مكان جديدة"}
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
                <div className="container">
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    <img
                      id="loginImg"
                      className="img-fluid mx-auto login-img animate__animated animate__zoomIn animate__slower  d-flex align-self-center"
                      src={"../../../images/addplace.png"}
                      alt="addplace.png"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: -1,
                        opacity: "0.3",
                      }}
                    ></img>
                    {this.state.placeCreated ? <Redirect to="/" /> : ""}
                    <div className="col-12 col-lg-6 d-block mx-auto">
                      <div className="login-container">
                        <h1 className="text-center">إضافه مكان جديد</h1>
                        <br></br>
                        <form onSubmit={(e) => this.onSubmitHandler(e)}>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="أسم المكان"
                              style={{ borderRadius: "25px" }}
                              name="name"
                              value={this.state.name}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { name: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <textarea
                              rows="10"
                              type="text"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="وصف المكان"
                              style={{ borderRadius: "25px" }}
                              name="description"
                              value={this.state.description}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { description: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="عنوان المكان"
                              style={{ borderRadius: "25px" }}
                              name="address"
                              value={this.state.address}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { address: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <div className="input-group">
                              <label
                                className="mb-3 w-100"
                                style={{ textAlign: "right" }}
                                htmlFor="placeLogo"
                              >
                                لوجو بروفايل المكان
                              </label>
                              <input
                                className="form-control"
                                style={{ borderRadius: "25px" }}
                                onChange={(e) => this.changePlaceLogoHandler(e)}
                                type="file"
                                id="placeLogo"
                                name="placeLogo"
                                accept="image/*"
                                required
                              />
                            </div>
                          </div>

                          <br></br>
                          <div className="form-group">
                            <div className="input-group">
                              <label
                                className="mb-3 w-100"
                                style={{ textAlign: "right" }}
                                htmlFor="placeCover"
                              >
                                غلاف بروفايل المكان
                              </label>
                              <input
                                className="form-control"
                                style={{ borderRadius: "25px" }}
                                onChange={(e) =>
                                  this.changePlaceCoverHandler(e)
                                }
                                type="file"
                                id="placeCover"
                                name="placeCover"
                                accept="image/*"
                                required
                              />
                            </div>
                          </div>
                          <br></br>
                          <h3 style={{ textAlign: "center" }}>المواعيد</h3>
                          <br></br>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-7 col-lg-9">
                                <select
                                  id="daySelect"
                                  className="form-select"
                                  aria-label="Default select example"
                                  required
                                >
                                  <option selected disabled>
                                    اختر اليوم
                                  </option>
                                  <option value="السبت">السبت</option>
                                  <option value="الأحد">الأحد</option>
                                  <option value="الأثنين">الأثنين</option>
                                  <option value="الثلاثاء">الثلاثاء</option>
                                  <option value="الأربعاء">الأربعاء</option>
                                  <option value="الخميس">الخميس</option>
                                  <option value="الجمعه">الجمعه</option>
                                </select>
                                <br></br>
                                <input
                                  type="time"
                                  className="form-control"
                                  id="fromTime"
                                  name="fromTime"
                                  style={{ borderRadius: "25px" }}
                                  required
                                />
                                <br></br>
                                <input
                                  type="time"
                                  className="form-control"
                                  id="toTime"
                                  name="toTime"
                                  style={{ borderRadius: "25px" }}
                                  required
                                />
                              </div>
                              <div className="col-5 col-lg-3">
                                <button
                                  type="button"
                                  className="btn btn-primary d-block mx-auto"
                                  onClick={this.addDayHandler}
                                >
                                  أضف اليوم
                                </button>
                              </div>
                            </div>
                            <br></br>
                            <div id="schedule" className="w-100">
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
                                  {this.state.schedule.map((day) => (
                                    <Fragment>
                                      <tr>
                                        <th scope="row">{day.day}</th>
                                        <td>
                                          {day.fromTime
                                            ? day.fromTime
                                            : "لا يوجد"}
                                        </td>
                                        <td>
                                          {day.toTime ? day.toTime : "لا يوجد"}
                                        </td>
                                      </tr>
                                    </Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="رقم التليفون الأول"
                              style={{ borderRadius: "25px" }}
                              name="clinicNumberOne"
                              value={this.state.clinicNumberOne}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { clinicNumberOne: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="رقم التليفون الثاني"
                              style={{ borderRadius: "25px" }}
                              name="clinicNumberTwo"
                              value={this.state.clinicNumberTwo}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { clinicNumberTwo: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              id="exampleInputPhoneNo1"
                              placeholder="سعر الكشف"
                              style={{ borderRadius: "25px" }}
                              name="reservationPrice"
                              value={this.state.reservationPrice}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { reservationPrice: e.target.value };
                                })
                              }
                              required
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <div className="input-group">
                              <label
                                className="mb-3 w-100"
                                style={{ textAlign: "right" }}
                                htmlFor="placeImages"
                              >
                                صور المكان
                              </label>
                              <input
                                id="placeImages"
                                className="form-control"
                                style={{ borderRadius: "25px" }}
                                onChange={(e) => this.addPlaceImages(e)}
                                type="file"
                                accept="image/*"
                                multiple
                                required
                              />
                            </div>
                            <br></br>
                            <div
                              id="placeImagesPreview"
                              style={{ display: "block", width: "100%" }}
                            ></div>
                          </div>
                          <br></br>
                          <button
                            type="submit"
                            className="btn btn-outline-primary d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                          >
                            إنشاء
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
                  </div>
                </div>
              </Fragment>
            )}

            <br></br>
          </Fragment>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Fragment>
    );
  }
}

export default CreatePlace;
