import { renderFilePreview } from "./_file-preview";

// Initial Approach was to build a custom PUB/SUB for reactivity
// Discovered I'd have to write some reconciliation algorithm to handle
// rendering massive lists of files on each update
// interface Store {
//   state?: Object;
//   listeners?: Function[];
//   getState?: Function;
//   subscribe?: Function;
//   dispatch?: Function;
// }

// interface Action {
//   type?: string;
//   payload?: any;
// }

// const createStore = (reducer, initialState = {}) => {
//   const store: Store = {};
//   store.state = initialState;
//   store.listeners = [];

//   store.getState = () => store.state;

//   store.subscribe = listener => {
//     store.listeners.push(listener);
//   };

//   store.dispatch = (action: Action) => {
//     store.state = reducer(store.state, action);
//     store.listeners.forEach(listener => listener());
//   };

//   return store;
// };

// const initialState = {
//   files: []
// };

// const fileReducer = (state = initialState, action: Action = {}) => {
//   switch (action.type) {
//     case "ADD":
//       console.log("before update", state);
//       return { ...state, files: [...state.files, action.payload] };

//     case "DELETE":
//       // TODO: Implement delete functionality
//       const filteredFiles = state.files.filter(
//         file => file.name !== action.payload.name
//       );
//       return { ...state, files: filteredFiles };

//     default:
//       return { ...state, files: [] };
//       break;
//   }
// };

// function Files() {
//   const store = createStore(fileReducer);
//   store.dispatch();

//   store.subscribe(() => {
//     const state = store.getState();
//     const files: [] = state.files;
//     [...document.querySelector(".js-preview").children].forEach(file => {
//       file.remove();
//     });
//     files.forEach(file => {
//       console.log(files);
//       renderFilePreview(file);
//     });
//   });

//   function addFile(file) {
//     store.dispatch({
//       type: "ADD",
//       payload: file
//     });
//   }

//   function deleteFile(file) {
//     store.dispatch({
//       type: "DELETE",
//       payload: file
//     });
//   }

//   return {
//     addFile,
//     deleteFile
//   };
// }

// export const filesService = Files();
