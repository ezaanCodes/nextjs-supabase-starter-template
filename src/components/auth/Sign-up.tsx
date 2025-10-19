import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Toaster } from '../ui/sonner'
import { toast } from "sonner"
import client from '@/api/client'

const Signup = () => {
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            email: HTMLInputElement;
            password: HTMLInputElement;
        };
        
        const email = formElements.email.value;
        const password = formElements.password.value;

        console.log(email, password)
        if (!email || !password) {
            toast.error("email or password missing")
            return
        }
        const { data, error } = await client.auth.signUp({
            email, password,
        })
        console.log(data)
        console.log(error)
         if (data) {
            toast.success("sign up successful")
            return
        }
        if (error) {
            toast.error("sign up un-successful")
            return
        }

    }
    return (
        <><Toaster />
            <Card>
                <CardHeader>
                    <CardTitle> Sign up</CardTitle>
                    <CardDescription> Email Passwrod</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSignup}>
                        <div className='flex flex-col gap-6 '>
                            <div>
                                <Label>Email</Label>
                                <Input id="email" type='email' required placeholder='email@gmail.com' />
                            </div>
                            <div>
                                <Label>Paswword</Label>
                                <Input id="password" type='password' placeholder='12345' />
                            </div>
                            <Button type='submit'>Signup</Button>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </>
    )
}

export default Signup