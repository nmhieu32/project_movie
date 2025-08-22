import { Clock, Film, Mail, MapPin, MessageCircle, Phone, Send, Star } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <MessageCircle className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Ready to experience the magic? Get in touch with our team and let us help 
            you plan your perfect movie night.
          </p>
          <div className="flex items-center justify-center">
            <Film className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">We're Here to Help 24/7</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
              Get In Touch
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Have questions about showtimes, bookings, or special events? Our friendly team 
              is always ready to assist you. Reach out through any of these convenient methods.
            </p>

            <div className="space-y-8">
              <div className="group flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                  <p className="text-gray-400 mb-3">Speak directly with our customer service team</p>
                  <div className="space-y-1">
                    <p className="text-green-400 font-semibold text-lg">+1 (555) 123-CINE</p>
                    <p className="text-gray-500 text-sm">Available 24/7 for bookings and support</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
                  <p className="text-gray-400 mb-3">Send us a message and we'll get back to you</p>
                  <div className="space-y-1">
                    <p className="text-blue-400 font-semibold text-lg">info@cinemax.com</p>
                    <p className="text-gray-500 text-sm">Response within 2 hours during business hours</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="group flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-400 mb-3">Come see us at our flagship location</p>
                  <div className="space-y-1">
                    <p className="text-purple-400 font-semibold text-lg">123 Cinema Boulevard</p>
                    <p className="text-gray-300">Downtown Entertainment District</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="group flex items-start space-x-6 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Operating Hours</h3>
                  <p className="text-gray-400 mb-3">We're open every day of the week</p>
                  <div className="space-y-1">
                    <p className="text-yellow-400 font-semibold">Monday - Thursday: 10:00 AM - 11:00 PM</p>
                    <p className="text-yellow-400 font-semibold">Friday - Sunday: 10:00 AM - 1:00 AM</p>
                    <p className="text-gray-500 text-sm">Box office opens 30 minutes before first show</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-8 border border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              
              <div className="relative">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
                  Send us a Message
                </h3>
                <p className="text-gray-400 mb-8">
                  Have a specific question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="john.doe@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Subject</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300">
                      <option>General Inquiry</option>
                      <option>Booking Support</option>
                      <option>Technical Issue</option>
                      <option>Feedback</option>
                      <option>Group Bookings</option>
                      <option>Special Events</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button 
                    type="button"
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl p-12 border border-gray-700 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          
          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
                Quick Information
              </h2>
              <p className="text-gray-400 text-lg">Everything you need to know at a glance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customer Rating</h3>
                <p className="text-3xl font-bold text-green-400 mb-2">4.9/5</p>
                <p className="text-gray-400">Based on 12,000+ reviews</p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Response Time</h3>
                <p className="text-3xl font-bold text-blue-400 mb-2"> 2hrs</p>
                <p className="text-gray-400">Average email response time</p>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Support Channels</h3>
                <p className="text-3xl font-bold text-purple-400 mb-2">24/7</p>
                <p className="text-gray-400">Always here when you need us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
