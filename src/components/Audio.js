import React from "react";
import mpTest from "../audio/mp-test.wav";

export default function Audio(props) {
  return <audio controls>
            <source src={mpTest} type="audio/wav"/>
         </audio>
}