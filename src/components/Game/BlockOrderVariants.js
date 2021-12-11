import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function BlockOrderVariants(props) {

    let [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isRunning, setIsRunning] = useState(true);
 
    useInterval(() => {
        if (count === 9) {
            setDelay(null);
        };
        setCount(count + 1);
        props.stepGame(props.stateGame.activeButton, props.stateGame.stateButtons, props.stateGame.arrStepGame)
    }, isRunning ? delay : null);



    return (
 
        <div className="game__block_order_variants">
            {
                props.stateGame.arrStepGame.map((item, index) => {
                    
                    if (item === 'top') {
                        return <div key={index}><FontAwesomeIcon icon={faChevronUp} /></div>
                    }
                    if (item === 'right') {
                        return <div key={index}><FontAwesomeIcon icon={faChevronRight} /></div>
                    }
                    if (item === 'left') {
                        return <div key={index}><FontAwesomeIcon icon={faChevronLeft} /></div>
                    }
                    if (item === 'bottom') {
                        return <div key={index}><FontAwesomeIcon icon={faChevronDown} /></div>
                    }

                })
                }
        </div>

    )
}

export default BlockOrderVariants
