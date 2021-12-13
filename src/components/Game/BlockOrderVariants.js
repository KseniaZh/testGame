import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


function BlockOrderVariants(props) {

    const savedNextMove = useRef();

    let [count, setCount] = useState(0);

    const nextMove = () => {
        props.stepGame(props.stateGame.activeButton, props.stateGame.stateButtons, props.stateGame.arrStepGame);
        setCount(count + 1);
    }

    useEffect(() => {
        savedNextMove.current = nextMove;
    }, [nextMove]);

    useEffect(() => {
        function tick() {
            savedNextMove.current();
        }
        if (count < 9) {
            let id = setInterval(tick, 1000);
            return () => clearInterval(id);
        }
    }, [count]);

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
