"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
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

const formSchema = z.object({
  teamName: z.string().min(2, { message: "Team name must be at least 2 characters." }),
  leaderName: z.string().min(2, { message: "Leader name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  members: z.string().min(1, { message: "Please enter team members." }),
  teamSize: z.string().min(1, { message: "Please select team size." }),
  experience: z.string(),
  dietaryRestrictions: z.string().optional(),
  emergencyContact: z.string().min(10, { message: "Please provide an emergency contact number." }),
  medicalInfo: z.string(),
  howHeard: z.string().min(1, { message: "Please tell us how you heard about us." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
})

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      email: "",
      phone: "",
      members: "",
      teamSize: "",
      experience: "beginner",
      dietaryRestrictions: "",
      emergencyContact: "",
      medicalInfo: "",
      howHeard: "",
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Trigger confetti effect on successful submission
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered for Footslog. Check your email for confirmation.",
      })
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      })
    }
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
          <h2 className="font-display text-4xl font-bold text-[#D4A72C] md:text-5xl">Join the Adventure</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Register your team for the Footslog trek and prepare for an unforgettable journey
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
            <div className="mx-4 text-center font-display text-xl font-bold text-[#D4A72C]">Registration Form</div>
            <div className="h-1 flex-1 bg-[#4A6D33]"></div>
          </div>

          {isSuccess ? (
            <div className="rounded-lg bg-[#2A3B22]/80 backdrop-blur-sm p-6 text-center border border-[#4A6D33]/30">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A72C]/20">
                <svg className="h-8 w-8 text-[#D4A72C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#D4A72C]">Registration Complete!</h3>
              <p className="mb-3 text-[#E5E1D6]">
                Your team has been registered for Footslog. Check your email for confirmation and further details.
              </p>
              <p className="mb-6 text-sm text-[#8B9D7D]">
                A team representative will contact you within 24 hours with payment details and additional information.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => setIsSuccess(false)} className="bg-[#D4A72C] text-[#0F1A0A] hover:bg-[#C69A28]">
                  Register Another Team
                </Button>
                <Button asChild variant="outline" className="border-[#4A6D33] text-[#E5E1D6] hover:bg-[#1A2614]/50">
                  <a href="#overview">Learn More About Footslog</a>
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#E5E1D6]">Team Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your team name"
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
                    name="leaderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#E5E1D6]">Team Leader Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter team leader's full name"
                            {...field}
                            className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
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
                
                <FormField
                  control={form.control}
                  name="teamSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E5E1D6]">Team Size</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2-3" className="border-[#D4A72C]" />
                            </FormControl>
                            <FormLabel className="text-[#E5E1D6] cursor-pointer">2-3 members</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="4-5" className="border-[#D4A72C]" />
                            </FormControl>
                            <FormLabel className="text-[#E5E1D6] cursor-pointer">4-5 members</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="6+" className="border-[#D4A72C]" />
                            </FormControl>
                            <FormLabel className="text-[#E5E1D6] cursor-pointer">6+ members</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E5E1D6]">Team Members</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter names of all team members (including leader)"
                          {...field}
                          className="min-h-[100px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                        />
                      </FormControl>
                      <FormDescription className="text-[#8B9D7D]">
                        Please include full names and ages of all participants.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="experience"
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
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#E5E1D6]">Emergency Contact</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Emergency contact phone number"
                            {...field}
                            className="border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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
                        This will help us prepare appropriate food options.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#E5E1D6]">Medical Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please mention any medical conditions, allergies, or special requirements"
                          {...field}
                          className="min-h-[100px] border-[#4A6D33] bg-[#1A2614]/50 text-[#E5E1D6] focus-visible:ring-[#D4A72C]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 shadow">
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
                          and acknowledge the risks associated with trekking activities.
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
                    "Register Now"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
