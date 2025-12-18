
import { ModernAnalytics } from '@/components/ModernAnalytics';
import ProfileBanner from '@/components/ProfileBanner'
import WelcomeCard from '@/components/welcome'
import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeCard/>
      <ProfileBanner/>
      
      <ModernAnalytics/>
    </div>
  );
}

export default page