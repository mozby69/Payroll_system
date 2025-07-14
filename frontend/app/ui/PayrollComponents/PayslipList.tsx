import py from '@/public/css/payslip.module.css';
import RightButton from '@/public/images/RightButton.svg'
import LeftButton from '@/public/images/LeftButton.svg'
import Image from 'next/image';


export default function PayslipList() {
    return (
    <div className={py.py_payslip_list} >
        <h1 className="fs-500 fw-bold txt-color-txt-clr-dark-neutral">Payslip List</h1>
            <div className={py.py_payslip_list_content}>
                <div>
                    <button>
                        <Image src={RightButton} alt="Right Button" width={40} height={40} />
                    </button>
                </div>
                    <div>
                        April-01-15-2025
                    </div>
                    <div>
                        April-01-15-2025
                    </div>
                    <div>
                        April-01-15-2025
                    </div>
                <div>
                    <button>
                         <Image src={LeftButton} alt="Right Button" width={40} height={40} />
                    </button>
                </div>
            </div>
      
    </div>
    );
}