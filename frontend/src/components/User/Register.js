import React, { Component } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { register, loginAdmin } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import intlTelInput from "intl-tel-input";
import Loader from "../Loader";
class Register extends Component {
  regex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
  phoneInput;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNo: "",
      password: "",
      registered: false,
      loading: true,
    };
    this.checkPassword = this.checkPassword.bind(this);
    this.checkPhoneNo = this.checkPhoneNo.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
    setTimeout(() => {
      let input = document.querySelector("#phone");
      this.phoneInput = intlTelInput(input, {
        initialCountry: "EG",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
      console.log(typeof this.phoneInput);
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (regexName.test(e.target.name.value)) {
      document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("name", e.target.name.value);
      formData.set("phoneNo", this.phoneInput.getNumber());
      formData.set("password", e.target.password.value);
      store.dispatch(register(formData)).then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          document.getElementById("loader").style.display = "none";
          this.setState((state, props) => {
            return { registered: true };
          });
          window.location.reload();
        } else {
          document.getElementById("loader").style.display = "none";
          toast.error(data.message);
        }
      });
      await store.dispatch(loginAdmin(formData));
    } else {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
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
  checkPhoneNo(e) {
    if (typeof this.phoneInput == "object") {
      if (e.target.value.length === 11) {
        document.getElementById("numberWarning").style.display = "none";
        this.setState((state, props) => {
          return { phoneNo: this.phoneInput.getNumber() };
        });
      } else {
        document.getElementById("numberWarning").style.display = "block";
      }
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`تسجيل كمستخدم جديد`}
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
            {"_id" in store.getState().auth.user ? (
              <Redirect to="/"></Redirect>
            ) : (
              <Fragment>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="container" style={{ height: "100vh" }}>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    <img
                      id="loginImg"
                      className="img-fluid mx-auto login-img animate__animated animate__pulse animate__infinite animate__slower  d-flex align-self-center"
                      src={"../images/heart_login.png"}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "700px",
                        zIndex: -1,
                      }}
                    ></img>
                    {this.state.registered ? <Redirect to="/" /> : ""}
                    <div className="col-12 col-lg-6 d-block mx-auto">
                      <br></br>
                      <br></br>
                      <br></br>
                      <div className="login-container">
                        <h1 className="text-center">تسجيل كمستخدم جديد</h1>
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
                              type="number"
                              id="phone"
                              className="form-control"
                              placeholder="رقم الموبايل"
                              type="tel"
                              name="phone"
                              style={{ borderRadius: "25px" }}
                              name="phoneNo"
                              defaultValue={this.state.phoneNo}
                              onChange={(e) => this.checkPhoneNo(e)}
                              required
                            />
                            <br></br>
                            <p
                              id="numberWarning"
                              style={{ textAlign: "right", display: "none" }}
                            >
                              رقم التليفون لابد ان يكون مكون من 11 رقم
                            </p>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          <br></br>
                          <div className="form-group">
                            {/* <label for="exampleInputPassword1">Password</label> */}
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
                        <br></br>
                        <p className="text-center">
                          سجلت مسبقا؟ <Link to="/login">تسجيل الدخول</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
export default Register;
