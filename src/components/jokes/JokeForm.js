import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Prompt } from "react-router-dom";
import { useState } from "react";
import Card from "../UI/Card";
import Loader from "../UI/Loader";
import styles from "./JokeForm.module.css";

const JokeForm = (props) => {
  const [isFormFocused, setIsFormFocused] = useState(false);

  const formFocusHandler = () => {
    setIsFormFocused(true);
  };

  const sendDataHandler = () => {
    setIsFormFocused(false);
  };

  return (
    <>
      <Prompt
        when={isFormFocused}
        message={(location) =>
          "Вы уверены что хотите покинуть страницу? Все данные, введенные в форму, будут утеряны!"
        }
      />
      <Card>
        <Formik
          initialValues={{ topic: "", text: "" }}
          validationSchema={Yup.object({
            topic: Yup.string().max(50, "Не более 50 символов!").required("Обязательное поле!"),
            text: Yup.string().max(300, "Не более 300 символов!").required("Обязательное поле!"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            props.onAddJoke(values);
            setSubmitting(false);
            sendDataHandler();
          }}
        >
          <Form onFocus={formFocusHandler}>
            {props.isLoading && (
              <div className={styles.loading}>
                <Loader />
              </div>
            )}
            <div className={styles.control}>
              <label htmlFor="topic">Тематика</label>
              <Field name="topic" type="text" />
              <ErrorMessage component="div" className={styles.error} name="topic" />
            </div>
            <div className={styles.control}>
              <label htmlFor="text">Текст</label>
              <Field as="textarea" rows="5" name="text" />
              <ErrorMessage component="div" className={styles.error} name="text" />
            </div>

            <div className={styles.actions}>
              <button type="submit" className="btn">
                Добавить шутку
              </button>
            </div>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default JokeForm;
