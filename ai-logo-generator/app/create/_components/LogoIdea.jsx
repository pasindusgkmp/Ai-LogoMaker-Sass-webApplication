'use client'
import React, { useState, useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'


function LogoIdea({formData,onHandleInputChange}) {
    const [ideas,setIdeas] = useState();
    const [loading,setLoading] = useState(false);
    const [selectedOption,setSelectedOption] = useState();
    useEffect(()=>{
        generateLogoDesignIdeas();
    },[])

    const generateLogoDesignIdeas = async ()=>{
      if (!formData?.design?.title || !formData?.title || !formData?.desc) {
        console.log('Required form data is missing');
        return;
    }





        setLoading(true);
        const PROMPT = Prompt.DESIGN_IDEA_PROMPT
        .replace('{logoType}',formData?.design.title)
        .replace('{logoTitle}',formData.title)
        .replace('{logoDesc}',formData.desc)
        .replace('{logoPromt}',formData.design.prompt)

        console.log(PROMPT)

        
    }

  return (
    <div className='my-10'>
     <HeadingDescription
     title={Lookup.LogoIdeaTitle}
     description={Lookup.LogoIdeaDesc}
     />
    </div>
  )
}

export default LogoIdea
