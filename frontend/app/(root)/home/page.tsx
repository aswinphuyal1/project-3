import AIAssistantWidget from '@/components/AI';
import LiveSessionsWidget from '@/components/Livenow';
import RecentUpload from '@/components/Recentupload';
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
    </div>
  );
}

export default page