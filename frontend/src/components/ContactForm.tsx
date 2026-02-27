import { useState } from 'react';
import { useSubmitContactForm } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitContactForm();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please write your feedback.';
    else if (formData.message.trim().length < 10) newErrors.message = 'Feedback must be at least 10 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitMutation.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      // error handled by mutation state
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-6">
        <div className="text-5xl mb-4">🧶</div>
        <h3 className="font-serif text-2xl font-bold text-plum mb-3">
          Thank you for your feedback!
        </h3>
        <p className="font-sans text-plum-light leading-relaxed mb-6">
          Your message has been received. We truly appreciate you taking the time to share your thoughts with us!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="font-sans text-sm text-rose hover:text-rose-dark underline underline-offset-2 transition-colors"
        >
          Leave another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="mb-2">
        <h3 className="font-serif text-xl font-bold text-plum">Leave Your Feedback</h3>
        <p className="font-sans text-xs text-muted-foreground mt-1">We'd love to hear what you think!</p>
      </div>

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="font-sans text-sm font-bold text-plum">
          Your Name
        </Label>
        <Input
          id="contact-name"
          type="text"
          placeholder="e.g. Sarah Johnson"
          value={formData.name}
          onChange={handleChange('name')}
          className={`bg-blush border-lavender focus:border-rose focus:ring-rose/20 font-sans placeholder:text-muted-foreground/60 ${errors.name ? 'border-destructive' : ''}`}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="font-sans text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email" className="font-sans text-sm font-bold text-plum">
          Email Address
        </Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="e.g. sarah@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          className={`bg-blush border-lavender focus:border-rose focus:ring-rose/20 font-sans placeholder:text-muted-foreground/60 ${errors.email ? 'border-destructive' : ''}`}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="font-sans text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="font-sans text-sm font-bold text-plum">
          Your Feedback / Message
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Share your experience, suggestions, or just say hello!"
          value={formData.message}
          onChange={handleChange('message')}
          rows={5}
          className={`bg-blush border-lavender focus:border-rose focus:ring-rose/20 font-sans placeholder:text-muted-foreground/60 resize-none ${errors.message ? 'border-destructive' : ''}`}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="font-sans text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      {/* Submit error */}
      {submitMutation.isError && (
        <p className="font-sans text-xs text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full bg-rose hover:bg-rose-dark text-primary-foreground font-sans font-bold text-sm py-3 rounded-full transition-all duration-200 shadow-warm"
      >
        {submitMutation.isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Feedback ✦'
        )}
      </Button>
    </form>
  );
}
