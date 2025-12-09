import AIAssistantWidget from '@/components/AI';
import LiveSessionsWidget from '@/components/Livenow';
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
    </div>
  );
}

export default page