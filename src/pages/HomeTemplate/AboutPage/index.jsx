export default function AboutPage() {
  return (
    <section className="bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="Movie Ticket"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About Movie Ticket
          </h2>
          <p className="text-gray-300 mb-4">
            Movie Ticket is your ultimate destination for booking movie seats
            online. With our platform, you can browse the latest releases,
            select your preferred seats, and enjoy a seamless ticket purchasing
            experience—all from the comfort of your home.
          </p>
          <p className="text-gray-300 mb-4">
            Our mission is to make movie-going effortless and exciting. Whether
            you're planning a weekend outing with friends or a special date
            night, we have you covered with real-time seat availability, secure
            payments, and instant booking confirmations.
          </p>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>Wide selection of movies and showtimes</li>
            <li>Secure and easy payment process</li>
            <li>Real-time seat selection</li>
            <li>Accessible on all devices</li>
          </ul>
          <p className="text-gray-300">
            Join thousands of satisfied movie-goers and make your next cinema
            trip unforgettable with Movie Ticket.
          </p>
        </div>
      </div>
    </section>
  );
}
