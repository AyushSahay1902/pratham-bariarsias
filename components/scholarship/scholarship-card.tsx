'use client'

import { Award, CalendarDays, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScholarshipCardProps {
  id: string
  title: string
  description: string
  testSchedule: string
  scholarshipPercentage: number
  targetClasses: string
  onRegisterClick: () => void
}

export function ScholarshipCard({
  title,
  description,
  testSchedule,
  scholarshipPercentage,
  targetClasses,
  onRegisterClick,
}: ScholarshipCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header with gradient */}
      <div
        className="px-6 py-8"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary), #0d5d56)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-teal-50 mt-2">{description}</p>
          </div>
          <Award className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--brand-secondary)' }} />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Scholarship amount */}
        <div className="rounded-lg p-4 border-2" style={{ backgroundColor: 'var(--brand-bg-soft)', borderColor: 'var(--brand-primary)' }}>
          <p className="text-sm" style={{ color: 'var(--brand-primary)' }}>
            Get up to
          </p>
          <p className="text-3xl font-bold" style={{ color: 'var(--brand-primary)' }}>
            {scholarshipPercentage}%
          </p>
          <p className="text-sm" style={{ color: 'var(--brand-primary)' }}>
            merit-based scholarship
          </p>
        </div>

        {/* Test date highlight */}
        <div
          className="rounded-lg p-3 flex items-center gap-3"
          style={{ backgroundColor: 'var(--brand-bg-warm)', border: '1.5px solid var(--brand-secondary)' }}
        >
          <CalendarDays className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--brand-secondary)' }} />
          <div>
            <p className="text-sm font-bold text-gray-900">{testSchedule}</p>
            <p className="text-xs text-gray-500">Register before seats fill up</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-primary)' }} />
          <div>
            <p className="text-sm font-medium text-gray-900">For</p>
            <p className="text-sm text-gray-600">{targetClasses}</p>
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <Button
          onClick={onRegisterClick}
          className="w-full text-white font-semibold"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          Register Now
        </Button>
        <p className="text-xs text-gray-600 text-center mt-3">
          Limited to first 50 confirmed admissions
        </p>
      </div>
    </div>
  )
}
