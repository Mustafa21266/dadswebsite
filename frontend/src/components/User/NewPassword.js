import React, { Fragment, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/adminActions";
import { toast } from "material-react-toastify";
import Loader from "../Loader";
import MetaData from "../MetaData";
import intlTelInput from "intl-tel-input";
import store from "../../store";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
class NewPassword extends Component {
  regex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
  phoneInput;
  constructor(props) {
    super(props);
    this.state = {
      phoneNo: "",
      password: "",
      confirmPassowrd: "",
      success: false,
    };
    this.checkPassword = this.checkPassword.bind(this);
  }
  componentDidMount() {}
  async onSubmitHandler(e) {
    e.preventDefault();
    document.getElementById("loader").style.display = "block";
    const formData = new FormData();
    formData.set("password", e.target.password.value);
    formData.set("confirmPassword", e.target.confirmPassowrd.value);
    await store
      .dispatch(resetPassword(this.props.match.params.token, formData))
      .then((data) => {
        if (data.success === true) {
          document.getElementById("loader").style.display = "none";
          toast.success(data.message);
          this.setState((state, props) => {
            return { success: true };
          });
          window.location.reload();
        } else {
          document.getElementById("loader").style.display = "none";
          toast.error(data.message);
        }
      });
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
              src={"../../images/heart_login.png"}
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
            {this.state.success ? <Redirect to="/" /> : ""}
            <div className="col-12 col-lg-6 d-block mx-auto">
              <br></br>
              <br></br>
              <br></br>
              <div className="login-container">
                <h1 className="text-center">تعديل كلمة المرور</h1>
                <br></br>
                <form onSubmit={(e) => this.onSubmitHandler(e)}>
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
                      كلمه السر يجب الا تقل عن 6 أحرف/أرقام , و يجب ان تحتوي علي
                      حرف واحد و رقم واحد علي ألاقل
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
export default withRouter(NewPassword);
