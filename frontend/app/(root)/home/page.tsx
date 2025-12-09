import AIAssistantWidget from '@/components/AI';
import LiveSessionsWidget from '@/components/Livenow';
import RecentUpload from '@/components/Recentupload';
import RecommendedForYou from '@/components/Recommended';
import Recommended from '@/components/Recommended';
import SideNavbar from '@/components/SideNavbar';
import UploadButton from '@/components/upload';

import WelcomeCard from '@/components/welcome';

import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeCard />
      <AIAssistantWidget/>
      <UploadButton/>
     <LiveSessionsWidget/>
     <RecentUpload/>
     <RecommendedForYou/>
    </div>
  );
}

export default page