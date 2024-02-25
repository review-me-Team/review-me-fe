import React, { useEffect } from 'react';

const MainPage = () => {
  // * test용
  useEffect(() => {
    fetch(`https://api.review-me.co.kr/test`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>MainPage</div>;
};

export default MainPage;
