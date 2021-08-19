import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store from '../store';
import { logoutAdmin } from '../actions/adminActions';
import {getUserDetails, getAllPlaces} from '../actions/adminActions';
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      redirect: false,
      places: []
    }
    
  }
  componentDidMount(){
    let id = setInterval(()=>{
      this.setState({places: store.getState().place.places, user: store.getState().auth.user})
      // this.forceUpdate()
    },1000)
  }
  checkUser(){
      let user = store.getState().auth.user
  }
  async logOutHandler(){
    await logoutAdmin(store.dispatch)
    this.setState({redirect : true})
    window.location.reload();
  }
  changeNav(e){
    Array.from(document.getElementsByClassName("nav-link")).forEach(link => link.style.fontWeight = 400)
    document.getElementById("placesNav").style.fontWeight = 400
    e.target.style.fontWeight = 900
  }
  resetNav(e){
    Array.from(document.getElementsByClassName("nav-link")).forEach(link => link.style.fontWeight = 400)
    document.getElementById("placesNav").style.fontWeight = 400
  }
    render(){
        return(
            <Fragment>
              {this.state.redirect ? <Redirect to="/"></Redirect>: ""}
<nav dir="rtl" className="navbar navbar-expand-lg w-100 nav-style animate__animated animate__slideInDown animate__slower" style={{position: 'fixed',top: 0,zIndex: 5}}>
  <div className="container-fluid">
    <Link className="navbar-brand" onClick={this.resetNav} to="/"><img src="https://res.cloudinary.com/dvlnovdyu/image/upload/v1629335175/Capture_b1uf1r.png" style={{width: "200px", height: "70px"}}></img></Link>
    <button style={{color:"white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" onClick={this.changeNav} aria-current="page" to="/" style={{color: 'white',textAlign: 'center',fontWeight: 900}}>الرئيسية</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/articles/all"  onClick={this.changeNav} style={{color: 'white',textAlign: 'center'}}>مقالات</Link>
        </li>




        <li className="nav-item">
        <div className="btn-group d-block mx-auto" style={{textAlign: 'center'}}>
  <a type="button" id="placesNav"  onClick={this.changeNav}  className="dropdown-toggle" style={{color: 'white',position: 'relative',top: '8px',textDecoration: 'none'}}  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    الأماكن
  </a>
 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
     <Fragment>
     {this.state.places && this.state.places.map(place => (
          <Fragment key={place._id}>
              <Link className="dropdown-item text-center" to={`/places/${place._id}`}>{place.name}</Link>
          </Fragment>
        ))}
        </Fragment>
        </div>
</div>

</li>

{/* 
        <li className="nav-item">
          <Link className="nav-link" to="#" style={{color: 'white'}}>تواصل معنا</Link>
        </li> */}
      </ul>
        <div className="btn-group me-auto" style={{float: 'left'}}>
  <a type="button" style={{padding: '20px',color: 'white'}}  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  {'_id' in store.getState().auth.user ? (
    <Fragment>
      {store.getState().auth.user.avatar ? (
        <Fragment>
          <img src={store.getState().auth.user.avatar.url} alt="user avatar" style={{width: '40px',height: '40px',borderRadius: '50%'}}/>
        </Fragment>
      ): (
        <Fragment>
        <i className="fas fa-user-circle" style={{fontSize: '28px'}}></i>
    </Fragment>
      )}
      
    </Fragment>
    
  ):(
    <Fragment>
        <i className="fas fa-user-circle" style={{fontSize: '26px'}}></i>
    </Fragment>
    
  )}

  </a>
 <div className="dropdown-menu" style={{position: 'absolute',right: '-120px',top: '40px'}} aria-labelledby="navbarDropdown">
   {'_id' in store.getState().auth.user ? (
     <Fragment>
       {store.getState().auth.user.role === 'admin' && (
         <Fragment>








<Link className="dropdown-item text-center" to="/admin/dashboard">لوحه التحكم</Link>
<div className="dropdown-divider"></div>
<Link className="dropdown-item text-center" to="/admin/article/create">إنشاء مقاله جديده</Link>
<div className="dropdown-divider"></div>
         </Fragment>
       )}
 <Link className="dropdown-item text-center" to="/reservations/create">احجز الأن</Link>
 <div className="dropdown-divider"></div>
<Link className="dropdown-item text-center" to="/me">حسابي الشخصي</Link>
       <div className="dropdown-divider"></div>
       <button className="dropdown-item text-danger text-center" onClick={this.logOutHandler.bind(this)}>تسجيل الخروج</button>
</Fragment>
   ) : (
     <Fragment>
       <Link className="dropdown-item text-center" to="/login">تسجيل الدخول</Link>
       
             {/* <Link className="dropdown-item" to="/me">My Profile</Link> */}
             <div className="dropdown-divider"></div>
             <Link className="dropdown-item text-center" to="/register">إنشاء حساب</Link>
             {/* <Link className="dropdown-item text-center" href="#">Something else here</Link> */}
     </Fragment>

   )}
          
        </div>
</div>

      {/* <div className="dropdown">
        <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div> */}
       
        {/* {user && (
      <div className="ml-4 dropdown d-inline"> 
      <Link to="#!" className="btn dropdown-toggle text-white" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <figure className="avatar avatar-nav">
          <img src={user.avatar && user.avatar.url} alt={user && `${user.name} Avatar`} className="rounded-circle"></img>
        </figure>
        <span >{user && user.name}</span>
      </Link>
      <div className="dropdown-menu"  style={{position: 'absolute',right: 0,top: 35,padding: '15px 0px'}} aria-labelledby="dropDownMenuButton">
        {user && user.role === 'admin' && (
          <div>
          <Link to="/dashboard" className="dropdown-item text-center">Dashboard</Link>
          <hr />
          </div>
          
        )}
      <Link to="/orders/me" className="dropdown-item text-center">Orders</Link>
      <hr />
      <Link to="/me" className="dropdown-item text-center">Profile</Link>
      <hr />
      <Link to="/" className="dropdown-item text-danger text-center" onClick={logOutHandler}>Logout</Link>
        </div> 
</div> 
        )} */}
    </div>
  </div>
</nav>
            </Fragment>
        )
    }
}



export default Navbar;
