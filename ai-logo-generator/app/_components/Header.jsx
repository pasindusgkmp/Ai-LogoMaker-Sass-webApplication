'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <header className="w-full border-b">
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
        <Image src="/logo.svg" alt="logo" width={180} height={100} priority />
        <Button variant="default">Get Started</Button>
      </div>
    </header>
  )
}

export default Header