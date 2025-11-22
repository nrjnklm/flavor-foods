import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Have a question about our menu or want to book a large catering order? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
           {/* Form */}
           <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                   <input type="text" className="w-full border-gray-300 border rounded-lg p-3 focus:ring-brand-orange focus:border-brand-orange" placeholder="Your Name" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input type="email" className="w-full border-gray-300 border rounded-lg p-3 focus:ring-brand-orange focus:border-brand-orange" placeholder="you@example.com" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                   <textarea rows={4} className="w-full border-gray-300 border rounded-lg p-3 focus:ring-brand-orange focus:border-brand-orange" placeholder="How can we help?"></textarea>
                 </div>
                 <button type="button" className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
                   Send Message
                 </button>
              </form>
           </div>

           {/* Info & Map */}
           <div className="flex flex-col space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full text-brand-orange">
                       <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 text-lg">Visit Us</h3>
                       <p className="text-gray-600 mt-1">123 Culinary Avenue,<br/>Foodie District, FD 90210</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full text-brand-orange">
                       <i className="fas fa-phone text-xl"></i>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                       <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                       <p className="text-sm text-gray-500 mt-1">Mon-Sun, 10am - 11pm</p>
                    </div>
                 </div>
              </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full text-brand-orange">
                       <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                       <p className="text-gray-600 mt-1">hello@flavorcraftfoods.com</p>
                    </div>
                 </div>
              </div>

              {/* Mock Map */}
              <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative">
                 <img src="https://picsum.photos/id/10/800/400" alt="Map Location" className="w-full h-full object-cover opacity-70 grayscale" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-gray-800 flex items-center">
                       <i className="fas fa-map-pin text-brand-red mr-2"></i> We are here
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};