'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registerForScholarship } from '@/lib/scholarship'

interface RegistrationFormProps {
  scholarshipId: string
  userId: string
  phoneNumber: string
  onRegistrationComplete: () => void
}

export function RegistrationForm({
  scholarshipId,
  userId,
  phoneNumber,
  onRegistrationComplete,
}: RegistrationFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [classLevel, setClassLevel] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim()) {
      setError('Please enter your full name')
      return
    }

    if (!classLevel) {
      setError('Please select your class level')
      return
    }

    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      const { data, error: registerError } = await registerForScholarship(
        scholarshipId,
        userId,
        {
          phoneNumber,
          fullName: fullName.trim(),
          email: email.trim() || undefined,
          classLevel,
        }
      )

      if (registerError) {
        setError(registerError.message || 'Failed to register. Please try again.')
        return
      }

      // Success!
      onRegistrationComplete()
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
        <p className="mt-2 text-sm text-gray-600">
          Just a few details to get you registered for the scholarship test
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address (Optional)
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="classLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Class Level
          </label>
          <select
            id="classLevel"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            disabled={loading}
            required
            className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none"
            style={{
              borderColor: 'var(--brand-primary)',
              backgroundColor: 'white',
            }}
          >
            <option value="">Select your aspirant type</option>
            <option value="upsc-2027">UPSC CSE 2027 Aspirant</option>
            <option value="beginners">Beginner/Early Stage</option>
            <option value="college-student">College Student</option>
            <option value="working-professional">Working Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          disabled={loading || !fullName.trim() || !classLevel}
          className="w-full text-white"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          {loading ? 'Registering...' : 'Complete Registration'}
        </Button>
      </form>

      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--brand-bg-soft)' }}>
        <p className="text-xs" style={{ color: 'var(--brand-primary)' }}>
          <strong>Verified:</strong> Phone number {phoneNumber} ✓
        </p>
      </div>
    </div>
  )
}
