import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import successToast from "../components/sucess-toast";
import errorToast from "../components/error-toast";
import { dashAction } from "../redux/actions/dashboard-action";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Dashbooard = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    dispatch(dashAction(params?.id, onSuccess, onError));
  }, []);

  const onSuccess = (data) => {
    console.log(data);
    setData(data?.data);
    successToast(data?.response);
  };
  const onError = (data) => {
    errorToast(data?.ui_err_msg);
  };

  const onSubmit = (values, { setSubmitting }) => {
    dispatch();
    console.log(values);
  };

  const onSubmitSuccess = (data) => {
    successToast(data?.response);
  };
  const onSubmitError = (data) => {
    errorToast(data?.ui_err_msg);
  };
  console.log(data);
  return (
    <div>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ width: "600px" }}>
          <h1 className="fs_32 fw_600 color_FFFFFF text-center w-100 mb-3 pb-3">
            {data?.name}, {data?.location} on Dhun Jam
          </h1>

          <Formik
            initialValues={{
              charge: data?.charge_customers ? "yes" : "no",
              amount: data?.amount?.category_6,
            }}
            validationSchema={Yup.object({
              charge: Yup?.string().required("Required"),
              amount: Yup.number()
              .typeError("Custom song request amount must be a number")
              .test(
                'is-custom-amount',
                'Invalid custom amount',
                function(value) {
                  const chargeValue = this.parent.charge;
          
                  if (chargeValue === 'yes') {
                    return value !== undefined && value >= 99;
                  }
          
                  return true;
                }
              )
              .required('Custom song request amount is required!')
              .min(99, 'Minimum Custom song request amount is 99'),
            })}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ values, errors }) => {
              console.log(values);
              return (
                <Form>
                  <div
                    style={{ height: "2rem" }}
                    className="text-danger text-center mb-3"
                  >
                    <ErrorMessage name="amount" />
                  </div>
                  <div className="row gx-0 align-items-center">
                    <div className="col-6">
                      <p className="color_FFFFFF m-0 p-0">
                        Do you want to charge your customers for requesting
                        songs?
                      </p>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-center">
                        <div className="color_FFFFFF d-flex align-items-center gap-4">
                          <label className="color_FFFFFF d-flex align-items-center gap-2">
                            <Field type="radio" name="charge" value="yes" />
                            Yes
                          </label>
                          <label className="color_FFFFFF d-flex align-items-center gap-2">
                            <Field type="radio" name="charge" value="no" />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row gx-0 align-items-center mt-5">
                    <div className="col-6">
                      <p className="color_FFFFFF m-0 p-0">
                        Custom song request amount
                      </p>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-center">
                        <Field
                          disabled={values?.charge === "yes" ? false : true}
                          className={`${
                            values?.charge === "no" ? "bg-grey" : "bg_030303"
                          }  border_FFFFFF w-100 rounded-3 py-2 color_FFFFFF input-field ps-2 text-center`}
                          type="text"
                          id="amount"
                          name="amount"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={
                      values?.amount > 99 && values?.charge === "yes"
                        ? false
                        : true
                    }
                    className={`w-100 rounded-3 py-2  border-0 fs_16 fw_600 color_FFFFFF mt-5 ${
                      values?.amount > 99 && values?.charge === "yes"
                        ? "bg_6741D9"
                        : "bg-grey"
                    }`}
                    type="submit"
                  >
                    Save
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Dashbooard;
