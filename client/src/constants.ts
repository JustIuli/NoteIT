import {IconCircleDotted, IconFileCode, IconFlame, IconReceiptOff} from "@tabler/icons-react";
import {ToastOptions} from "react-toastify";

export const toastOptions:ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};
export const features = [
    {
        icon: IconReceiptOff,
        title: 'Free and open source',
        description: 'All packages are published under MIT license, you can use Mantine in any project',
    },
    {
        icon: IconFileCode,
        title: 'TypeScript based',
        description: 'Build type safe applications, all components and hooks export types',
    },
    {
        icon: IconCircleDotted,
        title: 'No annoying focus ring',
        description:
            'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
    },
    {
        icon: IconFlame,
        title: 'Flexible',
        description:
            'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
    },
];

export const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Store' },
    { link: '#', label: 'Careers' },
];