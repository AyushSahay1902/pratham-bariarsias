'use client'

import { createClient } from '@/lib/supabase/client'

/**
 * Send OTP to phone number
 * @param phoneNumber - Phone number with country code (e.g., +91XXXXXXXXXX)
 */
export async function signInWithOTP(phoneNumber: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        shouldCreateUser: true,
      },
    })

    // Handle phone provider not configured
    if (error?.code === 'phone_provider_disabled') {
      console.warn('[v0] Phone OTP Provider Error:', error.message)
      return {
        data: null,
        error: {
          code: 'PHONE_PROVIDER_ERROR',
          message: 'SMS provider is not configured. Please contact support.',
        },
      }
    }

    if (error) {
      console.error('[v0] OTP Sign In Error:', error.message)
      return { data, error }
    }

    return { data, error }
  } catch (err: any) {
    console.error('[v0] OTP Exception:', err.message)
    return {
      data: null,
      error: {
        message: 'Failed to send OTP. Please try again.',
      },
    }
  }
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
