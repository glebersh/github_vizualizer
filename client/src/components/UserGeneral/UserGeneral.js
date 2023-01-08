import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors';
import './UserGeneral.css';


const UserGeneral = () => {
  const userData = useSelector(userSelector);
  const { login, avatar_url,
    company, twitter_username,
    followers, following,
    email, name, bio } = userData;


  return (
    <>
      <div className='flex'>
        <img src={avatar_url} />
        <div className='user-general-container'>
          <ul className='list-default'>
            {name && <li className='user-info-li'>{name}</li>}
            <li className='user-info-li'>{login}</li>
            {company && <li className='user-info-li'>Company: {company}</li>}

            <h3>Socials</h3>

            {
              twitter_username && <li className='user-info-li'>
                <i className="bi bi-twitter"></i>
                <a className='default-link email-link'
                  href={`https://twitter.com/${twitter_username}`}
                  target='_blank'> {twitter_username}
                </a>
              </li>
            }
            {
              email &&
              <li className='user-info-li'>
                <i className="bi bi-mailbox2"></i>
                <a className='default-link email-link'
                  href={`mailto:${email}`}
                  target='_blank'> {email}
                </a>
              </li>
            }
            <li className='user-info-li'>Followers: {followers}</li>
            <li className='user-info-li'>Following: {following}</li>
          </ul>
          {bio && <p>{bio}</p>}
        </div>
      </div>
    </>
  )
};

export default UserGeneral;