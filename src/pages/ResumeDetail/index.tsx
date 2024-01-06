import React from 'react';
import { useParams } from 'react-router-dom';

const ResumeDetail = () => {
  const { id } = useParams();

  return <div>ResumeDetail: {id}</div>;
};

export default ResumeDetail;
