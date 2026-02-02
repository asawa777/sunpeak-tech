"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ConsultationFormProps {
  types: string[]
  note: string
}

export function ConsultationForm({ types, note }: ConsultationFormProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      topic: formData.get('topic'),
      details: formData.get('details')
    }

    try {
      const res = await fetch('/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input required name="name" type="text" className="w-full p-3 rounded-lg border border-input bg-background" placeholder="John Doe" />
           </div>
           <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <input required name="email" type="email" className="w-full p-3 rounded-lg border border-input bg-background" placeholder="john@company.com" />
           </div>
        </div>
        
        <div className="space-y-4 mb-8">
           <label className="text-sm font-medium">Topic of Consultation</label>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {types.map((type: string, i: number) => (
                 <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors">
                    <input type="radio" name="topic" value={type} className="accent-primary h-4 w-4" defaultChecked={i === 0} />
                    <span className="text-sm">{type}</span>
                 </label>
              ))}
           </div>
        </div>

        <div className="space-y-2 mb-8">
           <label className="text-sm font-medium">Project Details (Optional)</label>
           <textarea name="details" className="w-full p-3 rounded-lg border border-input bg-background min-h-[100px]" placeholder="Briefly describe your requirements..." />
        </div>

        <div className="flex items-center gap-4">
            <Button size="lg" className="w-full md:w-auto" disabled={loading}>
                {loading ? 'Sending...' : 'Request Free Consultation'}
            </Button>
            {status === 'success' && <span className="text-green-500 font-medium">Message sent successfully!</span>}
            {status === 'error' && <span className="text-red-500 font-medium">Failed to send. Please try again.</span>}
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">{note}</p>
    </form>
  )
}
