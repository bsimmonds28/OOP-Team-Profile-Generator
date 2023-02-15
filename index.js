//inquirer version 8.2.4 for collecting user input
const inquirer = require('inquirer');

//fs for writing to the file system
const fs = require('fs');

//Import classes
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

//Creating variables
const teamArray = [];

//Question prompts in the command line
inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the Manager's name?",
            name: 'managerName',
        },
        {
            type: 'input',
            message: "What is the Manager's id?",
            name: 'managerID',
        },
        {
            type: 'input',
            message: "What is the Manager's email?",
            name: 'managerEmail',
        },
        {
            type: 'input',
            message: "What is the Manager's office number?",
            name: 'managerOffice',
        },
        {
            type: 'list',
            message: 'Do you want to add an engineer or intern?',
            name: 'addTeam',
            choices: ['Engineer', 'Intern', 'No']
        },
    ])
    .then((data) => {

        //Create manager object and push up to some array
        const manager = new Manager(data.managerName, data.managerID, data.managerEmail, data.managerOffice);
        teamArray.push(manager);

        addTeamMember(data.addTeam);
    });

//Function to add team member
const addTeamMember = (addTeam) => {
    //switch statement to add team member or create team
    switch (addTeam) {
        case 'Engineer':
            engineerQuestions();
            break;
        case 'Intern':
            internQuestions();
            break;
        default:
            createTeam();
            break;
    }
}

//Engineer questions
const engineerQuestions = () => {
    inquirer
    .prompt([
      {
          type: 'input',
          message: "What is the Engineer's name?",
          name: 'engineerName',
      },
      {
          type: 'input',
          message: "What is the Engineer's id?",
          name: 'engineerID',
      },
      {
          type: 'input',
          message: "What is the Engineer's email?",
          name: 'engineerEmail',
      },
      {
          type: 'input',
          message: "What is the Engineer's GitHub username?",
          name: 'engineerGitHub',
      },
      {
          type: 'list',
          message: 'Do you want to add an engineer or intern?',
          name: 'addTeam',
          choices: ['Engineer', 'Intern', 'No']
      },
    ])
    .then((data) => {
  
      const engineer = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.engineerGitHub)
      teamArray.push(engineer);

      addTeamMember(data.addTeam);
    })
}

//Intern questions
const internQuestions = () => {
    inquirer
    .prompt([
      {
          type: 'input',
          message: "What is the Intern's name?",
          name: 'internName',
      },
      {
          type: 'input',
          message: "What is the Intern's id?",
          name: 'internID',
      },
      {
          type: 'input',
          message: "What is the Intern's email?",
          name: 'internEmail',
      },
      {
          type: 'input',
          message: "What is the Intern's school?",
          name: 'internSchool',
      },
      {
          type: 'list',
          message: 'Do you want to add an engineer or intern?',
          name: 'addTeam',
          choices: ['Engineer', 'Intern', 'No']
      },
    ])
    .then((data) => {

      const intern = new Intern(data.internName, data.internID, data.internEmail, data.internSchool)
      teamArray.push(intern);
      
      addTeamMember(data.addTeam);
    })
}

//Function to create file with team information
const createTeam = () => {
    console.log(teamArray);
    console.log(teamArray[0].getRole());
    //Function to create HTML file and add code
    fs.writeFile('./assets/Team.html', htmlGenerator(teamArray), (err) =>
        err ? console.error(err) : console.log('Success!')
    );
};

//String template literals for generating a string version of the HTML document before it is written to the file system
const htmlGenerator = (teamArray) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <title>Document</title>
    </head>
    <header>
        <nav class="navbar navbar-dark bg-dark mb-5 justify-content-center">
            <span class="h1 navbar-text">
              My Team
            </span>
        </nav>
    </header>
    <body>
        <div class="container py-50">
            <div class="card-deck mb-3 text-center justify-content-center">
                <div class="card border-dark mb-3 box-shadow" style="max-width: 18rem;">
                    <div class="card-header">Manager</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">${teamArray[0].name}</h5>
                        <p class="card-text">ID: ${teamArray[0].id}</p>
                        <p class="card-text"><a href = "mailto: ${teamArray[0].email}">${teamArray[0].email}</a></p>
                        <p class="card-text">Office: ${teamArray[0].officeNumber}</p>
                    </div>
                </div>
                ${generateCards(teamArray)}
            </div>
        </div>
    </body>
    </html>`

};

const generateCards = (teamArray) => {
    const cards = [];
    for (let i = 1; i < teamArray.length; i++) {
        console.log(teamArray[i].getRole());
        switch (teamArray[i].getRole()) {
            case 'Engineer':
                cards[i] = `
                <div class="card border-dark mb-3 box-shadow" style="max-width: 18rem;">
                    <div class="card-header">Engineer</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">${teamArray[i].name}</h5>
                        <p class="card-text">ID: ${teamArray[i].id}</p>
                        <p class="card-text"><a href = "mailto: ${teamArray[i].email}">${teamArray[i].email}</a></p>
                        <p class="card-text"><a href = "https://github.com/${teamArray[i].getGithub()}" target="_blank">${teamArray[i].getGithub()}</a></p>
                    </div>
                </div>`
                break;
            case 'Intern':
                cards[i] = `
                <div class="card border-dark mb-3 box-shadow" style="max-width: 18rem;">
                    <div class="card-header">Intern</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">${teamArray[i].name}</h5>
                        <p class="card-text">ID: ${teamArray[i].id}</p>
                        <p class="card-text"><a href = "mailto: ${teamArray[i].email}">${teamArray[i].email}</a></p>
                        <p class="card-text">${teamArray[i].getSchool()}</p>
                    </div>
                </div>`
                break;
            default:
                break;
        }
    }
    return cards;
};