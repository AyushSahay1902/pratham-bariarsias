import { NextRequest, NextResponse } from 'next/server'
import { registrationSchema } from '@/lib/validations/registration'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = registrationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, phone } = parsed.data

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL is not configured')
      return NextResponse.json(
        { error: 'Registration service is not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: `+91${phone}`,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok && response.status !== 302) {
      console.error('Google Sheets error:', response.status, await response.text())
      return NextResponse.json(
        { error: 'Failed to save registration' },
        { status: 502 }
      )
    }

    // Parse the Google Apps Script response to check for duplicates
    const result = await response.json().catch(() => ({ result: 'success' }))
    console.log('[Register API] Google Sheets response:', result)

    if (result.result === 'duplicate') {
      return NextResponse.json(
        { error: 'duplicate', field: result.field },
        { status: 409 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
