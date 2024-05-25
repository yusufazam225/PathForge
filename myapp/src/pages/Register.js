import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../login.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");

  const generateRandomNumber = () => {
    const min = 1000; // Minimum 6-digit number
    const max = 9999; // Maximum 6-digit number
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return newRandomNumber;
  };
  const ClickFunction = async (e) => {
    e.preventDefault();
    const randomNumber = generateRandomNumber();

    if (!email) {
      alert("error");
    } else {
      await axios
        .post(`${process.env.REACT_APP_PORT}/api/users/smtp`, {
          email: email,
          otp: randomNumber,
        })
        .then((response) => {
          console.log(`${response.data.email}`);
          navigate("/OTP", { state: { OTP: randomNumber, EMAIL: email } });
        })
        .catch((error) => {
          alert("Wrong Email");
          console.log(`error in smtp:${error}`);
        });
    }
  };
  return (
    <React.Fragment>
      <div className="checking">
        <section>
          {" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
          <span></span> <span></span> <span></span> <span></span> <span></span>
          <div class="signin">
            <div class="content">
              <h2>Sign Up</h2>

              <div class="form">
                <div class="inputBox">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />{" "}
                  <i>Email</i>
                </div>

                <div class="links">
                  {" "}
                  <a>Already have an Account?</a> <a href="/login">Signin</a>
                </div>

                <div class="inputBox">
                  <input type="submit" value="Next" onClick={ClickFunction} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
export default Register;
