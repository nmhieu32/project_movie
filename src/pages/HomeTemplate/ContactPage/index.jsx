export default function ContactPage() {
  return (
    <section className="pt-24 pb-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Contact Us</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-center">
          Have questions or need help with booking your movie tickets?  
          Feel free to reach out to us anytime. Our support team is always here for you!
        </p>

        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border rounded-lg"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
