'use client'

import { Award, Clock, BookOpen } from 'lucide-react'
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-blue-100 mt-2">{description}</p>
          </div>
          <Award className="w-8 h-8 text-yellow-300 flex-shrink-0" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Scholarship amount */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700">Get up to</p>
          <p className="text-3xl font-bold text-green-600">{scholarshipPercentage}%</p>
          <p className="text-sm text-green-700">scholarship on subscriptions</p>
        </div>

        {/* Details grid */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Test Schedule</p>
              <p className="text-sm text-gray-600">{testSchedule}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Target Classes</p>
              <p className="text-sm text-gray-600">{targetClasses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <Button
          onClick={onRegisterClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Enroll for Free
        </Button>
        <p className="text-xs text-gray-600 text-center mt-3">
          T&C apply, as available on the platform
        </p>
      </div>
    </div>
  )
}
