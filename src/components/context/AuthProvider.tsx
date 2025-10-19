'use client'

import React, { createContext, ReactNode, useEffect, useState, useContext } from 'react'
import client from '@/api/client'

import { User } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null | undefined
    loading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // Get initial session
        client.auth.getSession().then(({ data }) => {
            setUser(data?.session?.user)
            setLoading(false)
        })

        // Subscribe to auth changes
        const { data: listener } = client.auth.onAuthStateChange((event, session) => {
            setUser(session?.user)
        })

        return () => {
            listener?.subscription?.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider }
