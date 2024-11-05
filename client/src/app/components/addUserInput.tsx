import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormValues {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface Iinput {
  level: string;
  levelFor: string;
  placeHolder: string;
  type: string;
  register: UseFormRegister<FormValues>;
  name: keyof FormValues; 
}

const AddUserInput: React.FC<Iinput> = ({
  level,
  levelFor,
  placeHolder,
  type,
  register,
  name,
}) => {
  return (
    <div className="flex flex-col gap-3 max-w-[300px] h-[95px]">
      <label className="font-semibold text-levelFont" htmlFor={levelFor}>
        {level}
      </label>
      <input
        {...register(name)}
        className="rounded-md h-[64px] border border-borderColor px-5"
        placeholder={placeHolder}
        type={type}
        id={levelFor}
      />
    </div>
  );
};

export default AddUserInput;
