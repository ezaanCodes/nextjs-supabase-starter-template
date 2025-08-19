import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Signup from './Sign-up'
import Login from './Login'

const Auth = () => {
    return (
        <Tabs defaultValue='login' className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full bg-gray-100 rounded-md p-1 mb-4">
                <TabsTrigger
                    value='login'
                    className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition"
                >
                    Login
                </TabsTrigger>
                <TabsTrigger
                    value='signup'
                    className="text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition"
                >
                    Sign up
                </TabsTrigger>
            </TabsList>

            <TabsContent value='login'>
                <Login />
            </TabsContent>
            <TabsContent value='signup'>
                <Signup />
            </TabsContent>
        </Tabs>
    )
}

export default Auth