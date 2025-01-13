'use client'
import React, { useState } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'

import LogoDesc from './_components/LogoDesc'
import LogoColorPallete from './_components/LogoColorPallete'
import LogoDesigns from './_components/LogoDesigns'
import LogoIdea from './_components/LogoIdea'
import PricingModel from './_components/PricingModel'
import { ArrowLeft ,ArrowRight } from 'lucide-react'

function CreateLogo() {
  const [step,setStep] = useState(1);
  const [formData,setFormData] = useState();

  const onHandleInputChange = (field,value) => {
      setFormData(prev=>({
      ...prev,
      [field]:value
    }))
  }

  console.log(formData);


 

  return (
    <div className='mt-28 p-10 border rounded-xl 2xl:mx-72'>
      {step==1 ? 
      <LogoTitle onHandleInputChange={(v)=>onHandleInputChange('title',v)}
      formData={formData}/>:
      step==2 ?
      <LogoDesc onHandleInputChange={(v)=>onHandleInputChange('desc',v)}
      formData={formData}/>:
      step==3 ?
      <LogoColorPallete onHandleInputChange={(v)=>onHandleInputChange('pallete',v)}
      formData={formData}/>:
      step==4 ?
      <LogoDesigns onHandleInputChange={(v)=>onHandleInputChange('designs',v)}
      formData={formData}/>:
      step==5 ?
      <LogoIdea onHandleInputChange={(v)=>onHandleInputChange('idea',v)}
      formData={formData}/>:
      step==6 ?
      <PricingModel onHandleInputChange={(v)=>onHandleInputChange('pricing',v)}
      formData={formData}/>:
      null
    }
      
      <div className='flex items-center justify-between mt-10'>
       {step!=1&& <Button variant='outline' onClick={()=>setStep(step-1)}> <ArrowLeft/>Previous</Button>}
        <Button onClick={()=>setStep(step+1)}> <ArrowRight/> Continue</Button>
      </div>
    </div>
  )
}

export default CreateLogo