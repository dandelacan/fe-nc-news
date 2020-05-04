import React from "react";

const LogIn = (props) => {
  const { user } = props;
  return (
    <section>
      <img src={user.avatar_url} alt={user.username} width='50' height='50' />
      <p>you are logged in as {user.username}</p>
    </section>
  );
};

export default LogIn;
