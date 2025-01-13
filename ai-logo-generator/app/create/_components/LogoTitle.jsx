'use client'
import React, { useState, useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'


function LogoTitle({onHandleInputChange ,formData}) {
  const searchParam = useSearchParams();
  const [title, setTitle] = useState(searchParam?.get('title')??'')

  useEffect(() => {
    setTitle(formData?.title || searchParam.get('title') || '');
}, [formData?.title, searchParam]);



  const handleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    onHandleInputChange(value);
  }

  return (
    <div className='my-10'>
      <HeadingDescription 
        title={Lookup?.LogoTitle} 
        description={Lookup.LogoTitleDesc}
      />

      <input 
        type='text' 
        placeholder={Lookup.HeroInputPlaceholder}
        className='w-full p-4 border rounded-lg mt-5'
        defaultValue={formData?.title}
        onChange={(e)=>onHandleInputChange(e.target.value)}
      />  
    </div>
  )
}

export default LogoTitle
