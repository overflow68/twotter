import React from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SearchResult({ user }) {
  let navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/profile/${user.ImFollowing[0]}`);
    /*console.log(window.location.href)*/
  };
  return (
    <div className="result-info">
      <div onClick={goToProfile} className="tw-pfp-result">
        <img
          src={user.pfpURL}
          className="tw-pfp"
          alt=""
        ></img>
      </div>
      <div>
        <div className="author-id-search">
          <div onClick={goToProfile} className="author-id1-search">
            {user ? user.name : null}
            {user ? (
              user.verified ? (
                <MdVerified className="verified" />
              ) : null
            ) : null}
          </div>
          <div className="usernameac-search"> {" " + user.username}</div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
