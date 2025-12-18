
import { ProfileAnalyticsChart } from '@/components/ProfileAnalyticsChart';
import ProfileBanner from '@/components/ProfileBanner'
import WelcomeCard from '@/components/welcome'
import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeCard/>
      <ProfileBanner/>
      <ProfileAnalyticsChart/>
    </div>
  );
}

export default page