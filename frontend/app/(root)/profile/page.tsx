
import { ProfileAnalyticsChart } from '@/components/ProfileAnalyticsChart';
import ProfileBanner from '@/components/ProfileBanner'
import WelcomeCard from '@/components/welcome'
import WelcomeForProfile from '@/components/welcomeforprofile';
import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeForProfile/>
      <ProfileBanner/>
      <ProfileAnalyticsChart/>
    </div>
  );
}

export default page