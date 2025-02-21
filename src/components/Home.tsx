"use client";
import Link from "next/link";
import { Car, MapPin, Clock, Shield, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Img1 from "../../public/Banner1.png";

export default function LandingPage() {
  const router = useRouter();

  const handleNavigate = async () => {
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="w-full py-12 md:py-24 lg:py-32 bg-emerald-600">
          <div className="ml-10 max-sm:ml-0 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className=" order-2 md:order-1 flex flex-col justify-center space-y-4 max-w-xl text-center md:text-left max-sm:items-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
                    Your Ride, Your Way
                  </h1>
                  <p className="max-w-[600px] text-soft-cream-500 md:text-xl">
                    Book a cab in seconds. Travel with comfort and safety.
                    Experience the best ride-hailing service in town.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 min-[400px]:flex-row">
                  <button
                    onClick={handleNavigate}
                    className="px-6 py-2 border-2 border-transparent text-slate-gray-800 font-semibold rounded-lg transition duration-300 ease-in-out hover:border-slate-gray-800 bg-emerald-400 hover:bg-emerald-200"
                  >
                    Book Now
                  </button>
                  <button className="text-emerald-400 hover:text-emerald-500">
                    Learn More...
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-1 mt-6 md:mt-0 animate-slide-in-right">
                <Image src={Img1} alt="LOGO" height="200" width="500" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full py-12 md:py-24 lg:py-32 bg-soft-cream-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-slate-gray-800">
                  Why Choose CABZZ?
                </h2>
                <p className="max-w-[900px] text-slate-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the perfect blend of convenience, safety, and
                  comfort with our premium cab service.
                </p>
              </div>
            </div>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
              <div className="flex flex-col items-center space-y-2 text-center group">
                <Clock className="h-12 w-12 text-emerald-500 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                <h3 className="text-xl font-bold text-slate-gray-800">
                  Quick Pickup
                </h3>
                <p className="text-sm text-slate-gray-500">
                  Average pickup time under 5 minutes
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <Shield className="h-12 w-12 text-emerald-500 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                <h3 className="text-xl font-bold text-slate-gray-800">
                  Safe Rides
                </h3>
                <p className="text-sm text-slate-gray-500">
                  Verified drivers and real-time tracking
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <MapPin className="h-12 w-12 text-emerald-500 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                <h3 className="text-xl font-bold text-slate-gray-800">
                  Wide Coverage
                </h3>
                <p className="text-sm text-slate-gray-500">
                  Available in all major cities
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center group">
                <Star className="h-12 w-12 text-emerald-500 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
                <h3 className="text-xl font-bold text-slate-gray-800">
                  Top Rated
                </h3>
                <p className="text-sm text-slate-gray-500">
                  4.8/5 average user rating
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-12 md:py-24 lg:py-32 bg-slate-gray-800 bg-gray-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-emerald-700">
                  Ready to Ride?
                </h2>
                <p className="max-w-[600px] text-soft-cream-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who trust CABZZ for
                  their daily commute.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <button
                  onClick={handleNavigate}
                  className="bg-emerald-500 text-white px-4 py-1 rounded border-2 border-emerald-600 hover:bg-emerald-400 hover:border-emerald-500 transition-all duration-300"
                >
                  Get Started
                </button>

                <p className="text-xs text-soft-cream-200">
                  By signing up, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 bg-soft-cream-200">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-4">
            <Car className="h-6 w-6 text-emerald-500" />
            <p className="text-sm leading-loose text-slate-gray-500">
              © 2024 CABZZ. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-slate-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-gray-500 hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
