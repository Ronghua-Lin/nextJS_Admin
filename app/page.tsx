import React from 'react'
import { redirect } from "next/navigation";
const Home = async () => {
  redirect("/login");
  return (
    <div>Home</div>
  )
}

export default Home