"use client"
import { Navbar } from "@/app/[locale]/components/navbar"
import Footer from "@/app/[locale]/components/footer"
import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { submitContactForm, type ContactFormData } from "@/lib/contact-api"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const t = useTranslations("contactPage")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Submit to API
      const contactData: ContactFormData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      }

      await submitContactForm(contactData)

      // Success
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We will get back to you soon.",
      })

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToMap = () => {
    const map = document.getElementById("contact-map")
    if (map) map.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen font-montserrat bg-white dark:bg-gray-950 transition-colors duration-300 flex flex-col text-gray-800 dark:text-gray-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6 shadow-md p-8 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-300">
            <h1 className="text-4xl font-bold text-[#2196F3] dark:text-blue-400">
              Get <span className="text-orange-500 dark:text-orange-400">In Touch</span> With Us
            </h1>
            <p>We're happy to help! Reach out to us for any questions, feedback, or support.</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">📞 Phone number</h4>
                <p>+251-901-123-456</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">📧 {t("emailAddress")}</h4>
                <a href="mailto:skillbridgeinstituteoftech@gmail.com" className="">
                  skillbridgeinstituteoftech@gmail.com
                </a>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">📍 Office address</h4>
                <p>Addis Ababa, Ethiopia</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">📨 Telegram</h4>
                <p>@skillbridgesupport2</p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 shadow-md p-8 rounded-lg bg-white dark:bg-gray-800 space-y-4 transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Send Us a Message</h2>

            {/* Success/Error Messages */}
            {submitStatus.type && (
              <div
                className={`p-4 rounded-md ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full border px-4 py-2 rounded h-32 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2196F3] hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
            >
              {isSubmitting ? "Sending..." : t("messageButton")}
            </button>
          </form>
        </div>
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
            Find Us On the Map
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden border dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.6719600732655!2d38.75776007590039!3d9.030151990986828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f57f3d87ff%3A0x6f6242500e5b2a4a!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1687598230123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
