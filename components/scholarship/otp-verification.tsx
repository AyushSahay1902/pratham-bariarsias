'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { verifyOTP } from '@/lib/auth'

interface OTPVerificationProps {
  phoneNumber: string
  onVerifySuccess: (session: any) => void
  onResendOTP: () => void
  isLoading?: boolean
}

export function OTPVerification({
  phoneNumber,
  onVerifySuccess,
  onResendOTP,
  isLoading = false,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setVerifying(true)
    setError(null)

    try {
      const { data, error: verifyError } = await verifyOTP(phoneNumber, otp)

      if (verifyError) {
        setError(verifyError.message || 'Failed to verify OTP')
        return
      }

      onVerifySuccess(data)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('OTP verification error:', err)
    } finally {
      setVerifying(false)
    }
  }

  const handleResendOTP = () => {
    onResendOTP()
    setResendCooldown(60)
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleOTPInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setOtp(value)
    setError(null)
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a 6-digit code to <span className="font-semibold">{phoneNumber}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP Code
          </label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={otp}
            onChange={handleOTPInputChange}
            maxLength={6}
            className="text-center text-2xl tracking-widest font-mono"
            disabled={verifying || isLoading}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          onClick={handleVerify}
          disabled={verifying || isLoading || otp.length !== 6}
          className="w-full text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          {verifying ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              onClick={handleResendOTP}
              disabled={resendCooldown > 0 || isLoading}
              className="hover:opacity-80 disabled:text-gray-400 font-medium"
              style={{ color: 'var(--brand-primary)' }}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
