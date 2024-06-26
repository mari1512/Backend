const XLSX = require('xlsx');
const Users = require('./Schema/Users');

const filePath = 'users.xlsx';
const sheet = 'Sheet1';
const requiredColumn = 'A';
const MaximumRowNumber = 1000000;

class Excel{
    async importData(){
        await Promise.all([this.importUsers()]).then(()=>{
            console.log('Uploaded Finished! .............. ^_^');
        });
    }

    async importUsers(){
        const xlsx = XLSX.readFile(filePath);
        const range = xlsx.Sheets[sheet];

        console.log('Users data uploaded...');

        for (let row=2; row<=MaximumRowNumber; row++) {
            if(!range[`${requiredColumn}${row}`]){
                break; // stop if no another  data

            }

            const rowIns = {
                excelId: range[`A${row}`].w,
                nameAr: range[`B${row}`] ? range[`B${row}`].w : '',
                name: range[`C${row}`] ? range[`C${row}`].w : '',
                birthDate: new Date(range[`D${row}`].w),
                gender: range[`E${row}`] ? range[`E${row}`].w : '',
                isActive: true,
            };
            this.addUser(rowIns);
        }

    }

    updateUser(rowIns) {
        // update existed user
        return Users.findOneAndUpdate(
          {
            excelId: rowIns.excelId, // your condition
          },
          {
            $set: {
              name: rowIns.name,
              nameAr: rowIns.nameAr,
            }, // update values
          },
          {
            new: true, // return new one
          },
          (error, result) => {
            console.log([error, result]);
          },
        );
      }
      addUser(rowIns) {
        const userIns = new Users({
          excelId: rowIns.excelId,
          name: rowIns.name,
          nameAr: rowIns.nameAr,
          birthDate: rowIns.birthDate,
          gender: rowIns.gender,
          isActive: rowIns.isActive,
        });
        userIns.save();
      }


}
const excelIns = new Excel();
module.exports = excelIns;