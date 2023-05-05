import React from 'react';

const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) =>
  event.preventDefault();

export default preventDefaultSubmit;
