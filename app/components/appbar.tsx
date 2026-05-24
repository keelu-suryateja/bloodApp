import Dropbutton from "./dropbutton"
import Navbutton from "./button"
import Alert from "./alert"
export default function Appbar(){
    return <>
    <div className=" shadow-lg bg-gray-900 mb-3 h-24  p-8 text-white flex justify-between font-serif text-xl align-middle">
        <div className="  flex "><div className="w-96 text-center text-3xl p-1 sm:w-140 lg:w-36 lg:text-xl ">Blood App</div>
        <Alert></Alert> 
        <Dropbutton/>
        </div>
        
        <div  className=" hidden lg:block font-medium text-2xl">Together for Every Emergency</div>   
        <div className=" w-72 flex justify-between">
            <div><Navbutton props="Request"></Navbutton></div>
            <div><Navbutton  props="Profile"></Navbutton></div>
        </div>
    </div></>
}