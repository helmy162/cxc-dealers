import Iconify from '../../components/iconify';

export default function ListItem({ heading, value, isSpecs = true}) {


let libasis = isSpecs ? "19%" : "49%";
let headingbasis = isSpecs ? "100%" : "50%";

value == '0'? value= "False" : value = value;
value == '1'? value= "True" : value = value;

return (
    <li
    className={`flex flex-wrap items-center justify-between border-[1px] rounded-md px-[16px] py-[10px] min-w-[100%] sm:min-w-0 mb-[10px] `}
    style={{ flexBasis: libasis}}
    >
    <div className={`flex font-normal text-[#545252] text-[14px] items-center gap-1`} style={{flexBasis: headingbasis}}>
        {isSpecs?
             <Iconify icon="eva:star-outline" width={16} />
             :
             null
        }
        {heading}
    </div>
    {!isSpecs && (
        <div className='flex font-semibold justify-end basis-[50%] text-[#AFAFAF] text-[14px] text-right' 
            style={
            value == 'Bad' || value == 'False' ? {color:'#FD4353'}: 
            value == "No Visible Fault" || value == 'True' || value == 'Available' ? {color:'#5AC35A'} 
            : {} }
        >
            
        {value}
        </div>
    )}
    </li>
);
}