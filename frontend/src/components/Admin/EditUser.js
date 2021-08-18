import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  editUserDetailsAdmin,
  deleteUserAdmin,
} from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader";
import intlTelInput from "intl-tel-input";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .name,
      role: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .role,
      phoneNo: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .phoneNo,
      edited: false,
      loading: true,
      disableBtn: false,
    };
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
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
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (!regexName.test(this.state.name)) {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
    } else {
      document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("name", this.state.name);
      formData.set("role", this.state.role);
      formData.set("phoneNo", this.phoneInput.getNumber());
      store
        .dispatch(editUserDetailsAdmin(this.props.match.params.id, formData))
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
  async handleDeleteUser(e) {
    store.dispatch(deleteUserAdmin(this.props.match.params.id)).then((data) => {
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
  checkPhoneNo(e) {
    if (typeof this.phoneInput == "object") {
      if (e.target.value.length === 11) {
        document.getElementById("numberWarning").style.display = "none";
        this.setState((state, props) => {
          return { phoneNo: this.phoneInput.getNumber(), disableBtn: false };
        });
      } else {
        this.setState((state, props) => {
          return { disableBtn: true };
        });
        document.getElementById("numberWarning").style.display = "block";
      }
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"تعديل بيانات مستخدم"}
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
                <div className="container" style={{ height: "100vh" }}>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    <img
                      id="loginImg"
                      className="img-fluid mx-auto login-img animate__animated animate__zoomIn animate__slower  d-flex align-self-center"
                      alt="editprofile.png"
                      src={"../../../images/editprofile.png"}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: -1,
                        opacity: "0.3",
                      }}
                    ></img>
                    {this.state.edited ? (
                      <Redirect to="/admin/dashboard" />
                    ) : (
                      ""
                    )}
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
                            <select
                              defaultValue={this.state.role}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { role: e.target.value };
                                })
                              }
                              id="placeSelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="role"
                              required
                            >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                              <option value="moderator">moderator</option>
                            </select>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          <br></br>
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
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            disabled={this.state.disableBtn}
                          >
                            تأكيد
                          </button>
                          <br></br>
                          <button
                            type="button"
                            className="btn btn-outline-danger d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={this.handleDeleteUser}
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
export default withRouter(EditUser);
