import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { deleteComment, getComments } from "../../utils/firebase-api";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import Loader from "../UI/Loader";
import styles from "./Comments.module.css";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isDeleteProcess, setIsDeleteProcess] = useState(false);

  const params = useParams();

  const { jokeId } = params;

  const { sendHttpRequest, status, data: loadedComments } = useHttp(getComments);
  // const { sendHttpRequest: sendHttpRequestDelete } = useHttp(deleteComment);

  useEffect(() => {
    setIsDeleteProcess(false);
    sendHttpRequest(jokeId);
  }, [jokeId, sendHttpRequest, isAddingComment, isDeleteProcess]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentAddedHandler = useCallback(() => {
    sendHttpRequest(jokeId);
    setIsAddingComment(false);
  }, [jokeId, sendHttpRequest, setIsAddingComment]);

  const commentDeletedHandler = useCallback(
    (commentId) => {
      deleteComment(jokeId, commentId).then(() => setIsDeleteProcess(true));
    },
    [jokeId]
  );

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} deleteComment={commentDeletedHandler} />;
  }

  if (status === "completed" && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className="centered">У этой шутки пока нет комментариев.</p>;
  }

  return (
    <section className={styles.comments}>
      <h2>Комментарии</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Добавить комментарий
        </button>
      )}
      {isAddingComment && <NewCommentForm jokeId={jokeId} onCommentAdded={commentAddedHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
