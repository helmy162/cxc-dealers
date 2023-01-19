

export default function ListItem({ heading, value, isSpecs = true}) {


let libasis = isSpecs ? "19%" : "49%";
let headingbasis = isSpecs ? "100%" : "50%";

return (
    <li
    className={`flex flex-wrap items-center justify-between basis-[${libasis}] border-[1px] rounded-md px-[16px] py-[10px] min-w-[100%] sm:min-w-0 mb-[10px]`}
    >
    <div className={`flex font-normal text-[#545252] basis-[${headingbasis}] text-[14px]`}>
        {heading}
    </div>
    {!isSpecs && (
        <div className='flex font-semibold justify-end basis-[50%] text-[#5AC35A] text-[14px] text-right'>
        {value}
        </div>
    )}
    </li>
);
}