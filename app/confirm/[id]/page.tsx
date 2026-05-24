import ClosingButton from "@/app1/app/components/closingbutton";
export default async function Close({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ unwrap the Promise

  return (
    <>
      <div className=" mt-50  text-center ml-100 border-1 w-140 p-4 font-serif font-bold shadow-lg rounded-xl 
      bg-gray-100 ">
        <h1 className=" mb-10 text-xl ">Please Click the buttom submit ,If the blood request is completed.</h1>
      <ClosingButton id={id} />
      </div>
    </>
  );
}
