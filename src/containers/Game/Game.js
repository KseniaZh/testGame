import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import BlockGameButtons from '../../components/Game/BlockGameButtons';
import Button from '../../UI/Buttons/Button';
import BlockOrderVariants from '../../components/Game/BlockOrderVariants';
import BlockButtonsFinishGame from '../../components/Game/BlockButtonsFinishGame';
import {
    changeActiveButton,
    changeNameActiveButton,
    addItemArrStepGame,
    clearState,
} from '../../store/Game/actionsGame';
import { randomItemFromArray } from '../../functions/randomItemFromArray';


function Game(props) {

    const dispatch = useDispatch();
    const stateGame = useSelector(state => state.stateGame);
    const stateGameButtons = useSelector(state => state.stateGame.stateButtons);

    const arrGameButtons = [];
    let i = 0;
    let box = [];

    stateGameButtons.map((obj, index) => {
        if (i < 3) {
            i++;
            box.push(obj);
        } else {
            i = 1;
            arrGameButtons.push(box);
            box = [];
            box.push(obj);
        };
        if (stateGameButtons.length === (index + 1)) {
            arrGameButtons.push(box);
        };
    })

    const stepGame = (parameters) => {

        let indexActivButton = parameters.activeButton;
        let stateButtons = parameters.stateButtons;
        let arrStep = parameters.arrStepGame;

        let randomVariantIndex = randomItemFromArray(stateButtons[indexActivButton].variants);
        let variant = stateButtons[indexActivButton].variants[randomVariantIndex];

        dispatch(changeActiveButton(stateButtons[indexActivButton][variant]));
        dispatch(addItemArrStepGame(variant, arrStep));
    }

    const [flagGameStart, setFlagGameStart] = useState(false);
    const [flagGameFinish, setFlagGameFinish] = useState(false);
    const [flagOpenResult, setFlagOpenResult] = useState(true);

    const colorYellow = '#FFCC33';
    const colorRed = '#D2333E';
    const colorGreen = 'green';

    const handlerGameStart = () => {
        
        let randomIndex = randomItemFromArray(stateGameButtons);
        dispatch(changeActiveButton(randomIndex));
        dispatch(changeNameActiveButton(randomIndex, stateGameButtons, 'СТАРТ', colorYellow));
        setFlagGameStart(prev => true);
        setFlagOpenResult(prev => true);
    }

    const handlerGameEnd = (data) => {

        if (data === stateGame.activeButton) {
            dispatch(changeNameActiveButton(data, stateGameButtons, 'МОЛОДЕЦ!', colorGreen));
        } else {
            dispatch(changeNameActiveButton(data, stateGameButtons, 'ОШИБКА', colorRed));
        };
        setFlagGameFinish(prev => true);
    }
    const handlerGameStartTry = () => {
        dispatch(clearState(stateGame));
        setFlagGameStart(prev => false);
        setFlagGameFinish(prev => false);
    }
    const handlerOpenResult = () => {
        dispatch(changeNameActiveButton(stateGame.activeButton, stateGameButtons, 'ФИНИШ', colorGreen));
        setFlagOpenResult(prev=> false);
    }

    return(
        <div className='game_wrapper' >

            <BlockGameButtons
                arrGameButtons={arrGameButtons}
                onclick={handlerGameEnd}
            />
           
            {
                flagGameStart ?
                    <BlockOrderVariants
                        stateGame={stateGame}
                        stepGame={stepGame}
                    />
                    :<Button
                        classname="game__buttom_handler"
                        onclick={handlerGameStart}
                        name='СТАРТ'
                     />
            }
            {
                flagGameStart & !flagGameFinish ?
                        <div>ПРОСЛЕДИ НАПРАВЛЕНИЕ СТРЕЛОК И ВЫБЕРИ КЛЕТКУ ФИНИШ</div>
                        : null
            }
            {
                flagGameFinish ?
                    <BlockButtonsFinishGame
                        onclickStartGame={handlerGameStartTry}
                        onclickOpenResult={handlerOpenResult}
                        flagOpenResult={flagOpenResult}
                    />
                    : null
            }

        </div>
    )
}

export default connect()(Game)

