console.log('Before');
// Callback approach - (Pyramid of Doom)
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

// Promise-based approach
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commits', commits))
//   .catch(err => console.log('Error', err));

// Async and Await approach
async function displayCommits(){
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log('Commits', commits);
  } catch (e) {
    console.log('Error', e.message)
  } finally {
    console.log('Done');
  }
}
displayCommits()

console.log('After');

function getUser(id) {
  return new Promise((resolve,reject) => {
    // Kickoff some asynk work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'remvil' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      // resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('Could not get the repos.'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    }, 2000);
  });
}

// console.log('Before');
// getUser(1, getRepositories);
// console.log('After');
//
// function getRepositories(user){
//   getRepositories(user.gitHubUsername, getCommits);
// }
//
// function getCommits(repos){
//   getCommits(repos, displayCommits);
// }
//
// function displayCommits(commits){
//   console.log(commits);
// }
//
// function getUser(id, callback){
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUsername: 'remvil' });
//   }, 2000);
// }
