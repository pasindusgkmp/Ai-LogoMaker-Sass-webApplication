"use client"
import React, { useEffect } from 'react';
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';




const PricingModel = ({formData}) => {
  //const [selectedPricing, setSelectedPricing] = useState(formData?.pricing?.title);

  const {user} = useUser();
  

  useEffect(() => {
    if (formData?.title && typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }, [formData]);
  

  return (
    <div className='mt-10'>
      <HeadingDescription
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-5'>
        {Lookup.pricingOption.map((pricing, index) => (
            <div 
              key={index}
              className='flex flex-col items-center p-5 border rounded-2xl'
              // onClick={() => {
              //   setSelectedPricing(pricing.title);
              //   onHandleInputChange(pricing);
              // }}
            >
                <Image 
                    src={pricing.icon} 
                    alt={pricing.title}
                    width={60}
                    height={60}
                />
                <h2 className='text-2xl font-medium'>{pricing.title}</h2>
                <div className='my-5'>
                    {pricing.features?.map((feature, idx) => (
                        <h2 className='text-lg mt-3' key={idx}>{feature}</h2>
                    ))}
                </div>
                {user?
                // <Link href={'/generate-logo?type='+pricing.title}>
                // <Button className='mt-5'>{pricing.button}</Button>
                // </Link>

                <Link href={`/generate-logo?type=${pricing.title}`} passHref>
  <Button className="mt-5">{pricing.button}</Button>
</Link>

                :
               // forceRedirectUrl={'/generate-logo?type='+pricing.title}
                <SignInButton mode='modal' forceRedirectUrl={'/generate-logo?type='+pricing.title}>
                    <Button className='mt-5'>{pricing.button}</Button>
                </SignInButton>
              }
                
            </div>
        ))}
      </div>
    </div>
  )
}

export default PricingModel
