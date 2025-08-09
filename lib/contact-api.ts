

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://skillbridge-backend2.onrender.com"

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

// Submit contact form
export async function submitContactForm(contactData: ContactFormData): Promise<any> {
  try {
    console.log("Submitting contact form with data:", contactData)
    console.log("Posting to:", `${API_BASE_URL}/api/contact`)

    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })

    console.log("Contact form response status:", response.status)
    console.log("Contact form response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Contact form error response:", errorText)
      throw new Error(`Failed to submit contact form: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Contact form submitted successfully:", data)
    return data
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}
