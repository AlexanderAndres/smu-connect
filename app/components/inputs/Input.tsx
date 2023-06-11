import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    onInputChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled = false,
    required = false,
    onInputChange,
    register,
    errors
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onInputChange(value);
    };

    return (
        <div className="w-full relative">
            <input
                {...register(id, { required })}
                type={type}
                className={`peer w-full p-4 pt-6 font-light text-gray-950 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? 'border-red-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-red-500' : 'focus:border-black'}
                `}
                onChange={handleInputChange}
            />
            <label
                htmlFor={id}
                className={`absolute text-gray-500 text-md duration-150 transform -translate-y-3 -translate-x-[195px] top-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
                ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
