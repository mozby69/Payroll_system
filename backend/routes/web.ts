import express from 'express';
import { importSQLHandler } from '../controller/ImportController';
import { getEmployees } from '../controller/EmployeeController';
import { getPreparePayroll,updatePayrollEntry,savePayrollToArchive } from '../controller/PreparePayrollController';
import multer from 'multer';
import { LoginUser, registerUser } from '../src/controller/authController';

const router = express.Router();
const upload = multer({ dest:'uploads/'});


router.post('/login', LoginUser);
router.post('/register', registerUser);
router.post('/import-sql',upload.single('sqlfile'),importSQLHandler);
router.get('/employees-list',getEmployees);
router.get('/employees_payroll',getPreparePayroll);
router.put('/updatePayrollEntry/:payCode/:empCodeId',updatePayrollEntry);
router.post('/savepayrollarchive',savePayrollToArchive);



export default router;
