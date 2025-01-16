import React, {useState, FormEvent, useEffect} from 'react';
import { useAppContext } from '../appContext';
import './css/Killer.css';
import { createBox } from './utils/createBox';
import { declareBoxSum } from './utils/sumBox';


export default function Killer() {
    const [boxCounter, setBoxCounter] = useState(0);
    const { grid, state, stateSetters, gridSetters, buttonInputRefs } = useAppContext();

    // Using this to focus on the input field when the button is clicked
    useEffect (() => {
        if (state.isRequestingSum){
            buttonInputRefs.enterSumInput.current.focus();
        }
    }, [state.isRequestingSum]);


    // Four functions below just handle the various buttons in the killer mode
    // Currently they just update state but they will need to do more later

    const handleDeleteBoxClick = () => {
        stateSetters.setCreatingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setDeletingBox(!state.deletingBox);
    }

    const handleSetBoxSumClick = () => {
        stateSetters.setCreatingBox(false);
        stateSetters.setDeletingBox(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setSettingBoxTotal(!state.settingBoxTotal);
    }

    const handleCreateBoxClick = () => {
        stateSetters.setDeletingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        if (state.creatingBox && state.boxBeingCreated.length !== 0) {createBox(state, stateSetters, gridSetters, boxCounter, setBoxCounter)}
        stateSetters.setCreatingBox(!state.creatingBox);
    }

    const handleToggleColorClick = () => {
        stateSetters.setCurrentColorsArray()
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sumInput = (e.target as HTMLFormElement).elements.namedItem('sumInput') as HTMLInputElement;
        const sumValue = parseInt(sumInput.value, 10);
        console.log('Sum submitted:', sumValue);
        declareBoxSum(sumValue, state, stateSetters, gridSetters);
        console.log(grid)
        sumInput.value = '';
    };
    return (
        <>
        <div className={`${state.isRequestingSum ? '' : 'hidden'} submit-holder`}>
            <form onSubmit={handleSubmit} className='submit-holder'>
                <input ref={buttonInputRefs.enterSumInput} type="number" name="sumInput" id="sumInput" className='form-input'/>
                <button ref={buttonInputRefs.enterSumButton} type="submit" className='submit-button'>Enter</button>
            </form>
        </div>
        <div className='killer-buttons'>
            <div className={`inner-killer-buttons ${state.killerMode ? '' : 'hidden'} `}>
                <button 
                    className={`killer-button delete-box-button ${state.deletingBox ? 'highlight-delete-button' : ''}`}
                    onClick={handleDeleteBoxClick}
                >
                    {`${state.deletingBox ? 'Select a Box' : 'Delete Box'}`}
                </button>
                <button 
                    className={`killer-button set-box-total-button ${state.settingBoxTotal ? 'highlight-set-button' : ''}`}
                    onClick={handleSetBoxSumClick}
                >
                    {`${state.settingBoxTotal ?  'Select a Box' : 'Set Box Sum'}`}
                </button>
                <button 
                    ref={buttonInputRefs.newBoxButton} 
                    className={`killer-button create-box-button ${state.creatingBox ? 'highlight-create-button' : ''}`}
                    onClick={handleCreateBoxClick}
                >
                    {`${state.creatingBox ? 'Place Box' : 'New Box'}`} <span className='key-indicator'>(Cmd+C)</span>
                </button>
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
    )
}