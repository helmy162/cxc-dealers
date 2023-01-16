

export default function CarPDF({ heading, value }) {


return(

    <li className='flex flex-wrap items-center justify-between basis-[49%] border-[1px] rounded-md px-[16px] py-[10px] min-w-[100%] sm:min-w-0 mb-[10px] '>
        <div className='flex font-normal text-[#545252] basis-[50%] text-[14px]'>
            {heading}
        </div>
        <div className='flex font-semibold justify-end basis-[50%] text-[#5AC35A] text-[14px]'>
            {value}
        </div>
    </li>

)
}