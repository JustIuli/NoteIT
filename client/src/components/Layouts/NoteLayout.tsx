import { ReactElement} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const NoteLayout = ({ children }: { children: ReactElement }) => {

    return (
        <div style={{ display: "flex", overflow: "hidden" }}>
                {children}
            <ToastContainer />
        </div>
    );
};

export default NoteLayout;
