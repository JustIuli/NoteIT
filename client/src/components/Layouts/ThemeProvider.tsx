import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';
import {ReactNode} from "react";
import {readLocalStorageValue} from "@mantine/hooks";
const ThemeProvider = ({children}:{children:ReactNode}) => {

    const selectedFont = readLocalStorageValue({ key: 'selectedFont' });
    const theme = createTheme({
        fontFamily: `${selectedFont}, sans-serif`,
        fontFamilyMonospace: `${selectedFont}, sans-serif`,
        headings: { fontFamily: `${selectedFont}, sans-serif` },

    });
    return (<MantineProvider theme={theme}>
            {children}
            <ColorSchemeScript />
        </MantineProvider>
    );
};

export default ThemeProvider;