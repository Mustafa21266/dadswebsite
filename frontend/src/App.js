// import logo from './logo.svg';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link
} from "react-router-dom";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Register from "./components/User/Register";
import history from "./history";
import EditProfile from "./components/User/EditProfile";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';
import CreateArticle from "./components/Admin/CreateArticle";
import EditArticle from "./components/Admin/EditArticle";
import AllArticles from "./components/Article/AllArticles";
import Article from "./components/Article/Article";
import { getUserDetails, getAllPlaces } from "./actions/adminActions";
import store from "./store";
import CreatePlace from "./components/Admin/CreatePlace";
import { Fragment } from "react";
import Place from "./components/Place/Place";
import EditPlace from "./components/Admin/EditPlace";
import CreateReservation from "./components/Reservation/CreateReservation";
import Dashboard from "./components/Admin/Dashboard";
import { getAllArticles } from "./actions/articleActions";
import EditUser from "./components/Admin/EditUser";
import EditReservation from "./components/Admin/EditReservation";
import ReservationDetails from "./components/Reservation/ReservationDetails";
import Loader from "./components/Loader";
import ForgotPassword from "./components/User/ForgotPassword";
import NewPassword from "./components/User/NewPassword";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      places: [],
      refresh: false,
    };
    store
      .dispatch(getAllPlaces())
      .then((data) => {
        return data;
      })
      .then(async (data) => {
        await store
          .dispatch(getAllArticles())
          .then((data) => {
            return data;
          })
          .then((data) => {
            store.dispatch(getUserDetails()).then((data) => {
              if (data.success) {
                this.setState({ refresh: true, loading: false });
              } else {
                this.setState({ loading: false });
              }
            });
          });
      });
  }
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Router history={history}>
            <Navbar history={history} places={this.state.places} />
            <Route path="/" exact>
              <Homepage />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/me/update" exact>
              <EditProfile />
            </Route>
            <Route path="/me" exact>
              <Profile />
            </Route>
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route
              path="/password/reset/:token"
              component={NewPassword}
              exact
            />
            <Route path="/admin/article/create" exact>
              <CreateArticle />
            </Route>
            <Route path="/admin/article/edit/:id" exact>
              <EditArticle />
            </Route>
            <Route path="/admin/places/create" exact>
              <CreatePlace />
            </Route>
            <Route path="/admin/places/update/:id" exact>
              <EditPlace />
            </Route>
            <Route path="/admin/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/admin/user/update/:id" exact>
              <EditUser />
            </Route>
            <Route path="/admin/reservation/update/:id" exact>
              <EditReservation />
            </Route>
            <Route path="/articles/all" exact>
              <AllArticles />
            </Route>
            <Route path="/article/:id" exact>
              <Article />
            </Route>
            <Route path="/places/:id" exact>
              <Place />
            </Route>
            <Route path="/reservations/create" exact>
              <CreateReservation />
            </Route>
            <Route path="/me/reservations/:id" exact>
              <ReservationDetails />
            </Route>
            <ToastContainer />
            <Footer />
          </Router>
        )}
      </Fragment>
    );
  }
}

export default App;
