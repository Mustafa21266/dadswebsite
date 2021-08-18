import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { editUserDetails } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
class EditProfile extends Component {
  regex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
  constructor(props) {
    super(props);
    this.state = {
      name: store.getState().auth.user.name,
      password: "",
      confirmPassowrd: "",
      edited: false,
      loading: true,
    };
    this.checkPassword = this.checkPassword.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (!regexName.test(e.target.name.value)) {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
    } else {
      if (e.target.password.value !== e.target.confirmPassowrd.value) {
        toast.error("كلمه السر لا تماثل كلمة السر التأكيدية");
      } else {
        const formData = new FormData();
        document.getElementById("loader").style.display = "block";
        formData.set("name", e.target.name.value);
        formData.set("password", e.target.password.value);
        formData.set("confirmPassword", e.target.confirmPassowrd.value);
        store
          .dispatch(editUserDetails(store.getState().auth.user._id, formData))
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
    }
  }
  checkPassword(e) {
    if (this.regex.test(e.target.value)) {
      document.getElementById("passwordWarning").style.display = "none";
      this.setState((state, props) => {
        return { password: e.target.value };
      });
    } else {
      document.getElementById("passwordWarning").style.display = "block";
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`تعديل بيانات حسابي`}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {"_id" in store.getState().auth.user ? (
          <Fragment>
            {this.state.loading === true ? (
              <Loader />
            ) : (
              <Fragment>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="container" style={{ height: "72vh" }}>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    <img
                      id="loginImg"
                      className="img-fluid mx-auto login-img animate__animated animate__pulse animate__infinite animate__slower"
                      src={"../images/heart_login.png"}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: -1,
                      }}
                    ></img>
                    {this.state.edited ? <Redirect to="/me" /> : ""}
                    <div className="col-12 col-lg-6 d-block mx-auto">
                      <div className="login-container">
                        <h1 className="text-center">تعديل بيانات الحساب</h1>
                        <br></br>
                        <form onSubmit={(e) => this.onSubmitHandler(e)}>
                          <div className="form-group">
                            {/* <label for="exampleInputEmail1">Email address</label> */}
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputName1"
                              placeholder="الأسم"
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
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          <br></br>
                          <div className="form-group">
                            {/* <label for="exampleInputEmail1">Email address</label> */}
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="كلمة السر"
                              style={{ borderRadius: "25px" }}
                              name="password"
                              defaultValue={this.state.password}
                              onChange={(e) => this.checkPassword(e)}
                              required
                            />
                            <br></br>
                            <p
                              id="passwordWarning"
                              style={{ textAlign: "right", display: "none" }}
                            >
                              كلمه السر يجب الا تقل عن 6 أحرف/أرقام , و يجب ان
                              تحتوي علي حرف واحد و رقم واحد علي ألاقل
                            </p>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword2"
                              placeholder="تأكيد كلمة السر"
                              style={{ borderRadius: "25px" }}
                              name="confirmPassowrd"
                              value={this.state.confirmPassword}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { confirmPassword: e.target.value };
                                })
                              }
                              required
                            />
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
                            تأكيد
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
export default EditProfile;
