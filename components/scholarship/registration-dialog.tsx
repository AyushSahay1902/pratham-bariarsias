'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { submitRegistration } from '@/lib/google-sheets'
import {
  registrationSchema,
  type RegistrationFormData,
} from '@/lib/validations/registration'
import { Loader2, Check, Sparkles, CalendarDays } from 'lucide-react'

// ── OTP imports — commented out until Supabase phone provider is configured ──
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from '@/components/ui/input-otp'
// import { signInWithOTP, verifyOTP } from '@/lib/auth'

type Step = 'form' | 'success' | 'already-registered'

interface RegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegistrationDialog({ open, onOpenChange }: RegistrationDialogProps) {
  const [step, setStep] = useState<Step>('form')
  const [loading, setLoading] = useState(false)

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: '', email: '', phone: '' },
  })

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form')
        setLoading(false)
        form.reset()
      }, 200)
    }
    onOpenChange(isOpen)
  }

  // Validate form and submit directly to Google Sheets
  // OTP verification is bypassed for now — will re-enable later
  async function onFormSubmit(data: RegistrationFormData) {
    setLoading(true)

    try {
      console.log('[Registration] Submitting to Google Sheets:', data)
      const result = await submitRegistration(data)

      if (result.duplicate) {
        console.log('[Registration] Duplicate entry detected')
        setStep('already-registered')
        return
      }

      if (!result.success) {
        console.error('[Registration] Google Sheets submit failed:', result.error)
        form.setError('root', {
          message: result.error || 'Registration failed. Please try again.',
        })
        return
      }

      console.log('[Registration] Registration complete!')
      setStep('success')
      toast.success('Registration successful!')

      // ── OTP flow — commented out for now ──
      // const formattedPhone = `+91${data.phone}`
      // console.log('[Registration] Sending OTP to:', formattedPhone)
      // const { error } = await signInWithOTP(formattedPhone)
      // if (error) {
      //   const message =
      //     (error as any).code === 'PHONE_PROVIDER_ERROR'
      //       ? 'OTP service is being set up. Please try again shortly.'
      //       : (error as any).message || 'Failed to send OTP'
      //   form.setError('phone', { message })
      //   return
      // }
    } catch {
      form.setError('root', { message: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  // ── OTP verification handler — commented out for now ──
  // async function handleVerifyOTP() { ... }
  // const handleResendOTP = useCallback(async () => { ... }, [])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>Register for Pratham</DialogTitle>
              <DialogDescription>
                Enter your details to register for the scholarship test
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <div className="flex gap-2">
                        <div
                          className="flex items-center px-3 rounded-md border"
                          style={{
                            borderColor: 'var(--brand-primary)',
                            backgroundColor: 'var(--brand-bg-soft)',
                          }}
                        >
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--brand-primary)' }}
                          >
                            +91
                          </span>
                        </div>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            placeholder="10-digit number"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white"
                  style={{ backgroundColor: 'var(--brand-primary)' }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Now'
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}

        {/* ── OTP step — commented out for now ──
        {step === 'otp' && (
          <OTP verification UI was here>
        )}
        */}

        {step === 'already-registered' && (
          <div className="flex flex-col items-center py-8 px-2">
            {/* Calendar icon */}
            <div className="relative mb-6">
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center success-bounce-in"
                style={{ backgroundColor: 'var(--brand-bg-soft)' }}
              >
                <CalendarDays
                  className="w-10 h-10 success-draw-check"
                  style={{ color: 'var(--brand-primary)' }}
                />
              </div>
            </div>

            {/* Text content */}
            <div className="text-center space-y-2 success-fade-up-1">
              <h3 className="text-2xl font-bold text-gray-900">
                Already Registered!
              </h3>
              <p className="text-gray-500 text-sm max-w-[300px] mx-auto">
                You have already registered for the Pratham Scholarship Test. Prepare well and wait for further communications.
              </p>
            </div>

            {/* Test date highlight */}
            <div
              className="w-full mt-6 rounded-xl p-5 text-center success-fade-up-2"
              style={{
                backgroundColor: 'var(--brand-bg-soft)',
                border: '2px solid var(--brand-primary)',
              }}
            >
              <p className="text-sm font-medium text-gray-600">Test Date</p>
              <p
                className="text-2xl font-bold mt-1"
                style={{ color: 'var(--brand-primary)' }}
              >
                Tentative 28th Feb
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Stay tuned for venue &amp; timing details
              </p>
            </div>

            {/* Tips */}
            <div
              className="w-full mt-4 rounded-xl p-4 space-y-2 success-fade-up-2"
              style={{ backgroundColor: 'var(--brand-bg-warm)' }}
            >
              <p className="text-sm font-semibold text-gray-700">Prepare for the test:</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-secondary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  Revise basic GS concepts &amp; aptitude
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-secondary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  No heavy current affairs needed
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-secondary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  Focus on clarity of fundamentals
                </li>
              </ul>
            </div>

            {/* Done button */}
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full mt-6 text-white success-fade-up-3"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              Got it
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center py-8 px-2">
            {/* Animated success circle */}
            <div className="relative mb-6">
              {/* Outer ring pulse */}
              <div
                className="absolute inset-0 rounded-full success-ping"
                style={{ backgroundColor: 'var(--brand-primary)', opacity: 0.2 }}
              />
              {/* Ring expand */}
              <div
                className="absolute -inset-3 rounded-full success-ring"
                style={{
                  border: '3px solid var(--brand-primary)',
                  opacity: 0.15,
                }}
              />
              {/* Main circle with checkmark */}
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center success-bounce-in"
                style={{ backgroundColor: 'var(--brand-primary)' }}
              >
                <Check
                  className="w-10 h-10 text-white success-draw-check"
                  strokeWidth={3}
                />
              </div>
            </div>

            {/* Sparkle decorations */}
            <div className="relative w-full flex justify-center mb-4">
              <Sparkles
                className="absolute -top-12 -left-2 w-5 h-5 success-sparkle-1"
                style={{ color: 'var(--brand-secondary)' }}
              />
              <Sparkles
                className="absolute -top-14 right-4 w-4 h-4 success-sparkle-2"
                style={{ color: 'var(--brand-primary)' }}
              />
              <Sparkles
                className="absolute -top-8 right-0 w-3 h-3 success-sparkle-3"
                style={{ color: 'var(--brand-secondary)' }}
              />
            </div>

            {/* Text content */}
            <div className="text-center space-y-2 success-fade-up-1">
              <h3 className="text-2xl font-bold text-gray-900">
                You&apos;re Registered!
              </h3>
              <p className="text-gray-500 text-sm max-w-[280px] mx-auto">
                We&apos;ll reach out with test schedule and preparation details soon.
              </p>
            </div>

            {/* Info card */}
            <div
              className="w-full mt-6 rounded-xl p-4 space-y-2 success-fade-up-2"
              style={{ backgroundColor: 'var(--brand-bg-soft)' }}
            >
              <p className="text-sm font-semibold text-gray-700">What&apos;s next?</p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  Confirmation on your email &amp; phone
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  Test schedule and preparation tips
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--brand-primary)' }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  One-on-one mentorship session
                </li>
              </ul>
            </div>

            {/* Done button */}
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full mt-6 text-white success-fade-up-3"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
