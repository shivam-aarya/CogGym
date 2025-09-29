/**
 * Anonymous Session Management
 *
 * Manages anonymous user sessions for study participation without authentication.
 * Uses a combination of browser fingerprinting and localStorage for session tracking.
 */

const ANONYMOUS_ID_KEY = 'studyhub_anonymous_id'
const SESSION_PREFIX = 'studyhub_session_'

/**
 * Generate a simple browser fingerprint based on available information
 */
function generateFingerprint(): string {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
    screen.colorDepth.toString(),
    screen.width.toString() + 'x' + screen.height.toString(),
  ]

  // Simple hash function
  const str = components.join('|')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36) + Date.now().toString(36)
}

/**
 * Get or create an anonymous ID for the current browser
 */
export function getAnonymousId(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  try {
    let anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY)

    if (!anonymousId) {
      anonymousId = generateFingerprint()
      localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId)
    }

    return anonymousId
  } catch (error) {
    console.error('Error accessing localStorage:', error)
    return generateFingerprint()
  }
}

/**
 * Store session data in localStorage
 */
export function saveSessionData(studyId: string, sessionId: string, data: any): void {
  if (typeof window === 'undefined') return

  try {
    const key = `${SESSION_PREFIX}${studyId}`
    const sessionData = {
      sessionId,
      studyId,
      data,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(key, JSON.stringify(sessionData))
  } catch (error) {
    console.error('Error saving session data:', error)
  }
}

/**
 * Retrieve session data from localStorage
 */
export function getSessionData(studyId: string): any {
  if (typeof window === 'undefined') return null

  try {
    const key = `${SESSION_PREFIX}${studyId}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error retrieving session data:', error)
    return null
  }
}

/**
 * Clear session data for a specific study
 */
export function clearSessionData(studyId: string): void {
  if (typeof window === 'undefined') return

  try {
    const key = `${SESSION_PREFIX}${studyId}`
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error clearing session data:', error)
  }
}

/**
 * Check if a user has already participated in a study
 */
export function hasParticipated(studyId: string): boolean {
  if (typeof window === 'undefined') return false

  try {
    const key = `${SESSION_PREFIX}${studyId}_completed`
    return localStorage.getItem(key) === 'true'
  } catch (error) {
    console.error('Error checking participation status:', error)
    return false
  }
}

/**
 * Mark a study as completed
 */
export function markStudyCompleted(studyId: string): void {
  if (typeof window === 'undefined') return

  try {
    const key = `${SESSION_PREFIX}${studyId}_completed`
    localStorage.setItem(key, 'true')
  } catch (error) {
    console.error('Error marking study as completed:', error)
  }
}

/**
 * Get all stored session keys for cleanup
 */
export function getAllSessionKeys(): string[] {
  if (typeof window === 'undefined') return []

  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(SESSION_PREFIX)) {
        keys.push(key)
      }
    }
    return keys
  } catch (error) {
    console.error('Error getting session keys:', error)
    return []
  }
}