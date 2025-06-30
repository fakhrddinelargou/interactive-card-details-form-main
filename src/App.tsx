import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, type SubmitHandler} from "react-hook-form"
import {z} from "zod"
import { useInfoStore } from "./UseInfoStore";
import { useState } from "react";







const schema = z.object({
  name: z.string()
    .min(7, { message: "Name must be at least 7 characters" }),

cardNumber: z.string()
.length(16, { message: "Card number must be exactly 16 digits" })
  .refine(val => /^\d+$/.test(val), { message: "Card number must be numbers only" }),

  month: z.number()
.min(1 , {message :"Can't be blank"})
.max(12 , {message :"Can't be blank"}),


  years: z.number()
.min(25 , {message :"Can't be blank"})
.max(50 , {message :"Can't be blank"}),

  cvc: z.number()
.min(100 , {message :"Can't be blank"})
.max(999 , {message :"Can't be blank"}),
});



type FormFields = z.infer<typeof schema>;


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
const {register ,reset, handleSubmit, watch  , formState:{errors , isSubmitting}} = useForm<FormFields>({resolver:zodResolver(schema)})
const {updateName , updateCardNumber , updateMonth , updateYears , updateCvc} = useInfoStore()
const onSubmit: SubmitHandler<FormFields> = (data) =>{
  // console.log(data);
  updateName(data.name)
  updateCardNumber(data.cardNumber)
  updateMonth(data.month)
  updateYears(data.years)
  updateCvc(data.cvc)
  console.log({name : data.name ,cart :  data.cardNumber , month :  data.month , year: data.years , cvc : data.cvc});
  setIsSubmitted(true)
  reset()
  
  
}

console.log(isSubmitted);





