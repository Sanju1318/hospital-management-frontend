import React from 'react'
import Banner from './banner'
import Faculity from './Faculity'
import Staff from './staff'
import Review from './review'
import Gallery from './gallary'
import About from './about'
import Contact from './contact'
import Footer from '../footer'
import Addstaff from './addstaff'
import AddGallary from './addGallary'
import AddLeader from './addLeader'
import Service from './service'
import BookAppointment from './bookAppointment'

const Landing = () => {
  return (
    <div>
        <Banner/>
      <Faculity/>
      <Service/>
      <Staff/>
      <Review/>
      <Gallery/>
      <About/>
      <Contact/>
      {/* <Footer/> */}
      {/* <Addstaff/>
      <AddGallary/>
      <AddLeader/> */}
      {/* <BookAppointment/> */}
    </div>
  )
}

export default Landing
