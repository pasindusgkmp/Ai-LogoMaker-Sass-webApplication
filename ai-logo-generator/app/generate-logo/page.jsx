"use client"
import React, { useContext, useEffect , useState} from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Lookup from '../_data/Lookup';
import { DownloadIcon, LayoutDashboard, LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';


function GenerateLogo() {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);

  const [formData,setFormData] =useState();
  const [loading,setLoading]=useState(false);
  const [logoImage,setLogoImage] = useState();
  const searchParams=useSearchParams();
  const modelType = searchParams.get('type');

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
    if(modelType!='Free'&&userDetail?.credits<=0)
    {
      console.log('No Credits')
      toast('Not Enough Credits')
      return;
    }
    

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
      desc:formData.desc,
      type:modelType,
      userCredits:userDetail?.credit
    });

    console.log(result?.data);
    setLogoImage(result.data?.image)
    setLoading(false);



  }




  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <h2>{loading&&'Loading..'}</h2>
      {!loading&&<Image src={logoImage} alt="logo" width={200} height={200}/>}

      {/* <h2 className='font-bold text-3xl text-primary'>{Lookup.LoadingWaitTitle}</h2>
        {loading&& <div className='flex flex-col items-center mt-2'> 
          
          <p className='text-x1 text-gray-500'>{Lookup.LoadingWaitDesc}<p/>
          <LoaderIcon className='animate-spin'/>
          <Image src={'/loading.gif'} alt="logo" width={200} height={200}/>
          <h2 className='mt-2 font-medium text-2xl text-gray-500'>Download</h2>
        </div>}


        {logoImage&&<div className='mt-5'>
          <Image src={logoImage} alt="logo" width={200} height={200} 
          className='rounded-xl' />

          <div className='mt-4 flex items-center gap-5'>
            <Button onClick={()=>onDownload()}> <DownloadIcon/> Download </Button> 
            <Button variant="outline"> <LayoutDashboard/> Dashboard </Button>

          </div>
          }
          
           <div/>} */}
      
    </div>
  )



  // return (
  //   <div className="mt-16 flex flex-col items-center justify-center">
  //     {/* Title */}
  //     <h2 className="font-bold text-3xl text-primary">{Lookup.LoadingWaitTitle}</h2>
  
  //     {/* Loading Section */}
  //     {loading && (
  //       <div className="flex flex-col items-center mt-2">
  //         <p className="text-xl text-gray-500">{Lookup.LoadingWaitDesc}</p>
  //         <LoaderIcon className="animate-spin" />
  //         <Image src="/loading.gif" alt="loading" width={200} height={200} />
  //         <h2 className="mt-2 font-medium text-2xl text-gray-500">Download</h2>
  //       </div>
  //     )}
  
  //     {/* Logo Section */}
  //     {logoImage && (
  //       <div className="mt-5">
  //         <Image
  //           src={logoImage}
  //           alt="logo"
  //           width={200}
  //           height={200}
  //           className="rounded-xl"
  //         />
  
  //         {/* Buttons */}
  //         <div className="mt-4 flex items-center gap-5">
  //           <Button onClick={() => onDownload()}>
  //             <DownloadIcon /> Download
  //           </Button>
  //           <Button variant="outline">
  //             <LayoutDashboard /> Dashboard
  //           </Button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  
}

export default GenerateLogo
