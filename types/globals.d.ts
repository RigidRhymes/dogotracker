declare global {
    type User = {
    id: string;
    name: string;
    email: string;
};

type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;

};

type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    };

type SignInFormData ={
    email: string;
    password: string;
}
type CountrySelectProps = {
    name: string;
    label: string;
    control: Control;
    error?: FieldError;
    required?: boolean;
}

type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
}
}

export {}