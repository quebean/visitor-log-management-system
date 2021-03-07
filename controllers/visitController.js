const Visit = require('../models/visit');
const OfficeLog = require('../models/officeLog');
const Office = require('../models/office');
const jwt = require('../middlewares/authentication');
const {formatDateString} = require('../utl/dateFormat');

module.exports.visitSearch = async (req, res) => {
    const {string, category} = req.body;
    try {
        const visits = await Visit.search(string, category);
        res.status(200).json(visits);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Failed'})
    }
}

module.exports.visitCreate = async (req, res) => {
    const visit = new Visit(
        req.body.name,
        req.body.address,
        req.body.contactNumber,
        req.body.purpose
    );
    try {
        const result = await Visit.create(visit);
        const token = jwt.createToken(result)
        res.cookie('visitId', token, {httpOnly: true, maxAge: 1000 * 60 * 3})
        res.redirect('/survey');
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}

module.exports.visitUpdateTimeOut = async (req, res) => {
    const date = `${formatDateString(new Date)} ${new Date().toLocaleTimeString()}`;
    const id = req.body.id;
    try {
        const result = await Visit.updateTimeOut(date, id);
        res.status(200).json({message: 'Success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed'});
    }
}

module.exports.visitShow = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        const officeLogs = await OfficeLog.findByVisitId(req.params.id);
        res.status(200).render('admin/visit-details', {
            visit,
            officeLogs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Bad request'});
    }
}

module.exports.dashboard = async (req, res) => {
    try {
        // last seven days count //
        let sevenDays = [];
        let sevenDaysCount = []
        for (let i = 0; i <= 29; i++) {
            const d = new Date;
            d.setDate(d.getDate() - i);
            const result = await Visit.count(formatDateString(d));
            sevenDays.push(formatDateString(d));
            sevenDaysCount.push(result);
        }

        // last 7 days office logs distribution //
        let offices = await Office.find();
        const officesLogCount = [];
        for (const office of offices) {
            const result = await Office.countLogByOffice(office.office_id);
            officesLogCount.push(result);
        }
        offices = offices.map((office) => office.office_name);

        //current log count
        const todayCount = await Visit.count(formatDateString(new Date()));
       
        //top 3
        function sort(arr, arr1) {
            const l = arr.length;
            for (let i = 0; i < l-1; i++) {
                for (let j = 0; j < l-i-1; j++) {
                    if (arr[j] < arr[j+1]) {
                        const temp = arr[j];
                        const temp1 = arr1[j];

                        arr[j] = arr[j+1]; 
                        arr1[j] = arr1[j+1]; 

                        arr[j+1] = temp;
                        arr1[j+1] = temp1; 
                    }
                    
                }
                
            }
        }
        sort(officesLogCount, offices);
        const topThreeOffices = offices.filter((office, index) => {
            if (index < 3) {
                return office;
            }
        })
        const topThreeCount = officesLogCount.filter((office, index) => {
            if (index < 3) {
                return office;
            }
        })

        res.status(200).json({
            success: true,
            bar: {sevenDays, sevenDaysCount},
            pie: {offices, officesLogCount},
            topThree: {topThreeOffices, topThreeCount},
            todayCount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Data not Found'})
    }
}