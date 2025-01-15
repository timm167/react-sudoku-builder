import React from 'react';
import { useAppContext } from '../appContext';
import './css/Killer.css';

export default function Killer({}) {

    const { state, stateSetters, buttonInputRefs } = useAppContext();

    // Four functions below just handle the various buttons in the killer mode
    // Currently they just update state but they will need to do more later

    const handleDeleteBoxClick = () => {
        stateSetters.setDeletingBox(!state.deletingBox);
    }

    const handleSetBoxClick = () => {
        stateSetters.setSettingBoxTotal(!state.settingBoxTotal);
    }

    const handleCreateBoxClick = () => {
        stateSetters.setCreatingBox(!state.creatingBox);
    }

    const handleTogglecolorClick = () => {
        stateSetters.setCurrentcolorsArray()
    }

    return (
        <div className='killer-buttons'>
            <div className={`inner-killer-buttons ${state.killerMode ? '' : 'hidden'} `}>
                <button 
                    className="killer-button delete-box-button" 
                    onClick={handleDeleteBoxClick}
                >
                    {`${state.deletingBox ? 'Select a Box' : 'Delete Box'}`}
                </button>
                <button 
                    className="killer-button set-box-total-button" 
                    onClick={handleSetBoxClick}
                >
                    {`${state.settingBoxTotal ? 'Set Box Sum' : 'Select a Box'}`}
                </button>
                <button className="killer-button create-box-button" onClick={handleCreateBoxClick}>
                    {`${state.creatingBox ? 'Place Box' : 'New Box'}`} <span>(Enter)</span>
                </button>
                <button 
                    className={`killer-button toggle-color-button ${state.currentcolorsArray[state.currentcolorsArray.length - 1]}`} 
                    onClick={handleTogglecolorClick}
                >
                    Toggle color
                </button>
            </div>
        </div>
    )
}