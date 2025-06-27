import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, type SubmitHandler} from "react-hook-form"
import {z} from "zod"




const schema = z.object({
  name: z.string().min(7, { message: "Name must be at least 7 characters" }),
  cardNumber: z.string().min(16, { message: "Card Number must be at least 14 digits" }),
  month: z.string().min(2, { message: "Month is required" }),
  years: z.string().min(2, { message: "Year is required" }),
  cvc: z.string().min(3, { message: "CVC must be at least 3 digits" }),
});


type FormFields = z.infer<typeof schema>;


function App() {
const {register , handleSubmit , formState:{errors , isSubmitting}} = useForm<FormFields>({resolver:zodResolver(schema)})

const onSubmit: SubmitHandler<FormFields> = (data) =>{
  
  console.log(data);

}

  return (
    <div className="flex justify-center">
      <div className="absolute left-0 top-0 bg-[url('/images/bg-main-desktop.png')] w-[35%] h-[100vh] bg-no-repeat bg-cover z-0 "></div>
      <div className="border-2 w-[80%] h-screen relative z-10 flex">
        <div className="w-[50%] h-screen flex flex-col items-start justify-center gap-8 ">
          <div className="relative w-[80%] h-[35%]  z-10 rounded-[.6rem] overflow-hidden">
            <div className=" relative z-20 w-full h-full"></div>
            <img
              src="/images/bg-card-front.png"
              className="absolute left-0 top-0 z-0 w-full h-full object-cover"
            />
          </div>

          <img src="/images/bg-card-back.png" className="ml-15" />
        </div>
        <div className="w-[50%] h-screen  flex  items-center justify-center ">
          <form className="flex flex-col gap-6 items-start  w-[80%] " onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col  w-full gap-2 ">
              CARDHOLDER NAME
              <input
                type="text"
                {...register("name")}
                placeholder="e.g. Jane Appleseed"
                className="border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] focus:border-[#9ca3af] outline-none "
              />
              {errors.name && <span className="text-[.8rem] text-red-500">{errors.name.message}</span>}
            </label>
            <label className="flex flex-col w-full gap-2">
              CARD NUMBER
              <input
                type="number"
                {...register("cardNumber")}
                placeholder="e.g. 1234 5678 9123 0000"
                className="border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] focus:border-[#9ca3af] outline-none"
              />
              {errors.cardNumber && <span className="text-[.8rem] text-red-500">{errors.cardNumber.message}</span>}
            </label>
            <div className="flex items-center  w-full gap-5  ">
              <label className="flex flex-col  w-[100%] gap-2  ">
                <p>EXP. DATE (MM/YY)</p>
                <div className="flex gap-4">
                  <input
                    type="number"
                    {...register("month")}
                    placeholder="MM"
                    className="border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none"
                  />
                  <input type="number" placeholder="YY" 
                  {...register("years")}
                     className="border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] w-[50%] focus:border-[#9ca3af] outline-none"
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
                <input type="text" {...register("cvc")} placeholder="e.g. 123" className="border-[.1rem] border-[#dedde3] h-11 p-4 rounded-[.4rem] w-[100%] focus:border-[#9ca3af] outline-none"  />
                              {errors.cvc && <span className="text-[.8rem] text-red-500">{errors.cvc.message}</span>}

              </label>
            </div>
 
            <button disabled={isSubmitting} className="bg-[#231336] text-white w-full flex items-center justify-center h-11 p-4 rounded-[.4rem]">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

