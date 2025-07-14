import React, {useState} from "react";
import AreStyle from "@/public/css/EmpModalComponents/AreStyle.module.css"
import GeneralStyle from "@/public/css/EmpModalComponents/GeneralModal.module.css"
import Button from "@/app/components/buttons";


export default function EmployeeAre(){
    const [InputVal, SetInputVal] = useState('');

    return(
        <div className={GeneralStyle.content_body}>
            <div className={GeneralStyle.body_row_1}>
                <div className={AreStyle.main_body}>
                    <div className={`${AreStyle.LoanAmount}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Loan Amount</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"15,000.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={`${AreStyle.Monthly}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Monthly Payment</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"1,000.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={`${AreStyle.LoanTerm}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Loan Term</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"1 Year and 3 Months"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={AreStyle.active_status}>
                        <h3 className="fs-300 fw-regular">active</h3>
                    </div>
                    <div className={`${AreStyle.Description}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Description</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"Nebulizer"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={`${AreStyle.DateRange}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Date Range</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"Jan 1 - June 1, 2025"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={`${AreStyle.Agreement}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Payment Agreement</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style} ${AreStyle.AreInput}`} type="text" value={"Every Payout"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                    </div>
                    <div className={AreStyle.Edit_btn}>
                         <Button variant="modaledit" className="fs-300 fw-regular">View</Button>
                    </div>
                </div>

                
            </div>
            <div className={GeneralStyle.body_row_2}>
                    <h5 className="fs-300 fw-bold txt-color-txt-clr-light-neutral">Preview Loans</h5>
                    <div className={AreStyle.AreList}>

                          <div className={AreStyle.are_card}>

                                <div className= {AreStyle.are_card_row_1}>

                                    <div className={`${AreStyle.List_Desc}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Description</label>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Nebulizer</h5>
                                    </div>

                                    <div className={AreStyle.Loan_Status}>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Paid</h5>
                                    </div>
                                </div>

                                <div className={AreStyle.are_card_row_2}>
                                    <div className={`${AreStyle.List_Monthly}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Monthly</label>
                                        <h5 className="fs-400 fw-bold txt-color-txt-clr-dark-neutral">1,200.00</h5>
                                    </div>
                                </div>

                                <div className= {AreStyle.are_card_row_3}>

                                    <div className={`${AreStyle.List_Amount}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Total Amount</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">10,000.00</h5>
                                    </div>

                                    <div className={`${AreStyle.List_Term}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Loan Term</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">6 Months</h5>
                                    </div>

                                </div>
                               
                          </div>

                          <div className={AreStyle.are_card}>

                                <div className= {AreStyle.are_card_row_1}>

                                    <div className={`${AreStyle.List_Desc}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Description</label>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Nebulizer</h5>
                                    </div>

                                    <div className={AreStyle.Loan_Status}>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Paid</h5>
                                    </div>
                                </div>

                                <div className={AreStyle.are_card_row_2}>
                                    <div className={`${AreStyle.List_Monthly}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Monthly</label>
                                        <h5 className="fs-400 fw-bold txt-color-txt-clr-dark-neutral">1,200.00</h5>
                                    </div>
                                </div>

                                <div className= {AreStyle.are_card_row_3}>

                                    <div className={`${AreStyle.List_Amount}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Total Amount</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">10,000.00</h5>
                                    </div>

                                    <div className={`${AreStyle.List_Term}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Loan Term</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">6 Months</h5>
                                    </div>

                                </div>
                               
                          </div>

                          <div className={AreStyle.are_card}>

                                <div className= {AreStyle.are_card_row_1}>

                                    <div className={`${AreStyle.List_Desc}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Description</label>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Nebulizer</h5>
                                    </div>

                                    <div className={AreStyle.Loan_Status}>
                                        <h5 className="fs-400 fw-regular txt-color-txt-clr-dark-neutral">Paid</h5>
                                    </div>
                                </div>

                                <div className={AreStyle.are_card_row_2}>
                                    <div className={`${AreStyle.List_Monthly}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Monthly</label>
                                        <h5 className="fs-400 fw-bold txt-color-txt-clr-dark-neutral">1,200.00</h5>
                                    </div>
                                </div>

                                <div className= {AreStyle.are_card_row_3}>

                                    <div className={`${AreStyle.List_Amount}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Total Amount</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">10,000.00</h5>
                                    </div>

                                    <div className={`${AreStyle.List_Term}  ${GeneralStyle.input_col}`}>
                                        <label htmlFor="" className="fs-200 fw-regular txt-color-txt-clr-light-neutral">Loan Term</label>
                                        <h5 className="fs-300 fw-regular txt-color-txt-clr-dark-neutral">6 Months</h5>
                                    </div>

                                </div>
                               
                          </div>

                        
                    </div>
                
            </div>
        </div>
    );
}