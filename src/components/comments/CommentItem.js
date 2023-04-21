import styles from "./CommentItem.module.css";

const CommentItem = (props) => {
  const deleteCommentHandler = () => {
    props.deleteComment(props.commentId);
  };

  return (
    <li className={styles.item}>
      <p>
        {props.text}{" "}
        <span onClick={deleteCommentHandler} className={styles.icon}>
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
            <g id="Menu / Close_SM">
              <path
                id="Vector"
                d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                stroke="#5d5245"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </span>
      </p>
    </li>
  );
};

export default CommentItem;
