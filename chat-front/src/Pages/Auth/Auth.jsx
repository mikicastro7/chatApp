/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useContext } from "react";
import styles from "./Auth.module.css";
import AuthContext from "../../Contexts/AuthContext";
import useForm from "../../hooks/useForm";

const Auth = function () {
  const { loginUser, loginError, registerUser } = useContext(AuthContext);
  const { formData, modifieData } = useForm({
    userName: "",
    password: "",
    repeatPassword: ""
  });

  const [authType, setAuthType] = useState(0);

  const setRegister = () => {
    setAuthType(1);
  };

  const setLogin = () => {
    setAuthType(0);
  };

  const submitForm = (e) => {
    if (authType === 0) {
      loginUser(e, formData);
    } else {
      registerUser(e, formData);
    }
  };

  return (
    <section>
      <div className={styles.centerForm}>
        <div className={styles.topBar}>
          <div onClick={setLogin} className={styles.topBarContainer}>
            <p className={`${styles.login} ${authType === 0 && styles.active}`}>Login</p>
          </div>
          <div onClick={setRegister} className={styles.topBarContainer}>
            <p className={`${styles.register} ${authType === 1 && styles.active}`}>Register</p>
          </div>
        </div>
        <div className={styles.bodyForm}>
          <h3 className={styles.formTitle}>Welcome {authType === 0 ? "Login" : "Register"}</h3>
          <form onSubmit={(e) => submitForm(e)}>
            <label htmlFor="user" className={styles.formLabel}>User</label>
            <input
              name="userName"
              id="user"
              value={formData.userName}
              onChange={modifieData}
              placeholder="Username"
              className={styles.formInput}
              type="text"
              autoComplete="on"
            />
            <label htmlFor="password" style={{ marginTop: "20px" }} className={styles.formLabel}>Password</label>
            <input
              name="password"
              id="password"
              value={formData.password}
              onChange={modifieData}
              placeholder="Password"
              className={styles.formInput}
              type="password"
              autoComplete="on"
            />
            {authType === 1
              && (
                <>
                  <label htmlFor="repeatPassword" style={{ marginTop: "20px" }} className={styles.formLabel}>Repeat password</label>
                  <input
                    name="repeatPassword"
                    id="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={modifieData}
                    placeholder="repeat password"
                    className={styles.formInput}
                    type="password"
                    autoComplete="off"
                  />
                </>
              )}
            {loginError.error && <p className={styles.error}>{loginError.message}</p>}
            <button type="submit" className={styles.formButton}>{authType === 0 ? "Login" : "Register"}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Auth;
