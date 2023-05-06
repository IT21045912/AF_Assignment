import React from 'react'

function Home() {
  const name = localStorage.getItem('Name');
  console.log(name);
  return (
    <div>Home</div>
  )
}

export default Home