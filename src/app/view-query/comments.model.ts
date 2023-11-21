/**
 * Model class representing a comment in the application.
 * It includes properties for the comment text, the user who posted the comment, and the associated query ID.
 */
export class CommentsModel {
  /**
   * The text content of the comment.
   */
  commentText: string = "";

  /**
   * The username of the user who posted the comment.
   */
  user: string = "";

  /**
   * The unique identifier for the query associated with the comment.
   */
  queryId: number = 0;
}

