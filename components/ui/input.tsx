import * as React from "react";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// const InputNumeric = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     const [formattedValue, setFormattedValue] = React.useState(
//       props.value ? props.value.toString().replace(/\D/g, "") : "", // Remove non-digits
//     );

//     const addCommas = (num: number) =>
//       num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Use dot as separator

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const unformattedValue = event.target.value.replace(/\D/g, ""); // Remove non-digits
//       const formattedValue = addCommas(parseFloat(unformattedValue));
//       setFormattedValue(formattedValue);
//     };

//     return (
//       <NumericFormat
//         type={type} // Assuming this is intentional
//         value={formattedValue} // Use formatted value
//         allowLeadingZeros
//         thousandSeparator="." // Use dot as separator (matches your logic)
//         decimalSeparator=","
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//           className,
//         )}
//         getInputRef={ref}
//         placeholder={props.placeholder}
//         onChange={handleChange}
//         {...props}
//       />
//     );
//   },
// );
// InputNumeric.displayName = "InputNumeric";
export { Input };
