import React from "react";
import axios from "axios";

const Home = () => {

    const config = {
      headers: {
          Authorization: localStorage.getItem('token')
      }
    };

    axios.get('http://localhost:8080/api/v1/user/' + localStorage.getItem('username'), config)
        .then(
            res =>
            {
                localStorage.setItem('user', JSON.stringify(res.data));
            });

    return (
        <div>
            Hi {JSON.parse(localStorage.getItem('user')).username}
        </div>
    );
};

export default Home;