import prisma from "@/db";
import Navbutton from "./components/button";
import Homebutton from "./components/homebutton";

export default async function Home() {
  const donorcount = await prisma.user.count();

  const activecount = await prisma.user.count({
    where: { isactive: true },
  });

  const donationcount = await prisma.post.count({
    where: { issolved: true },
  });

  const averageresponse = await prisma.interaction.count({
    where: { 
      status: "pending" ,
      
     },
  });

  const finalavg =
    donationcount > 0
      ? (averageresponse / donationcount).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden font-serif ">
     
      <header className="w-full bg-red-500 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-10 py-6 gap-4">
          
          <h1 className="  text-center md:text-left text-2xl sm:text-3xl md:text-5xl font-serif text-white leading-snug">
            Blood Donation Application
          </h1>

          <div className="flex items-center gap-3">
            <Homebutton />
           
          </div>
        </div>
      </header>

    
      <main className="w-full px-4 sm:px-6 lg:px-10 py-8 md:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          
          <section className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-red-600">
              Why I Started?
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed tracking-wide text-base sm:text-lg md:text-xl font-serif">
              I created this application to connect people willing to donate
              blood with those who urgently need help. Many times, patients
              struggle to find available donors, while donors also find it
              difficult to reach the right people at the right time.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed tracking-wide text-base sm:text-lg md:text-xl font-serif">
              This platform was built to reduce that gap — making the process
              faster, simpler, and more human. Even a single connection here
              can help save a life.
            </p>
          </section>

       
          <section className="bg-red-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-red-600 mb-8">
              Website Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Total Donors
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-red-500 mt-2">
                  {donorcount}
                </h3>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Active Donors
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-red-500 mt-2">
                  {activecount}
                </h3>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Successful Donations
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-red-500 mt-2">
                  {donationcount}
                </h3>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  Avg Response Rate
                </p>
                <h3 className="text-3xl sm:text-4xl font-bold text-red-500 mt-2">
                  {finalavg}
                </h3>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}