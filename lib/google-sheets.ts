import type { RegistrationFormData } from '@/lib/validations/registration'

export type RegistrationResult = {
  success: boolean
  error?: string
  duplicate?: boolean
}

export async function submitRegistration(
  data: RegistrationFormData
): Promise<RegistrationResult> {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.status === 409) {
      return { success: false, duplicate: true, error: 'already_registered' }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.error || 'Registration failed' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Network error. Please try again.' }
  }
}
