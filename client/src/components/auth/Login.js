import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { TimelineMax, Power1 } from "gsap/all";
//import donde from "../../images/dondeLogo.png";
import Bgv from "../../components/Video/bgv.mp4";
import "../Card/style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineMax({ paused: true });
    this.state = { email: "", password: "", error: "" };
    this.Comments = gsap.timeline({ paused: true });
  }

  async handleFormSubmit(e, email, pass) {
    e.preventDefault();

    try {
      await axios.post("/user/login", { email: email, password: pass });
      await this.props.getLoggedIn();
      this.changePage(e, "/home");
    } catch (err) {
      alert(err.request.response);
    }
  }

  componentDidMount() {
    this.timeline.from(this.login, 1, {
      // display: "none",
      y: -100,
      autoAlpha: 0,
      delay: 0.5,
      ease: Power1.easeIn,
      // paused: false,
    });
    this.timeline.play();
  }
  changePage = (e, destination) => {
    e.preventDefault();
    this.timeline.reverse();
    const timelineDuration = this.timeline.duration() * 1000;
    setTimeout(() => {
      window.location = destination;
    }, timelineDuration);
  };

  render() {
    return (
      <div className="">
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1",
          }}
        >
          <source src={Bgv} type="video/mp4" />
        </video>
        <div className="d-flex justify-content-center h-10">
          <div className="user_card" ref={(login) => (this.login = login)}>
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container" > If you haven't been everywhere add them to your list because there is no best time to plan a trip than now. So Welcome to our TRIP PLANNER!!
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={(e) =>
                this.handleFormSubmit(
                  e,
                  this.state.email,
                  this.state.password
                )
              }>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    required
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="form-control input_user"
                    value={this.state.email}
                    placeholder="Email"
                  />
                </div>
                <div className="input-group mb-4 mt-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    className="form-control input_pass"
                    value={this.state.password}
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlInline"
                    />
                    <label
                      className="custom-control-label"
                      for="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <button
                    type="submit"
                    name="button"
                    className="btn login_btn"
                  >
                    LOGIN
                    </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
                <Link to="/forgot"> Forgot your password?</Link>
              </div>
              <div className="d-flex justify-content-center links">
                {/* eslint-disable-next-line */}
                Don't have an account? <Link to="/signup"> Sign Up?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
