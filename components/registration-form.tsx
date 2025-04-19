"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import confetti from 'canvas-confetti'
import QRCode from 'react-qr-code'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

// Define the form schema type
type FormValues = z.infer<typeof formSchema>

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  age: z.string(),
  gender: z.string(),
  fitnessLevel: z.string(),
  trekExperience: z.string(),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
    relation: z.string()
  }),
  medicalInfo: z.string().optional(),
  height: z.string(),
  weight: z.string(),
  tShirtSize: z.string(),
  dietaryRestrictions: z.string().optional(),
  equipmentNeeds: z.string().optional(),
  howHeard: z.string(),
  specialRequests: z.string().optional(),
  termsAccepted: z.boolean()
})

interface RegistrationData {
  full_name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  fitnessLevel: string;
  emergencyContact: string;
  emergencyPhone: string;
  equipmentNeeds: string[];
  medicalConditions: string;
  dietaryRestrictions: string;
  trekExperience: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [registrationData, setRegistrationData] = useState<z.infer<typeof formSchema> | null>(null)
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'ticket'>('form')
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [error, setError] = useState("")
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const { toast } = useToast()
  const [showPayment, setShowPayment] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const [ticketData, setTicketData] = useState<any>(null)

  // Check if there's stored data on mount
  useEffect(() => {
    const storedData = localStorage.getItem('footslog_registration')
    const storedPayment = localStorage.getItem('footslog_payment')
    const storedTicket = localStorage.getItem('footslog_ticket')
    
    if (storedTicket) {
      const ticketData = JSON.parse(storedTicket)
      setRegistrationData(JSON.parse(localStorage.getItem('footslog_registration') || '{}'))
      setTicketId(ticketData.ticketId)
      setCurrentStep('ticket')
      setPaymentComplete(true)
    } else if (storedPayment && storedData) {
      setRegistrationData(JSON.parse(storedData))
      setPaymentComplete(JSON.parse(storedPayment).complete)
      setCurrentStep('payment')
    }
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      fitnessLevel: "",
      trekExperience: "",
      emergencyContact: {
        name: "",
        phone: "",
        relation: ""
      },
      medicalInfo: "",
      height: "",
      weight: "",
      tShirtSize: "",
      dietaryRestrictions: "",
      equipmentNeeds: "",
      howHeard: "",
      specialRequests: "",
      termsAccepted: false
    }
  })

  // Get base URL based on environment
  function getBaseUrl() {
    return window.location.origin;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Prepare registration data for Supabase
      const registrationData = {
        id: uuidv4(),
        full_name: form.getValues('fullName'),
        email: form.getValues('email'),
        data: {
          phone: form.getValues('phone'),
          age: form.getValues('age'),
          gender: form.getValues('gender'),
          fitnessLevel: form.getValues('fitnessLevel'),
          emergencyContact: form.getValues('emergencyContact'),
          medicalInfo: form.getValues('medicalInfo'),
          height: form.getValues('height'),
          weight: form.getValues('weight'),
          tShirtSize: form.getValues('tShirtSize'),
          dietaryRestrictions: form.getValues('dietaryRestrictions'),
          equipmentNeeds: form.getValues('equipmentNeeds'),
          howHeard: form.getValues('howHeard'),
          specialRequests: form.getValues('specialRequests'),
          trekExperience: form.getValues('trekExperience')
        },
        payment_status: 'pending',
        registered_at: new Date().toISOString()
      };

      // Save to localStorage first
      localStorage.setItem('footslog_registration', JSON.stringify(registrationData));

      // Submit to Supabase
      const { data, error: supabaseError } = await supabase
        .from('simple_registrations')
        .insert([registrationData])
        .select()
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Store the registration ID for payment processing
      localStorage.setItem('registrationId', registrationData.id);
      
      // Show payment section
      setCurrentStep('payment');
      setIsSubmitting(false);

    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit registration. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const registrationId = localStorage.getItem('registrationId');
      if (!registrationId) {
        throw new Error('Registration ID not found');
      }

      // Generate ticket ID
      const ticketId = `FOOT${Date.now().toString(36).toUpperCase()}`;

      // Update registration with payment status and ticket ID in Supabase
      const { error: supabaseError } = await supabase
        .from('simple_registrations')
        .update({
          payment_status: 'completed',
          ticket_id: ticketId,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Store ticket info in localStorage
      localStorage.setItem('footslog_ticket', JSON.stringify({ ticketId }));
      
      // Show ticket preview
      setTicketId(ticketId);
      setCurrentStep('ticket');
      setPaymentComplete(true);
      setIsSubmitting(false);

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Reset the entire registration process
  function resetRegistration() {
    localStorage.removeItem('footslog_registration')
    localStorage.removeItem('footslog_payment')
    localStorage.removeItem('footslog_ticket')
    setRegistrationData(null)
    setCurrentStep('form')
    setPaymentComplete(false)
    setTicketId("")
    form.reset()
  }
  
  // Ticket component to display after successful payment
  const TicketComponent = () => {
    if (!registrationData) return null
    
    return (
      <div className="rounded-lg bg-[#243420] backdrop-blur-sm p-6 border border-[#4A6D33] shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#D4A72C] mb-2">Footslog Trek Ticket</h3>
          <p className="text-[#E5E1D6]">Your adventure awaits!</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex justify-center items-center p-4 bg-white rounded-lg">
            <QRCode 
              value={`FOOTSLOG-TREK-${ticketId}`}
              size={150}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
            />
          </div>
          
          <div className="md:w-2/3 space-y-4">
            <div className="border-b border-[#4A6D33]/30 pb-2">
              <p className="text-[#8B9D7D] text-sm">Participant</p>
              <p className="text-[#E5E1D6] font-medium text-lg">{registrationData.fullName}</p>
            </div>
            
            <div className="border-b border-[#4A6D33]/30 pb-2">
              <p className="text-[#8B9D7D] text-sm">Ticket ID</p>
              <p className="text-[#D4A72C] font-medium">{ticketId}</p>
            </div>
            
            <div className="border-b border-[#4A6D33]/30 pb-2">
              <p className="text-[#8B9D7D] text-sm">Experience Level</p>
              <p className="text-[#E5E1D6]">{registrationData.trekExperience.charAt(0).toUpperCase() + registrationData.trekExperience.slice(1)}</p>
            </div>
            
            <div className="border-b border-[#4A6D33]/30 pb-2">
              <p className="text-[#8B9D7D] text-sm">T-Shirt Size</p>
              <p className="text-[#E5E1D6]">{registrationData.tShirtSize}</p>
            </div>
            
            <div>
              <p className="text-[#8B9D7D] text-sm">Emergency Contact</p>
              <p className="text-[#E5E1D6]">{registrationData.emergencyContact.name} ({registrationData.emergencyContact.phone})</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-[#1A2614]/50 rounded-lg p-4">
          <h4 className="text-[#D4A72C] font-medium mb-2">Important Trek Information</h4>
          <ul className="text-[#E5E1D6] text-sm space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 mr-2 mt-1 bg-[#D4A72C]/20 rounded-full flex-shrink-0"></span>
              <span>Please arrive at the meeting point 30 minutes before departure.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 mr-2 mt-1 bg-[#D4A72C]/20 rounded-full flex-shrink-0"></span>
              <span>Bring your ID card and a printed or digital copy of this ticket.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 mr-2 mt-1 bg-[#D4A72C]/20 rounded-full flex-shrink-0"></span>
              <span>Weather-appropriate clothing and sturdy footwear are essential.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-4 h-4 mr-2 mt-1 bg-[#D4A72C]/20 rounded-full flex-shrink-0"></span>
              <span>Stay hydrated and follow the trek leader's instructions at all times.</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => window.print()}
            className="bg-[#4A6D33] text-[#E5E1D6] hover:bg-[#3A5D23]"
          >
            Print Ticket
          </Button>
          <Button
            onClick={resetRegistration}
            variant="outline"
            className="border-[#4A6D33] text-[#E5E1D6] hover:bg-[#1A2614]/50"
          >
            Register Another Person
          </Button>
        </div>
      </div>
    )
  }
  
  // Payment component shown after form submission
  const PaymentComponent = () => {
    if (!registrationData) return null
    
    return (
      <div className="rounded-lg bg-[#2A3B22]/80 backdrop-blur-sm p-6 border border-[#4A6D33]/30">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-[#D4A72C] mb-2">Complete Your Registration</h3>
          <p className="text-[#E5E1D6]">Please complete the payment to secure your spot on the trek.</p>
        </div>
        
        <div className="bg-[#1A2614]/50 rounded-lg p-4 mb-6">
          <h4 className="text-[#D4A72C] font-medium mb-3">Registration Summary</h4>
          <ul className="space-y-2 text-[#E5E1D6]">
            <li className="flex justify-between">
              <span>Participant:</span>
              <span className="font-medium">{registrationData.fullName}</span>
            </li>
            <li className="flex justify-between">
              <span>Trek Experience:</span>
              <span>{registrationData.trekExperience}</span>
            </li>
            <li className="flex justify-between">
              <span>T-Shirt Size:</span>
              <span>{registrationData.tShirtSize}</span>
            </li>
            <li className="border-t border-[#4A6D33]/30 mt-3 pt-3 flex justify-between font-medium">
              <span>Total Amount:</span>
              <span className="text-[#D4A72C]">₹850</span>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-[#D4A72C] font-medium mb-3">Payment Methods</h4>
          <div className="space-y-3">
            <div className="border border-[#4A6D33]/50 rounded-lg p-3 bg-[#1A2614]/30 cursor-pointer hover:bg-[#1A2614]/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#D4A72C] mr-3 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#D4A72C]"></div>
                </div>
                <div>
                  <p className="text-[#E5E1D6] font-medium">Credit/Debit Card</p>
                  <p className="text-[#8B9D7D] text-sm">Pay securely with your card</p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#4A6D33]/50 rounded-lg p-3 bg-[#1A2614]/30 cursor-pointer hover:bg-[#1A2614]/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#4A6D33] mr-3"></div>
                <div>
                  <p className="text-[#E5E1D6] font-medium">UPI</p>
                  <p className="text-[#8B9D7D] text-sm">Pay with your favorite UPI app</p>
                </div>
              </div>
            </div>
            
            <div className="border border-[#4A6D33]/50 rounded-lg p-3 bg-[#1A2614]/30 cursor-pointer hover:bg-[#1A2614]/50 transition-colors">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[#4A6D33] mr-3"></div>
                <div>
                  <p className="text-[#E5E1D6] font-medium">Net Banking</p>
                  <p className="text-[#8B9D7D] text-sm">Pay directly from your bank account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handlePayment}
            disabled={isSubmitting}
            className="w-full bg-[#D4A72C] text-[#0F1A0A] hover:bg-[#C69A28] disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              "Pay Now (₹850)"
            )}
          </Button>
          <Button
            onClick={() => setCurrentStep('form')}
            variant="outline"
            className="border-[#4A6D33] text-[#E5E1D6] hover:bg-[#1A2614]/50"
          >
            Back to Form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-20" id="register">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/90 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('/images/parchment-texture.svg')] bg-cover opacity-5"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#D4A72C] md:text-5xl">
            {currentStep === 'form' && "Join the Adventure"}
            {currentStep === 'payment' && "Complete Your Registration"}
            {currentStep === 'ticket' && "Your Trek Ticket"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            {currentStep === 'form' && "Register for the Footslog trek and prepare for an unforgettable journey"}
            {currentStep === 'payment' && "Just one more step to secure your spot on this amazing adventure"}
            {currentStep === 'ticket' && "Your ticket has been generated. We can't wait to see you on the trek!"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl rounded-xl bg-[#243420]/80 backdrop-blur-sm p-6 shadow-xl border border-[#4A6D33]/30 md:p-8"
        >
          <div className="mb-8 flex items-center justify-center">
            <div className="h-1 flex-1 bg-[#4A6D33]"></div>
            <div className="mx-4 text-center font-display text-xl font-bold text-[#D4A72C]">
              {currentStep === 'form' && "Registration Form"}
              {currentStep === 'payment' && "Payment Details"}
              {currentStep === 'ticket' && "E-Ticket"}
            </div>
            <div className="h-1 flex-1 bg-[#4A6D33]"></div>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="mb-6">
                      <h3 className="text-[#D4A72C] font-medium mb-4 border-b border-[#4A6D33]/30 pb-2">Personal Information</h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Age</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your age"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 mt-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your phone number"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2 mt-6">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                    <SelectValue placeholder="Select your gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="tShirtSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">T-Shirt Size</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                    <SelectValue placeholder="Select your t-shirt size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                  <SelectItem value="XS">XS</SelectItem>
                                  <SelectItem value="S">S</SelectItem>
                                  <SelectItem value="M">M</SelectItem>
                                  <SelectItem value="L">L</SelectItem>
                                  <SelectItem value="XL">XL</SelectItem>
                                  <SelectItem value="XXL">XXL</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Trek Experience Section */}
                    <div className="mb-6">
                      <h3 className="text-[#D4A72C] font-medium mb-4 border-b border-[#4A6D33]/30 pb-2">Trek Fitness & Experience</h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fitnessLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Fitness Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                    <SelectValue placeholder="Select your fitness level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                  <SelectItem value="sedentary">Sedentary (little exercise)</SelectItem>
                                  <SelectItem value="light">Light activity (1-3 days/week)</SelectItem>
                                  <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                  <SelectItem value="active">Very active (6-7 days/week)</SelectItem>
                                  <SelectItem value="athletic">Athletic (twice daily)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="trekExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Trekking Experience</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                    <SelectValue placeholder="Select your experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                  <SelectItem value="beginner">Beginner (First time trekker)</SelectItem>
                                  <SelectItem value="novice">Novice (1-2 previous treks)</SelectItem>
                                  <SelectItem value="intermediate">Intermediate (3-5 previous treks)</SelectItem>
                                  <SelectItem value="experienced">Experienced (6+ previous treks)</SelectItem>
                                  <SelectItem value="expert">Expert (Regular trekker)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2 mt-6">
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Height (cm)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your height in cm"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Weight (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your weight in kg"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="mb-6">
                      <h3 className="text-[#D4A72C] font-medium mb-4 border-b border-[#4A6D33]/30 pb-2">Emergency Contact</h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="emergencyContact.name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Contact Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Emergency contact's name"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="emergencyContact.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Contact Phone</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Emergency contact's phone"
                                  {...field}
                                  className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="emergencyContact.relation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Relationship</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                    <SelectValue placeholder="Select relationship" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                  <SelectItem value="parent">Parent</SelectItem>
                                  <SelectItem value="spouse">Spouse</SelectItem>
                                  <SelectItem value="sibling">Sibling</SelectItem>
                                  <SelectItem value="relative">Other Relative</SelectItem>
                                  <SelectItem value="friend">Friend</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Health & Preferences Section */}
                    <div className="mb-6">
                      <h3 className="text-[#D4A72C] font-medium mb-4 border-b border-[#4A6D33]/30 pb-2">Health & Preferences</h3>

                      <FormField
                        control={form.control}
                        name="medicalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#E5E1D6]">Medical Information</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please mention any medical conditions, allergies, medications, or special requirements"
                                {...field}
                                className="min-h-[100px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                              />
                            </FormControl>
                            <FormDescription className="text-[#8B9D7D]">
                              This information helps us ensure your safety during the trek.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="dietaryRestrictions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Dietary Restrictions</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please mention any dietary requirements or restrictions"
                                  {...field}
                                  className="min-h-[80px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormDescription className="text-[#8B9D7D]">
                                This helps us prepare appropriate meal options during the trek.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="equipmentNeeds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Equipment Needs</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="List any equipment you need to borrow or rent for the trek"
                                  {...field}
                                  className="min-h-[80px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormDescription className="text-[#8B9D7D]">
                                We can provide limited equipment for participants who need it.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-6">
                      <h3 className="text-[#D4A72C] font-medium mb-4 border-b border-[#4A6D33]/30 pb-2">Additional Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="howHeard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#E5E1D6]">How did you hear about Footslog?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus:ring-[#D4A72C]">
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#1A2614] text-[#E5E1D6]">
                                <SelectItem value="social_media">Social Media</SelectItem>
                                <SelectItem value="friends">Friends/Family</SelectItem>
                                <SelectItem value="college">College/Campus</SelectItem>
                                <SelectItem value="previous_event">Previous Rotaract Events</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-6">
                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#E5E1D6]">Special Requests</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Any special requests or questions about the trek?"
                                  {...field}
                                  className="min-h-[80px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow border border-[#4A6D33]/30 bg-[#1A2614]/30">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-[#D4A72C] data-[state=checked]:bg-[#D4A72C] data-[state=checked]:text-[#0F1A0A]"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[#E5E1D6]">
                              I agree to the{" "}
                              <a href="#" className="text-[#D4A72C] underline hover:text-[#C69A28]">
                                terms and conditions
                              </a>{" "}
                              and acknowledge the risks associated with trekking activities. I confirm that I am physically fit to participate in this trek and have provided accurate information.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D4A72C] text-[#0F1A0A] hover:bg-[#C69A28] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Register for Trek"
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PaymentComponent />
              </motion.div>
            )}

            {currentStep === 'ticket' && (
              <motion.div
                key="ticket"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TicketComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
