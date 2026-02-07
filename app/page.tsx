'use client'

import { useState } from 'react'
import { ScholarshipCard } from '@/components/scholarship/scholarship-card'
import { PhoneRegistration } from '@/components/scholarship/phone-registration'
import { Award, Star, Users } from 'lucide-react'

const SCHOLARSHIP = {
  id: 'cbse-scholarship-2024',
  title: 'CBSE Scholarship Test',
  description: 'All India Scholarship Test for CBSE Students',
  testSchedule: 'Every Sunday, 12 PM',
  scholarshipPercentage: 90,
  targetClasses: 'Class 6 - 12 & Foundation',
}

export default function ScholarshipLanding() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const handleRegistrationComplete = () => {
    setRegistrationComplete(true)
    setShowRegistration(false)
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
            <p className="text-gray-600 mt-2">
              You're all set for the CBSE Scholarship Test. Check your email for further details.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Next Steps:</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Confirm your email and phone</li>
              <li>✓ Study materials will be sent soon</li>
              <li>✓ Join our test at the scheduled time</li>
            </ul>
          </div>

          <button
            onClick={() => setRegistrationComplete(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">ScholarshipTest</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="text-gray-600 hover:text-blue-600">
              About
            </a>
            <a href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </a>
            <a href="#faq" className="text-gray-600 hover:text-blue-600">
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
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                🏆 Free Scholarship Test
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Get <span className="text-blue-600">90% Scholarship</span> on Online Subscriptions
              </h1>
              <p className="text-lg text-gray-600">
                Appear for the CBSE Scholarship Test and unlock premium learning at discounted rates. Perfect for
                students from Class 6 to 12 and Foundation programs.
              </p>
            </div>

            {/* Key highlights */}
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Completely Free</p>
                  <p className="text-gray-600 text-sm">No registration fees or hidden costs</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Regular Tests</p>
                  <p className="text-gray-600 text-sm">Every Sunday at 12 PM IST</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Instant Results</p>
                  <p className="text-gray-600 text-sm">Get your scholarship certificate immediately</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Registration or Card */}
          <div className="flex justify-center">
            {showRegistration ? (
              <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
                <PhoneRegistration
                  scholarshipId={SCHOLARSHIP.id}
                  onRegistrationComplete={handleRegistrationComplete}
                />
                <button
                  onClick={() => setShowRegistration(false)}
                  className="mt-4 w-full text-center text-gray-600 hover:text-gray-900 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <ScholarshipCard
                id={SCHOLARSHIP.id}
                title={SCHOLARSHIP.title}
                description={SCHOLARSHIP.description}
                testSchedule={SCHOLARSHIP.testSchedule}
                scholarshipPercentage={SCHOLARSHIP.scholarshipPercentage}
                targetClasses={SCHOLARSHIP.targetClasses}
                onRegisterClick={() => setShowRegistration(true)}
              />
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Join Us?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Thousands of students have benefited from our scholarship programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Merit-Based Scholarships',
                description: 'Get recognized for your academic excellence with substantial discounts',
              },
              {
                icon: Users,
                title: 'Supportive Community',
                description: 'Join thousands of ambitious students preparing together',
              },
              {
                icon: Star,
                title: 'Expert Content',
                description: 'Access top-quality study materials and live classes',
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 space-y-4">
                <feature.icon className="w-12 h-12 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50,000+', label: 'Active Students' },
            { number: '₹10Cr+', label: 'Scholarships Awarded' },
            { number: '95%', label: 'Success Rate' },
            { number: '4.8/5', label: 'Student Rating' },
          ].map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-4xl font-bold text-blue-600">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Is the scholarship test really free?',
                a: 'Yes! The test is completely free. There are no hidden charges or registration fees.',
              },
              {
                q: 'How often are the tests conducted?',
                a: 'Tests are held every Sunday at 12 PM IST. You can participate in as many tests as you want.',
              },
              {
                q: 'What is the duration of the test?',
                a: 'The test duration is typically 60-90 minutes depending on your class level.',
              },
              {
                q: 'How will I know my results?',
                a: 'Results are declared immediately after the test. Your scholarship certificate will be sent via email.',
              },
              {
                q: 'Can I retake the test?',
                a: 'Yes! You can appear for multiple tests to improve your scholarship percentage.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg">Join thousands of students preparing for success</p>
          <button
            onClick={() => setShowRegistration(true)}
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Register Now for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">ScholarshipTest</h4>
              <p className="text-sm">Making quality education accessible to all students.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ScholarshipTest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
