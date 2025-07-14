import express from 'express';
import { importSQLHandler } from '../controller/ImportController';
import { getEmployees,DisplayAllEmployees } from '../controller/EmployeeController';
import { getPreparePayroll,updatePayrollEntry,savePayrollToArchive,getAvailableEmployees,SaveNewEmployeePayroll,getAllEmployeesPayrollByPayCode,getPayrollParameter } from '../controller/PreparePayrollController';
import multer from 'multer';
import { LoginUser, registerUser } from '../src/controller/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import { getFilterEmployees } from '../controller/MainPayrollController';
import { getBranches } from '../controller/GeneralController';

const router = express.Router();
const upload = multer({ dest:'uploads/'});

// Auth routes (public)
router.post('/login', LoginUser);
router.post('/register', registerUser);

// Protected routes
router.post('/import-sql',authenticateToken,upload.single('sqlfile'),importSQLHandler);
router.get('/employees-list', authenticateToken, getEmployees);
router.get('/employees_payroll', authenticateToken, getPreparePayroll);
router.put('/updatePayrollEntry/:payCode/:empCodeId',authenticateToken,updatePayrollEntry);
router.post('/savepayrollarchive', authenticateToken, savePayrollToArchive);
router.get('/getAvailableEmployees',authenticateToken,getAvailableEmployees);
router.post('/SaveNewEmployeePayroll',authenticateToken,SaveNewEmployeePayroll);
router.get('/getAllEmployeesPayrollByPayCode',authenticateToken,getAllEmployeesPayrollByPayCode);
router.get('/getPayrollParameter',authenticateToken,getPayrollParameter);
router.get('/DisplayAllEmployees',authenticateToken,DisplayAllEmployees);

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: false
  });
  res.status(200).json({ message: 'Logout successful' });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    // `user` is attached to req in middleware
    const user = (req as any).user;
    // Optional: Fetch fresh user data from DB using user.id
    // const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
    res.status(200).json({
      // id: user.id,
      // email: user.email,
      // username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});


router.get('/filter-employees', authenticateToken, getFilterEmployees)
router.get('/branches', authenticateToken, getBranches)




export default router;
