import SettingSection from "./SettingSection";
import { useSettings } from "../managers/SettingsContext";
import {useEffect} from "react";


export default function SettingSectionGenerativeAI() {
    const {
        modalOption,
        setModalOption,
        getAllModel,
        getCurrentModel,
        setModel
    } = useSettings();

    useEffect(() => {
        //console.log(getAllModel());
    }, []);

    const handleOptionClick = (id) => {
        setModel(id);
    }

    return (
        <SettingSection title={"AI tạo sinh"}>
            <div className="p-2 grid grid-cols-1 gap-1">
                <div className="flex items-center w-full gap-4">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 w-32">Chọn Model</div>
                        <ul tabIndex={0}
                            className="dropdown-content text-black dark:text-white menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {
                                getAllModel().map((model) => (
                                    <li key={model.id} className="menu-item text-black dark:text-white">
                                        <button className="text-white" onClick={() => {
                                            handleOptionClick(model.model)
                                        }}>
                                            {model.key}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="grow flex">
                        <code className="grow text-black dark:text-white">
                            {getCurrentModel()}
                        </code>
                    </div>
                </div>
            </div>
        </SettingSection>
    );
}
