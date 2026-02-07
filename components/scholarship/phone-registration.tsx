'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInWithOTP } from '@/lib/auth'
import { OTPVerification } from './otp-verification'
import { RegistrationForm } from './registration-form'

type RegistrationStep = 'phone' | 'otp' | 'details'

interface PhoneRegistrationProps {
  scholarshipId: string
  onRegistrationComplete: () => void
}

export function PhoneRegistration({
  scholarshipId,
  onRegistrationComplete,
}: PhoneRegistrationProps) {
  const [step, setStep] = useState<RegistrationStep>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const handlePhoneSubmit = async () => {
    if (!phoneNumber) {
      setError('Please enter your phone number')
      return
    }

    // Basic validation for Indian phone numbers (starting with +91 or just 10 digits)
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+91${cleanPhone.slice(-10)}`

    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await signInWithOTP(formattedPhone)

      if (signInError) {
        setError(signInError.message || 'Failed to send OTP')
        return
      }

      setPhoneNumber(formattedPhone)
      setStep('otp')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerifySuccess = (session: any) => {
    if (session?.user?.id) {
      setUserId(session.user.id)
      setStep('details')
    }
  }

  const handleResendOTP = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error: resendError } = await signInWithOTP(phoneNumber)

      if (resendError) {
        setError(resendError.message || 'Failed to resend OTP')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToPhone = () => {
    setStep('phone')
    setError(null)
  }

  return (
    <div className="w-full">
      {step === 'phone' && (
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your mobile number to register for the scholarship test
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center bg-gray-100 px-3 rounded-lg border border-gray-300">
                  <span className="text-gray-700 font-medium">+91</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10-digit number"
                  value={phoneNumber.replace(/^\+91/, '')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                    setPhoneNumber(value ? `+91${value}` : '')
                    setError(null)
                  }}
                  disabled={loading}
                  className="flex-1"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              onClick={handlePhoneSubmit}
              disabled={loading || phoneNumber.replace(/\D/g, '').length < 10}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            We'll send you a one-time password via SMS to verify your phone number
          </p>
        </div>
      )}

      {step === 'otp' && (
        <div className="w-full flex flex-col items-center">
          <OTPVerification
            phoneNumber={phoneNumber}
            onVerifySuccess={handleOTPVerifySuccess}
            onResendOTP={handleResendOTP}
            isLoading={loading}
          />
          <button
            onClick={handleBackToPhone}
            className="mt-6 text-sm text-blue-600 hover:text-blue-700"
            disabled={loading}
          >
            ← Change phone number
          </button>
        </div>
      )}

      {step === 'details' && userId && (
        <RegistrationForm
          scholarshipId={scholarshipId}
          userId={userId}
          phoneNumber={phoneNumber}
          onRegistrationComplete={onRegistrationComplete}
        />
      )}
    </div>
  )
}
