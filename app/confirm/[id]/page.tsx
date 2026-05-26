import ClosingButton from "@/app/components/closingbutton";

export default async function Close({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div
        className="w-full max-w-md md:max-w-lg lg:max-w-xl 
        p-6 font-serif font-bold shadow-lg rounded-xl 
        bg-gray-100 text-center"
      >
        <h1 className="mb-6 text-lg md:text-xl">
          Please click the button below to submit if the blood request is completed.
        </h1>
        <ClosingButton id={id} />
      </div>
    </div>
  );
}
