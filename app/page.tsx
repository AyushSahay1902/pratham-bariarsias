'use client'

import { useState } from 'react'
import { ScholarshipCard } from '@/components/scholarship/scholarship-card'
import { RegistrationDialog } from '@/components/scholarship/registration-dialog'
import { AnimatedStats } from '@/components/scholarship/animated-stats'
import { Award, BookOpen, Target, Users2, CalendarDays } from 'lucide-react'

const SCHOLARSHIP = {
  id: 'pratham-gs-foundation-2027',
  title: 'Pratham Scholarship Test',
  description: 'GS Foundation Course for UPSC CSE 2027',
  testSchedule: '21st February 2026 - Offline',
  scholarshipPercentage: 70,
  targetClasses: 'UPSC Aspirants 2027',
}

export default function ScholarshipLanding() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--brand-primary)' }}>
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Bariar's IAS Academy</p>
              <span className="font-bold text-lg text-gray-900">Pratham</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="text-gray-600 hover:text-gray-900" style={{ color: 'inherit' }}>
              About
            </a>
            <a href="#features" className="text-gray-600 hover:text-gray-900" style={{ color: 'inherit' }}>
              Why Pratham
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900" style={{ color: 'inherit' }}>
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--brand-bg-soft)', color: 'var(--brand-primary)' }}>
                  Pratham Scholarship Test
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold" style={{ backgroundColor: 'var(--brand-secondary)', color: '#fff' }}>
                  <CalendarDays className="w-4 h-4" />
                  21st Feb 2026
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Get up to <span style={{ color: 'var(--brand-primary)' }}>70% Scholarship</span> for GS Foundation Course
              </h1>
              <p className="text-lg text-gray-600">
                Pratham is your structured entry into UPSC 2027 preparation. A merit-based scholarship test designed for serious aspirants planning the Civil Services journey.
              </p>
            </div>

            {/* Key highlights */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Target className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <p className="font-semibold text-gray-900">Assess Your Readiness</p>
                  <p className="text-gray-600 text-sm">Know where you stand and plan your UPSC journey</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <BookOpen className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <p className="font-semibold text-gray-900">Guided Preparation</p>
                  <p className="text-gray-600 text-sm">One-on-one mentorship and personalized roadmap included</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Users2 className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--brand-primary)' }} />
                <div>
                  <p className="font-semibold text-gray-900">Limited Seats</p>
                  <p className="text-gray-600 text-sm">Only 50 scholarship admissions - apply early</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Scholarship Card */}
          <div className="flex justify-center">
            <ScholarshipCard
              id={SCHOLARSHIP.id}
              title={SCHOLARSHIP.title}
              description={SCHOLARSHIP.description}
              testSchedule={SCHOLARSHIP.testSchedule}
              scholarshipPercentage={SCHOLARSHIP.scholarshipPercentage}
              targetClasses={SCHOLARSHIP.targetClasses}
              onRegisterClick={() => setDialogOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24" style={{ backgroundColor: 'var(--brand-bg-soft)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Pratham?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              More than just a scholarship exam—your gateway to structured UPSC preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Readiness Assessment',
                description: 'Evaluate your UPSC preparation level before committing long-term',
              },
              {
                icon: BookOpen,
                title: 'Mentorship & Guidance',
                description: 'One-on-one counselling and personalized preparation roadmap included',
              },
              {
                icon: Award,
                title: 'Up to 70% Scholarship',
                description: 'Merit-based scholarship to the GS Foundation Course 2027',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="w-12 h-12" style={{ color: 'var(--brand-primary)' }} />
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <AnimatedStats
        stats={[
          { number: 70, label: 'Max Scholarship', suffix: '%' },
          { number: 50, label: 'Scholarship Seats' },
          { number: 60, label: 'Test Duration', suffix: ' mins' },
          { number: 50, label: 'Test Questions' },
        ]}
      />

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Is Pratham difficult?',
                a: 'No. The test is designed for beginners and focuses on aptitude and basic GS orientation—no heavy current affairs required.',
              },
              {
                q: 'Who should take Pratham?',
                a: 'Aspirants targeting UPSC CSE 2027, college students planning early preparation, and serious beginners seeking clarity and structure.',
              },
              {
                q: 'What is the scholarship structure?',
                a: 'Top performers: Up to 70% scholarship | Next merit ranks: 20-30% scholarship | Qualifying candidates: 10% scholarship. Limited to first 50 confirmed admissions.',
              },
              {
                q: 'What happens after I appear for the test?',
                a: 'You receive a detailed performance assessment, understand your strengths/gaps, and get a one-on-one mentorship session with personalized preparation guidance.',
              },
              {
                q: 'Can I appear for Pratham if I have never studied for UPSC?',
                a: 'Absolutely! Pratham is designed for beginners. No prior coaching or heavy preparation required.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 pl-6 py-4" style={{ borderColor: 'var(--brand-primary)' }}>
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, var(--brand-primary), #0d5d56)` }}>
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Begin Your UPSC Journey?</h2>
          <p className="text-white text-opacity-90 text-lg">Take Pratham now. Understand where you stand. Start right.</p>
          <button
            onClick={() => setDialogOpen(true)}
            className="inline-block text-teal-700 font-bold py-3 px-8 rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-secondary)' }}
          >
            Register for Pratham Test
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Bariar's IAS Academy</h4>
              <p className="text-sm">Concept-driven UPSC coaching with mentorship-focused approach. Located in Bangalore.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Programs</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Pratham Test
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    GS Foundation 2027
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Optional Courses
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Explore</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Academy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Study Materials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Follow</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Bariar's IAS Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <RegistrationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
