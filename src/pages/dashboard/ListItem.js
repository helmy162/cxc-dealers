

export default function CarPDF({ heading, value }) {


return(

    <li className="flex px-[22px] py-[30px] basis-[50%] sm:basis-[25%]">
        <div>
            <h3 className="font-normal text-[12px] sm:text-[14px] text-[rgb(123,123,123)] mb-1">
                {heading}
            </h3>
            <p className="font-medium text-[13px] sm:text-[16px]">
                {value}
            </p>
        </div> 
    </li>

)
}