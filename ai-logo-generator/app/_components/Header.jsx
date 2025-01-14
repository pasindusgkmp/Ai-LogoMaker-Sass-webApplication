'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'


function Header() {

  const {user} = UserButton();

  return (
    <header className="w-full border-b">
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
        <Image src="/logo.svg" alt="logo" width={180} height={100} priority />


        <div className='flex gap-3 items-center'>
          {user?<Button> Dashboard </Button>:
        <Button variant="default">Get Started</Button>}
        <UserButton/>
        </div>
      </div>
    </header>
  )
}

export default Header
