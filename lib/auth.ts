'use client'

import { createClient } from '@/lib/supabase/client'

/**
 * Send OTP to phone number
 * @param phoneNumber - Phone number with country code (e.g., +91XXXXXXXXXX)
 */
export async function signInWithOTP(phoneNumber: string) {
  const supabase = createClient()

  console.log('[Auth] Sending OTP to:', phoneNumber)

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) {
      console.error('[Auth] OTP error:', {
        code: error.code,
        message: error.message,
        status: (error as any).status,
      })

      if (error.code === 'phone_provider_disabled') {
        return {
          data: null,
          error: {
            code: 'PHONE_PROVIDER_ERROR',
            message: 'SMS provider is not configured. Please contact support.',
          },
        }
      }

      return { data, error }
    }

    console.log('[Auth] OTP sent successfully')
    return { data, error }
  } catch (err: any) {
    console.error('[Auth] OTP exception:', err)
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

  console.log('[Auth] Verifying OTP for:', phoneNumber)

  const { data, error } = await supabase.auth.verifyOtp({
    phone: phoneNumber,
    token,
    type: 'sms',
  })

  if (error) {
    console.error('[Auth] OTP verify error:', {
      code: error.code,
      message: error.message,
      status: (error as any).status,
    })
  } else {
    console.log('[Auth] OTP verified successfully, user:', data.user?.id)
  }

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
