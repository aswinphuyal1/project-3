import AIAssistantWidget from '@/components/AI';
import SideNavbar from '@/components/SideNavbar';
import WelcomeCard from '@/components/welcome';

import React from 'react'

const page = () => {
  return (
    <div>
      <WelcomeCard />
      <AIAssistantWidget
        
      />
    </div>
  );
}

export default page