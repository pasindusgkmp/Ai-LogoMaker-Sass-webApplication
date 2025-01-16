"use client"
import React, { useContext, useEffect , useState} from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';


function GenerateLogo() {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);

  const [formData,setFormData] =useState();

  useEffect(()=>{
    if(typeof window != undefined && userDetail?.email)
    {
      const storage = localStorage.getItem('formData')
      if(storage)
      {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage))
      }
    }
  },[userDetail])



  useEffect(()=>{
    if(formData?.title)
    {
      GenerateAILogo();
    }
  },[formData])


  const GenerateAILogo=async()=>{
    const PROMPT= Prompt.LOGO_PROMPT
    .replace('{logoTitle}',formData?.title)
    .replace('{logoDesc}',formData?.desc)
    .replace('{logoColor}',formData?.palette)
    .replace('{logoIdea}',formData?.designs.idea)
    .replace('{logoDesign}',formData?.designs?.title)
    .replace('{logoPrompt}',formData?.designs?.prompt);


  //   const PROMPT = prompt.LOGO_PROMPT
  // ? prompt.LOGO_PROMPT
  //     .replace('{logoTitle}', formData?.title || '')
  //     .replace('{logoDesc}', formData?.desc || '')
  //     .replace('{logoColor}', formData?.palette || '')
  //     .replace('{logoDesign}', formData?.design?.title || '')
  //     .replace('{logoPrompt}', formData?.design?.Prompt || '')
  // : 'Default Prompt';


    console.log(PROMPT);



    //generate logo promt from ai
    //generate logo  image


    const result = await axios.post('/api/ai-logo-model',{
      prompt:PROMPT
    });

    console.log(result?.data);



  }




  return (
    <div>
      generate logo
    </div>
  )
}

export default GenerateLogo
