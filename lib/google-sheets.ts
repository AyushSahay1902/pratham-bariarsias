import type { RegistrationFormData } from '@/lib/validations/registration'

export async function submitRegistration(
  data: RegistrationFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.error || 'Registration failed' }
    }

    return { success: true }
  } catch {
    return { success: false, error: 'Network error. Please try again.' }
  }
}
