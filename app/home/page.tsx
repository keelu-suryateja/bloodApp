import prisma from "@/db";
import Appbar from "../components/appbar";

export default async function Home() {
  const data = await prisma.user.findMany({
    take:50,
  });

  return (
    <div className="static">
      <Appbar />
      
    <div >
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {data.map((user) => (
          <div
            key={user.id}
            className="mb-2 bg-red-300 sm:bg-red-300 h-24 shadow-md rounded-lg p-4 
             hover:shadow-xl hover:scale-105 
             transition-transform duration-300 ease-in-out"
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{user.username}</h2>
              {user.isactive ? <div>💚</div> : <div>❌</div>}
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600 text-xl">
                Blood Type: {user.bloodtype}
              </p>
            </div>
          </div>
        ))}
            
      </div>
    </div>
     
    </div>
  );
}
