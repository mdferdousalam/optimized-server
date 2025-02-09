import cors from "cors";
import express from "express"
import cookieParser from "cookie-parser";
const app = express();


import userRoutes from './app/modules/user/userRoutes.js';
import studentRoutes from './app/modules/student/studentRoutes.js';
import teacherRoutes from './app/modules/teacher/teacherRoutes.js';
import adminRoutes from './app/modules/admin/adminRoutes.js';
import accountantRoutes from './app/modules/accountant/accountantRoutes.js';
import feeRoutes from './app/modules/fees-management/feeRoutes.js';
import noticeRoutes from './app/modules/notice/noticeRoutes.js';
import attendanceRoutes from './app/modules/attendance/attendanceRoutes.js';
import incomeRoutes from './app/modules/income/incomeRoutes.js';
import expenseRoutes from './app/modules/expense/expenseRoutes.js';
import subjectRoutes from './app/modules/subject/subjectRoutes.js';
import classRoutes from './app/modules/class/classRoutes.js';
import examRoutes from './app/modules/exam/examRoutes.js';
import resultRoutes from './app/modules/result/resultRoutes.js';
import educationProgressRoutes from './app/modules/education-progress/educationProgressRoutes.js';
import errorHandler from "./app/middlewares/errorHandler.js";
import LogReqUrl from "./app/middlewares/logReqUrl.js";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.disable('x-powered-by');


app.use(errorHandler);
app.use(LogReqUrl);

app.get('/', (req, res) => {
	res.send(`Server health is good and running well`);
});


app.use('/users', userRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/admins', adminRoutes);
app.use('/accountants', accountantRoutes);
app.use('/fees', feeRoutes);
app.use('/notices', noticeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/incomes', incomeRoutes);
app.use('/expenses', expenseRoutes);
app.use('/subjects', subjectRoutes);
app.use('/classes', classRoutes);
app.use('/exams', examRoutes);
app.use('/results', resultRoutes);
app.use('/education-progress', educationProgressRoutes);



export default app;