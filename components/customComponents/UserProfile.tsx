"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserProfile {
  id: string
  fullName: string
  email: string
  // Add other profile fields as needed
}

export default function AccountProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken')
        
        if (!token) {
          toast.error('Please login to access this page')
          router.push('/login')
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userProfile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('authToken')
            toast.error('Session expired. Please login again.')
            router.push('/login')
            return
          }
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        console.log(data)
        setProfile(data)
      } catch (error) {
        console.error('Profile fetch error:', error)
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    toast.success('Logged out successfully')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Available</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogout} className="w-full">
              Return to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Manage your account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <p className="text-sm">{profile.fullName}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm">{profile.email}</p>
          </div>

          {/* Add more profile fields as needed */}

          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full mt-6"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}