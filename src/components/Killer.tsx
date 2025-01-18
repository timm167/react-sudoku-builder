// --- React and Necessary Hooks ---
import React, { useState, FormEvent, useEffect } from 'react';

// --- Context ---
import { useAppContext } from '../appContext';

// --- Styles ---
import './css/Killer.css';

// --- Utility Functions ---
import { createBox } from './utils/createBox';
import { checkBoxSumIsValid, declareBoxSum } from './utils/boxSumLogic';

// --- Killer Component ---
export default function Killer() {
    
    // --- State Management ---
    const [boxCounter, setBoxCounter] = useState(0);
    const { grid, state, stateSetters, gridSetters, buttonInputRefs } = useAppContext();

    // --- Side Effects ---
    // Focus on the input field when sum input is requested
    useEffect(() => {
        if (state.isRequestingSum) {
            buttonInputRefs.enterSumInput.current.focus();
        }
    }, [state.isRequestingSum]);

    // --- Button Handlers ---
    // Handle Delete Box button click
    const handleDeleteBoxClick = () => {
        gridSetters.clearGridIsHavingBoxCreated();
        stateSetters.setCreatingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setDeletingBox(!state.deletingBox);
    }

    // Handle Set Box Sum button click
    const handleapplyBoxSumClick = () => {
        gridSetters.clearGridIsHavingBoxCreated();
        stateSetters.setCreatingBox(false);
        stateSetters.setDeletingBox(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setSettingBoxTotal(!state.settingBoxTotal);
    }

    // Handle Create Box button click
    const handleCreateBoxClick = () => {
        stateSetters.setDeletingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        if (state.creatingBox && state.boxBeingCreated.length !== 0) {
            createBox(state, stateSetters, gridSetters, boxCounter, setBoxCounter);
        }
        if (!state.creatingBox) {
            stateSetters.setCreatingBox(true);
        }
        if (state.creatingBox && state.boxBeingCreated.length === 0) {
            stateSetters.setCreatingBox(false);
        }
    }

    // Handle Toggle Color button click
    const handleToggleColorClick = () => {
        stateSetters.cycleCurrentColorsArray();
    }

    // Handle form submission for box sum declaration
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        gridSetters.clearGridIsHavingBoxCreated();
        if (!checkBoxSumIsValid(grid)) {
            alert('Box sum is incorrect');
            return;
        }
        stateSetters.setBoxSumIsIncorrect(false);
        const sumInput = (e.target as HTMLFormElement).elements.namedItem('sumInput') as HTMLInputElement;
        const sumValue = parseInt(sumInput.value, 10);
        declareBoxSum(sumValue, state, stateSetters, gridSetters);
        sumInput.value = '';
    };

    return (
        <>
            {/* Sum Input Form */}
            <div className={`${state.isRequestingSum ? '' : 'hidden'} submit-holder`}>
                <form onSubmit={handleSubmit} className='submit-holder'>
                    <input ref={buttonInputRefs.enterSumInput} type="number" name="sumInput" id="sumInput" className='form-input' max={405}/>
                    <button ref={buttonInputRefs.enterSumButton} type="submit" className='submit-button'>Enter</button>
                </form>
            </div>

            {/* Killer Mode Buttons */}
            <div className='killer-buttons'>
                <div className={`inner-killer-buttons ${state.killerMode ? '' : 'hidden'}`}>
                    {/* Delete Box Button */}
                    <button 
                        className={`killer-button delete-box-button ${state.deletingBox ? 'highlight-delete-button' : ''}`}
                        onClick={handleDeleteBoxClick}
                    >
                        {`${state.deletingBox ? 'Select a Box' : 'Delete Box'}`}
                    </button>

                    {/* Set Box Sum Button */}
                    <button 
                        className={`killer-button set-box-total-button ${state.settingBoxTotal ? 'highlight-set-button' : ''}`}
                        onClick={handleapplyBoxSumClick}
                    >
                        {`${state.settingBoxTotal ?  'Select a Box' : 'Set Box Sum'}`}
                    </button>

                    {/* Create Box Button */}
                    <button 
                        ref={buttonInputRefs.newBoxButton} 
                        className={`killer-button create-box-button ${state.creatingBox ? 'highlight-create-button' : ''}`}
                        onClick={handleCreateBoxClick}
                    >
                        {`${state.creatingBox ? 'Place Box' : 'New Box'}`} <span className='key-indicator'>(Cmd+C)</span>
                    </button>

                    {/* Toggle Color Button */}
                    <button 
                        ref={buttonInputRefs.toggleColorButton}
                        className={`killer-button toggle-color-button ${state.currentColorsArray[state.currentColorsArray.length - 1]}`} 
                        onClick={handleToggleColorClick}
                    >
                        Toggle color <span className='key-indicator'>(Tab)</span>
                    </button>
                </div>
            </div>
        </>
    );
}
