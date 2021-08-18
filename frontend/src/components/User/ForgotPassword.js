import React, { Fragment, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../actions/adminActions";
import { toast } from "material-react-toastify";
import Loader from "../Loader";
import MetaData from "../MetaData";
import intlTelInput from "intl-tel-input";
import store from "../../store";
import { Link, Redirect } from "react-router-dom";
class ForgotPassword extends Component {
  phoneInput;
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: "",
      password: "",
      success: false,
    };
    this.checkPhoneNo = this.checkPhoneNo.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      let input = document.querySelector("#phone");
      this.phoneInput = intlTelInput(input, {
        initialCountry: "EG",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    const formData = new FormData();
    formData.set("phoneNo", this.phoneInput.getNumber());
    await store.dispatch(forgotPassword(formData)).then((data) => {
      if (data.success === true) {
        document.getElementById("loader").style.display = "none";
        toast.success(data.message);
        this.setState((state, props) => {
          return { success: true };
        });
      } else {
        document.getElementById("loader").style.display = "none";
        toast.error(data.message);
      }
    });
  }
  checkPhoneNo(e) {
    if (e.target.value.length === 11) {
      document.getElementById("numberWarning").style.display = "none";
      this.setState((state, props) => {
        return { phoneNo: this.phoneInput.getNumber() };
      });
    } else {
      document.getElementById("numberWarning").style.display = "block";
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`نسيت كلمة السر`}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
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
            {this.state.success ? <Redirect to="/login" /> : ""}
            <div className="col-12 col-lg-6 d-block mx-auto">
              <br></br>
              <br></br>
              <br></br>
              <div className="login-container">
                <h1 className="text-center">نسيت كلمة المرور</h1>
                <br></br>
                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                  <div className="form-group">
                    {/* <label for="exampleInputEmail1">Email address</label> */}
                    <input
                      id="phone"
                      className="form-control"
                      placeholder="رقم الموبايل"
                      type="tel"
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
                  <button
                    type="submit"
                    className="btn btn-outline-primary d-block mx-auto"
                    style={{ borderRadius: "50px", padding: "10px 30px" }}
                  >
                    تأكيد
                  </button>
                  <br></br>
                  <div id="loader" style={{ display: "none" }}>
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </form>
                <br></br>
                <p className="text-center">
                  مستخدم جديد؟ <Link to="/register">تسجيل كمستخدم جديد</Link>
                </p>
                <p className="text-center">
                  <Link to="/password/forgot">نسيت كلمه السر؟</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ForgotPassword;
