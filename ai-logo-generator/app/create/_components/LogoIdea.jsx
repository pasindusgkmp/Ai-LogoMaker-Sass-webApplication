// 'use client'
// import React, { useState, useEffect } from 'react'
// import HeadingDescription from './HeadingDescription'
// import Lookup from '@/app/_data/Lookup'
// import axios from 'axios'
// import Prompt from '@/app/_data/Prompt'
// import { useRouter } from 'next/navigation';



// function LogoIdea({formData}) {
//     // const [ideas,setIdeas] = useState();
//     // const [loading,setLoading] = useState(false);
//     // const [selectedOption,setSelectedOption] = useState();



//     useEffect(()=>{
//         generateLogoDesignIdeas();
//     },[])






//     const generateLogoDesignIdeas = ()=>{
//       const PROMPT = prompt.DESIGN_IDEA_PROMPT
//       .replace('{logoType}',formData?.design.title)
//       .replace('{logoTitle}',formData.title)
//       .replace('{logoDesc}',formData.desc)
//       .replace('{logoPrompt}',formData.design.prompt)
//       // const result=await axios.post('/api/ai-logo-design-ideas',{
//       //   prompt
//       // })

//       console.log(PROMPT);
//     }


//     // const generateLogoDesignIdeas = () => {
//     //   const PROMPT = Prompt.DESIGN_IDEA_PROMPT
//     //     .replace('{logoType}', formData?.design?.title || '')
//     //     .replace('{logoTitle}', formData?.title || '')
//     //     .replace('{logoDesc}', formData?.desc || '')
//     //     .replace('{logoPrompt}', formData?.design?.prompt || '');
    
//     //   console.log(PROMPT);
//     // };
    

//   return (
//     <div className='my-10'>
//      <HeadingDescription
//      title={Lookup.LogoIdeaTitle}
//      description={Lookup.LogoIdeaDesc}
//      />
//     </div>
//   )
// }

// export default LogoIdea



'use client';
import React, { useState, useEffect } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import axios from 'axios';
import Prompt from '@/app/_data/Prompt'; // Keep only this import
import { useRouter } from 'next/navigation';

function LogoIdea({ formData }) {
  useEffect(() => {
    generateLogoDesignIdeas();
  }, []);

  const generateLogoDesignIdeas = () => {
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace('{logoType}', formData?.designs?.title || '')
      .replace('{logoTitle}', formData?.title || '')
      .replace('{logoDesc}', formData?.desc || '')
      .replace('{logoPrompt}', formData?.designs?.prompt || '');

    console.log(PROMPT);
  }

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
    </div>
  );
}

export default LogoIdea;

