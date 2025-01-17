"use client"
import React, { useContext, useEffect , useState} from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';


function GenerateLogo() {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);

  const [formData,setFormData] =useState();
  const [loading,setLoading]=useState(false);
  const [logoImage,setLogoImage] = useState();

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
    setLoading(true);
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
      prompt:PROMPT,
      email:userDetail?.email,
      title:formData.title,
      desc:formData.desc
    });

    console.log(result?.data);
    setLogoImage(result.data?.image)
    setLoading(false);



  }




  return (
    <div>
      <h2>{loading&&'Loading..'}</h2>
      {!loading&&<Image src={logoImage} alt="logo" width={200} height={200}/>}

      
    </div>
  )
}

export default GenerateLogo
