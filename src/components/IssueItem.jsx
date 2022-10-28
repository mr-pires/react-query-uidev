import { Link } from "react-router-dom";
import { GoIssueClosed, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from "../helpers/useUserData";
import { Label } from "./Label";

export const IssueItem = ({ key, title, number, assignee, commentCount, createdBy, createdDate, labels, status }) => {
  const assigneeUser = useUserData(assignee)
  const createdByUser = useUserData(createdBy)

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
            <Label key={label} label={label}/>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ''}
        </small>
      </div>
      {assignee ? <img src={assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ""}  className="assigned-to" alt={`Assigned to ${assigneeUser.isSuccess ? assigneeUser.data.name : "avatar"}`} /> : null}
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

