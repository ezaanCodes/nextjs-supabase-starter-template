"use client"

import client from '@/api/client'
import { Button } from '@/components/ui/button'
import React from 'react'

const Dashboard = () => {
  const SignOut = () => {
    client.auth.signOut()

  }
  return (
    <div>Dashboard page

      <Button onClick={SignOut}>
        Sign out
      </Button>
    </div>
  )
}

export default Dashboard