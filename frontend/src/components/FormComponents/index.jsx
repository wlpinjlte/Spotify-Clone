export const Input=(props)=>(<input {...props} className="p-3 rounded-md focus:outline-none border border-neutral-700 sm:w-96 text-neutral-300 placeholder:text-neutral-400 file:border-0 file:bg-transparent file:text-neutral-400" style={{backgroundColor:"#1e1e1e"}}/>)

export const Label=(props)=>(<label className="text-neutral-400 my-2">
    {props.children}
</label>)

export const Link=(props)=>(<label {...props} className="text-neutral-400 underline text-center hover:text-neutral-300 cursor-pointer">
    {props.children}
</label>)