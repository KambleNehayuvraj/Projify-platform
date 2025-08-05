import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ProjectType from '../../components/ProjectType/ProjectType'
import PopularProjects from '../../components/PopularProjects/PopularProjects'
const Home = () => {
  return (
    <div>
      <Header/>
      <ProjectType/>
      <PopularProjects/>
    </div>
  )
}

export default Home
