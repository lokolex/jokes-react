import CommentItem from "./CommentItem";
import styles from "./CommentsList.module.css";

const CommentsList = (props) => {
  return (
    <ul className={styles.comments}>
      {props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.text}
          commentId={comment.id}
          deleteComment={props.deleteComment}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
