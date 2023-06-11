import React from 'react';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    onInputChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled = false,
    formatPrice = false,
    required = false,
    onInputChange,
}) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onInputChange(value);
    };

    return (
        <div className="w-full relative">
            <input
                type={type}
                className="peer w-full p-4 pt-6 font-light text-gray-950 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
                onChange={handleInputChange}
            />
            <label
                htmlFor={id}
                className="absolute text-gray-950 text-md duration-150 transform -translate-y-3 -translate-x-[237px] top-8 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
