import ProfileBanner from '@/components/ProfileBanner'
import WelcomeCard from '@/components/welcome'
import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeCard/>
      <ProfileBanner/>
    </div>
  );
}

export default page