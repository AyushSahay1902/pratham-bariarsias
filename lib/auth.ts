'use client'

import { createClient } from '@/lib/supabase/client'

/**
 * Send OTP to phone number
 * @param phoneNumber - Phone number with country code (e.g., +91XXXXXXXXXX)
 */
export async function signInWithOTP(phoneNumber: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({
    phone: phoneNumber,
  })

  return { data, error }
}

/**
 * Verify OTP token
 * @param phoneNumber - The phone number that received the OTP
 * @param token - The 6-digit OTP code
 */
export async function verifyOTP(phoneNumber: string, token: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    phone: phoneNumber,
    token,
    type: 'sms',
  })

  return { data, error }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
