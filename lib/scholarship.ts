'use client'

import { createClient } from '@/lib/supabase/client'

/**
 * Register a user for a scholarship test
 */
export async function registerForScholarship(
  scholarshipId: string,
  userId: string,
  registrationData: {
    phoneNumber: string
    fullName: string
    email?: string
    classLevel: string
  }
) {
  const supabase = createClient()

  const { data, error } = await supabase.from('registrations').insert([
    {
      user_id: userId,
      scholarship_id: scholarshipId,
      phone_number: registrationData.phoneNumber,
      full_name: registrationData.fullName,
      email: registrationData.email,
      class_level: registrationData.classLevel,
      status: 'registered',
    },
  ])

  return { data, error }
}

/**
 * Get all scholarships
 */
export async function getScholarships() {
  const supabase = createClient()

  const { data, error } = await supabase.from('scholarships').select('*')

  return { data, error }
}

/**
 * Get scholarship by ID
 */
export async function getScholarshipById(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

/**
 * Get user registrations
 */
export async function getUserRegistrations(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', userId)

  return { data, error }
}
