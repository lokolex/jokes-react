import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../utils/firebase-api";
import Loader from "../UI/Loader";
import styles from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const { sendHttpRequest, status, error } = useHttp(addComment);

  const { onCommentAdded } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onCommentAdded();
    }
  }, [status, error, onCommentAdded]);

  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={Yup.object({
        text: Yup.string().max(300, "Не более 300 символов!").required("Обязательное поле!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        sendHttpRequest({ commentData: { ...values }, jokeId: props.jokeId });
        setSubmitting(false);
      }}
    >
      <Form>
        {status === "pending" ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <>
            <div className={styles.control}>
              <label htmlFor="text">Ваш комментарий</label>
              <Field as="textarea" rows="5" name="text" />
              <ErrorMessage component="div" className={styles.error} name="text" />
            </div>

            <div className={styles.actions}>
              <button type="submit" className="btn">
                Добавить комментарий
              </button>
            </div>
          </>
        )}
      </Form>
    </Formik>
  );
};

export default NewCommentForm;
