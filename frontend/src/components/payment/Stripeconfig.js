import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./StripePayment";
import { useDispatch } from "react-redux";

const Stripeconfig = () => {

  const dispatch=useDispatch()


  useEffect(
		() => {
			dispatch({ type: 'CHANGESHOW_REQUEST' });

			return () => {
				dispatch({ type: 'CHANGESHOW_RESET' });
			}
		},
		[ dispatch ]
	);



  const stripePromise = loadStripe(
    "pk_test_51KfIuESIMsOcUZIe5dr0Rc6WZmYKTrEzVkHBTBXAS9Isi8sTi8YFVq8MjiWFJf4W9Q4XI1Qr8at9FVp8Nyu1cIOe00SaCB6bbw"
    )
  

  // const [stripeApiKey, setStripeApiKey] = useState("");
  //    console.log(stripePromise);
  // async function getStripeApiKey() {
  //   const{ data }= await axios.get("api/v1/stripeapikey");
  //   console.log("reached");
  //   console.log(data);
  //   setStripeApiKey(data.stripeApiKey);
  //   console.log(stripeApiKey);
  // }

  return (
    <div className="mainbody">
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
 </div>
  );
};

export default Stripeconfig;
