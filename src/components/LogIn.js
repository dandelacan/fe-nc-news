import React from "react";

const LogIn = (props) => {
  const { user } = props;
  return (
    <section className='login'>
      <img src={user.avatar_url} alt={user.username} className='avatar' />
      <p>you are logged in as {user.username}</p>
    </section>
  );
};

export default LogIn;
