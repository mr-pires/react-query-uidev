import { Link } from "react-router-dom";
import { GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';

export const IssueItem = ({ key, title, number, assignee, commentCount, createdBy, createdDate, labels, status }) => {
  return (
    <li key={key}>
      <div>
        {status === 'done' || status === 'canceled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueClosed style={{ color: 'green' }} />
        )}
      </div>
      <div className='issue-content'>
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span
              key={label}
              className={`label red`}
            >
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee ? <div>{assignee}</div> : null}
      <span className='comment-count'>
        {commentCount ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
};
