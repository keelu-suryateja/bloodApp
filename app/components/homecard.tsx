
type userschema={
    username:String,
    bloodtype:String,
}
export default function Homecard(props:userschema){
    
    return<>
        <h1>{props.username}</h1>
        <h2>{props.bloodtype}</h2>
    </>
}