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
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  age: z.string().min(1, { message: "Age is required." }),
  gender: z.string().min(1, { message: "Please select your gender." }),
  fitnessLevel: z.string().min(1, { message: "Please select your fitness level." }),
  trekExperience: z.string().min(1, { message: "Please select your trekking experience." }),
  emergencyContact: z.object({
    name: z.string().min(2, { message: "Emergency contact name is required." }),
    phone: z.string().min(10, { message: "Please provide a valid emergency contact number." }),
    relation: z.string().min(1, { message: "Please specify the relationship." }),
  }),
  medicalInfo: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  tShirtSize: z.string().min(1, { message: "Please select your t-shirt size." }),
  dietaryRestrictions: z.string().optional(),
  equipmentNeeds: z.string().optional(),
  howHeard: z.string().min(1, { message: "Please tell us how you heard about us." }),
  specialRequests: z.string().optional(),
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
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      fitnessLevel: "",
      trekExperience: "beginner",
      emergencyContact: {
        name: "",
        phone: "",
        relation: "",
      },
      medicalInfo: "",
      height: "",
      weight: "",
      tShirtSize: "",
      dietaryRestrictions: "",
      equipmentNeeds: "",
      howHeard: "",
      specialRequests: "",
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
                You've successfully registered for the Footslog trek. Check your email for confirmation and further details.
              </p>
              <p className="mb-6 text-sm text-[#8B9D7D]">
                Our team will contact you within 24 hours with payment details and additional information about the trek.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => setIsSuccess(false)} className="bg-[#D4A72C] text-[#0F1A0A] hover:bg-[#C69A28]">
                  Register Another Person
                </Button>
                <Button asChild variant="outline" className="border-[#4A6D33] text-[#E5E1D6] hover:bg-[#1A2614]/50">
                  <a href="#itinerary">View Trek Itinerary</a>
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          )}
        </motion.div>
      </div>
    </section>
  )
}
