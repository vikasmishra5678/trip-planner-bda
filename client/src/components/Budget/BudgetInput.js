import React, { useState, useRef, useEffect } from "react";
import numeral from "numeral";
// import { SaveBudget } from ".";

function BudgetInput({ onChange, putTotalBudget, save}) {
  const [userBudget, setUserBudget] = useState("");

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    onChange(numeral(userBudget).value());
    putTotalBudget(numeral(userBudget).value());
    setUserBudget(0);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="input p-3 col-lg-5 shadow text-center"
      style={{backgroundColor:"#e5e6d7"}}>
        <h3>What's Your Total Budget?</h3>
        <form className="budgetInputPosition">
          <input
            ref={inputEl}
            id="budget"
            type="text"
            className="form-control"
            placeholder="Enter Amount"
            aria-label="₹0"
            aria-describedby="basic-addon2"
            onChange={(event) => setUserBudget(event.target.value)}
            value={userBudget}
          />
          {numeral.validate(userBudget) && (
            <div className="input-group-append d-flex justify-content-center">
              <button
                className="btn btn-block mt-2 p-2 shadow text-white"
                style={{backgroundColor:"#69ab8e"}}
                onClick={handleClick}
                disabled={!numeral.validate(userBudget)}
              >
                Continue To Add Expense
              </button>
              {/* <SaveBudget save={save} className="btn btn-block btn-secondary" /> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BudgetInput;
