import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import EyeIcon from "../assets/eye-fill";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/login-action";
import errorToast from "../components/error-toast";
import successToast from "../components/sucess-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values, { setSubmitting }) => {
    dispatch(
      loginAction(
        {
          username: values?.username,
          password: values?.password,
        },
        onSuccess,
        onError
      )
    );
    console.log(values);
  };

  const onSuccess = (data) => {
    successToast(data?.response);
    navigate(`/${data?.data?.id}`);
  };
  const onError = (data) => {
    console.log(data);
    errorToast(data?.ui_err_msg);
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: "600px" }}>
        <h1 className="fs_32 fw_600 color_FFFFFF text-center w-100 mb-5 pb-3">
          Venue Admin Login
        </h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={onSubmit}
        >
          {({ values }) => {
            console.log(values);
            return (
              <Form>
                <div>
                  <Field
                    placeholder="username"
                    className="bg_030303 border_FFFFFF w-100 rounded-3 py-2 color_FFFFFF input-field ps-2"
                    type="text"
                    id="username"
                    name="username"
                  />
                </div>
                <div className="mt-4 position-relative">
                  <Field
                    placeholder="password"
                    className="bg_030303 border_FFFFFF w-100 rounded-3 py-2 color_FFFFFF input-field ps-2"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                  />
                  <button
                    type="button"
                    disabled={values?.password?.length > 0 ? false : true}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ zIndex: "999" }}
                    className="position-absolute top-50 end-0 translate-middle border-0 bg-transparent"
                  >
                    <EyeIcon showPassword={showPassword} />
                  </button>
                </div>
                <button
                  className="w-100 rounded-3 py-2 bg_6741D9 border-0 fs_16 fw_600 color_FFFFFF mt-5"
                  type="submit"
                >
                  Sign in
                </button>
                <p className="text-center color_FFFFFF fs_16 fw_400 mt-5 cursor_pointer">
                  New Registration ?
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
