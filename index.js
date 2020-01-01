// Ömercan Balandı
// 2018280065

// NodeJS v12.13.1 ile test edilmiştir.

// Kullanım 

// npm run execute <dosya-yolu>
// npm run execute ./input.txt

// ya da

// node ./index.js <dosya-yolu>
// node ./index.js ./input.txt

const fs = require('fs');
const readLine = require('readline');

const ANSWER_KEY_LINE = 1;
const STUDENT_DATA_START_LINE = 2;
const STUDENT_NUMBER_INDEX = 0;

const POINTS_FOR_CORRECT_ANSWER = 4;
const POINTS_FOR_EMPTY_ANSWER = 0;
const POINTS_FOR_WRONG_ANSWER = -1;

const NORMALIZED_POINTS_MIN = 0;
const NORMALIZED_POINTS_MAX = 100;

const isFileExist = (path) => {
    return (fs.existsSync(path)) ? true : false;
}

const warning = () => {
    console.log('Lütfen geçerli bir dosya yolu belirtin.');
    console.log('npm run execute <dosya_yolu>');
    console.log('node ./index.js <dosya_yolu>');
}

const parseFile = (filePath) => {
    return new Promise(resolve => {
        let data = [];
        let answerKey;

        let lineCounter = 0;

        const readInterface = readLine.createInterface({
            input: fs.createReadStream(filePath)
        });

        readInterface.on('line', (line) => {
            let currentLine = lineCounter++;

            if (currentLine == ANSWER_KEY_LINE) {
                answerKey = line.split(',');
                return 0;
            }

            if (currentLine >= STUDENT_DATA_START_LINE) {
                let dataArr = line.split(',');
                let answers = [];

                for (let i = STUDENT_NUMBER_INDEX + 1; i < dataArr.length; i++) {
                    answers.push(dataArr[i]);
                }

                data.push({
                    studentNumber: dataArr[STUDENT_NUMBER_INDEX],
                    answers,
                    totalPoints: 0,
                    normalizedTotalPoints: 0
                });
            }
        });

        readInterface.on('close', () => {
            resolve({
                data, 
                answerKey
            });
        });
    });
}

const normalize = (val, min, max, normalizedMin, normalizedMax) => {
    return ((val - min) / (max - min)) * (normalizedMax - normalizedMin) + normalizedMin;
}

const calculateTotalPoints = (studentAnswers, answerKey) => {
    let points = 0;

    for (let i = 0; i < answerKey.length; i++) {
        if (studentAnswers[i] == '' || studentAnswers[i] == ' ') {
            points += POINTS_FOR_EMPTY_ANSWER;
        } else if (studentAnswers[i] == answerKey[i]) {
            points += POINTS_FOR_CORRECT_ANSWER;
        } else {
            points += POINTS_FOR_WRONG_ANSWER;
        }
    }

    if (points < 0) {
        points = 0;
    }

    return points;
}

const calculatePoints = (data, answerKey, normalizedMin, normalizedMax) => {
    let min = 0;
    let max = answerKey.length * POINTS_FOR_CORRECT_ANSWER;

    let studentMin = 0;
    let studentMax = 0;

    let sumOfPoints = 0;

    for (let i = 0; i < data.length; i++) {
        data[i].totalPoints = calculateTotalPoints(data[i].answers, answerKey);
        data[i].normalizedTotalPoints = normalize(data[i].totalPoints, min, max, normalizedMin, normalizedMax);

        if (data[i].totalPoints < studentMin || i == 0) {
            studentMin = data[i].totalPoints;
        } 

        if (data[i].totalPoints > studentMax || i == 0) {
            studentMax = data[i].totalPoints;
        } 

        sumOfPoints += data[i].totalPoints;
    }

    return { 
        calculatedData: data, 
        studentMin, 
        studentMax,
        average: sumOfPoints / data.length
    };
}

const sort_desc = (data) => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i - 1; j++) {
            let a = data[j];
            let b = data[j + 1];

            if (a.normalizedTotalPoints < b.normalizedTotalPoints) {
                data[j] = b;
                data[j + 1] = a;
            }
        }
    }

    return data;
}

const main = async () => {
    if (process.argv.length < 3) {
        warning();
        process.exit(0);
    }

    const filePath = process.argv[2];

    if (!isFileExist(filePath)) {
        warning();
        process.exit(0);
    }

    let { data, answerKey } = await parseFile(filePath);
    let { 
        calculatedData, 
        studentMin, 
        studentMax,
        average
    } = calculatePoints(data, answerKey, NORMALIZED_POINTS_MIN, NORMALIZED_POINTS_MAX);

    let sorted_data = sort_desc(calculatedData);
    let range = sorted_data[0].totalPoints - sorted_data[sorted_data.length - 1].totalPoints;

    let median = (sorted_data.length % 2 == 0) ?
    (sorted_data[sorted_data.length / 2].totalPoints + sorted_data[sorted_data.length / 2 - 1].totalPoints) / 2 :
    sorted_data[Math.floor(sorted_data.length / 2)].totalPoints;

    const logger = fs.createWriteStream('output.txt');
    sorted_data.forEach((data) => {
        logger.write(`${data.studentNumber},${data.totalPoints}\n`);
    });

    logger.write(`${studentMin}, ${studentMax}, ${average}, ${median}, ${range}`);
    logger.end();

    console.log('işlem tamamlandı. -> output.txt');
}

main();