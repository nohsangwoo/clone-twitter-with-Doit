// Function that creates a Promise that waits for n milliseconds
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

//fake post list data
const posts = [
  {
    id: 1,
    title: `let's learn about redux middleware`,
    body: `it's easy to understand when you make your own redux middleware'리덕스 미들웨어를 직접 만들어보면 이해하기 쉽다.'`,
  },
  {
    id: 2,
    title: `let's use redux-thunk`,
    body: `let's use redux-thunk to handle asynchronous operations!`,
  },
  {
    id: 3,
    title: `also use redux-saga too`,
    body: `Later, we will also learn how to handle asynchronous tasks using redux-saga.`,
  },
];

// Asynchronous function to get a list of posts

export const getPosts = async () => {
  await sleep(2000); // rest 0.5s
  return posts; //return to array of posts variable
};

// Asynchronous function to look up a post with an ID
export const getPostById = async id => {
  await sleep(2000); // rest 0.5s
  return posts.find(post => post.id === id); //find with an id and return that
};