const watchName = watch("name");
const watchCardNumber = watch("cardNumber");
const watchMonth = watch("month");
const watchYears = watch("years");
const watchCvc = watch("cvc");
  

  return (
    <div className="flex justify-center">
      <div className="absolute left-0 top-0 bg-[url('/images/bg-main-desktop.png')] w-[35%] h-[100vh] bg-no-repeat bg-cover z-0 "></div>
      <div className=" w-[80%] h-screen relative  flex">
        <div className=" w-[50%] h-screen flex flex-col items-start justify-center gap-8 ">
          <div className="relative  inline-block  rounded-[.6rem] overflow-hidden">
            <div className="absolute px-8 w-full h-full top-0 left-0 flex flex-col ">
              <div className=" w-full h-[50%]  pt-8 "><img src="/images/card-logo.svg"  /></div>
               <div className="  w-full h-[50%] flex flex-col justify-center  gap-3 text-white ">
<span className="text-3xl ">
  {(watchCardNumber ? watchCardNumber.toString().replace(/(.{4})/g, "$1 ").trim() : "0000 0000 0000 0000")}
</span>

                <div className="flex justify-between">
                  <span className="uppercase tracking-wide">{watchName || "JANE APPLESEED"}</span>
                  <span className="tracking-widest">{watchMonth < 10 ? `0${watchMonth}`  : watchMonth  || "00"}/{watchYears || "00"}</span>
                </div>
               </div>
            </div>
            <img
              src="/images/bg-card-front.png"
              className="block"
            />
          </div>

<div className=" relative   inline-block ml-13 rounded-[.6rem] overflow-hidden ">

          <img src="/images/bg-card-back.png" className=" block" />
          <div className=" absolute left-0 top-0 w-full h-full flex  items-center justify-end pr-14  ">
<span className=" text-white tracking-widest">{watchCvc || "000"}</span>
          </div>
</div>
        </div>
        <div className="  w-[50%] h-screen  flex flex-col items-center justify-center ">
          {/* <form className="flex flex-col gap-6 items-start  w-[80%] hidden " onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col  w-full gap-2 ">
              CARDHOLDER NAME
              <input
                type="text"
                maxLength={16}
                {...register("name")}
                placeholder="e.g. Jane Appleseed"
className={`border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] 
focus:border-[#9ca3af] outline-none 
${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {errors.name && <span className="text-[.8rem] text-red-500">{errors.name.message}</span>}
            </label>
            <label className="flex flex-col w-full gap-2">
              CARD NUMBER
              <input
                type="text"
                {...register("cardNumber")}
                maxLength={16}
                placeholder="e.g. 1234 5678 9123 0000"
                className={`border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] 
focus:border-[#9ca3af] outline-none 
${errors.cardNumber ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {errors.cardNumber && <span className="text-[.8rem] text-red-500">{errors.cardNumber.message}</span>}
            </label>
            <div className="flex items-center  w-full gap-5  ">
              <label className="flex flex-col  w-[100%] gap-2  ">
                <p>EXP. DATE (MM/YY)</p>
                <div className="flex gap-4">
                  <input
                    type="number"
                    {...register("month"  , {valueAsNumber:true})}
                    maxLength={2}
                    placeholder="MM"
                    className={`border-[.1rem] border-[#dedde3] appearance-none h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none ${errors.month ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                  <input type="number"  maxLength={2} placeholder="YY" 
                  {...register("years"  , {valueAsNumber:true})}
                     className={`border-[.1rem] border-[#dedde3] appearance-none h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none ${errors.years ? "border-red-500 focus:border-red-500" : ""} `}
                  />
                </div>
              {(errors.month || errors.years) && (
  <span className="text-[.8rem] text-red-500">
    {errors.month?.message || errors.years?.message}
  </span>
)}
              </label>
              <label className="flex flex-col w-[100%] gap-2 ">
                CVC
                <input type="number" {...register("cvc"  , {valueAsNumber:true})}   maxLength={3} placeholder="e.g. 123" className={`border-[.1rem] appearance-none border-[#dedde3] h-11 p-4 rounded-[.4rem] w-[100%] focus:border-[#9ca3af] outline-none ${errors.cvc ? "border-red-500 focus:border-red-500" : ""} `}  />
                              {errors.cvc && <span className="text-[.8rem]  text-red-500">{errors.cvc.message}</span>}

              </label>
            </div>
 
            <button disabled={isSubmitting} className="bg-[#231336] text-white w-full flex items-center justify-center h-11 p-4 rounded-[.4rem]">Confirm</button>
          </form> */}
          
{isSubmitted === false && (

<form className="flex flex-col gap-6 items-start  w-[80%]  " onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col  w-full gap-2 ">
              CARDHOLDER NAME
              <input
                type="text"
                maxLength={16}
                {...register("name")}
                placeholder="e.g. Jane Appleseed"
className={`border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] 
focus:border-[#9ca3af] outline-none 
${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {errors.name && <span className="text-[.8rem] text-red-500">{errors.name.message}</span>}
            </label>
            <label className="flex flex-col w-full gap-2">
              CARD NUMBER
              <input
                type="text"
                {...register("cardNumber")}
                maxLength={16}
                placeholder="e.g. 1234 5678 9123 0000"
                className={`border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] 
focus:border-[#9ca3af] outline-none 
${errors.cardNumber ? "border-red-500 focus:border-red-500" : ""}`}
              />
              {errors.cardNumber && <span className="text-[.8rem] text-red-500">{errors.cardNumber.message}</span>}
            </label>
            <div className="flex items-center  w-full gap-5  ">
              <label className="flex flex-col  w-[100%] gap-2  ">
                <p>EXP. DATE (MM/YY)</p>
                <div className="flex gap-4">
                  <input
                    type="number"
                    {...register("month"  , {valueAsNumber:true})}
                    maxLength={2}
                    placeholder="MM"
                    className={`border-[.1rem] border-[#dedde3] appearance-none h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none ${errors.month ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                  <input type="number"  maxLength={2} placeholder="YY" 
                  {...register("years"  , {valueAsNumber:true})}
                     className={`border-[.1rem] border-[#dedde3] appearance-none h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none ${errors.years ? "border-red-500 focus:border-red-500" : ""} `}
                  />
                </div>
              {(errors.month || errors.years) && (
  <span className="text-[.8rem] text-red-500">
    {errors.month?.message || errors.years?.message}
  </span>
)}
              </label>
              <label className="flex flex-col w-[100%] gap-2 ">
                CVC
                <input type="number" {...register("cvc"  , {valueAsNumber:true})}   maxLength={3} placeholder="e.g. 123" className={`border-[.1rem] appearance-none border-[#dedde3] h-11 p-4 rounded-[.4rem] w-[100%] focus:border-[#9ca3af] outline-none ${errors.cvc ? "border-red-500 focus:border-red-500" : ""} `}  />
                              {errors.cvc && <span className="text-[.8rem]  text-red-500">{errors.cvc.message}</span>}

              </label>
            </div>
 
            <button disabled={isSubmitting} className="bg-[#231336] text-white w-full flex items-center justify-center h-11 p-4 rounded-[.4rem]">Confirm</button>
          </form>
)}



          {isSubmitted === true &&   ( 


            <div className="w-[50%] h-screen  flex flex-col  items-center justify-center ">
            <img src="/images/icon-complete.svg" className=""  />
            <span className="pt-6 pb-2 text-2xl text=[231336] font-bold tracking-widest  ">THANK YOU!</span>
            <p className="text-[#dedde3] pb-8">We've added your card details</p>
            <button onClick={()=> setIsSubmitted(false)}  className="bg-[#231336] text-white w-full flex items-center justify-center h-11 p-4 rounded-[.4rem]">Confirm</button>

          </div>
  )}
        </div>
      </div>
    </div>
  );
}

export default App;

