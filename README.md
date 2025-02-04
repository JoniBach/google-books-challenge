# Library Frontend - Google Books API Task

This project was created as part of a technical assessment for a frontend developer role. Thankyou for taking the time to review it.

## Overview
 The task involves building a simple library frontend using mocked data from the Google Books API. The goal was to showcase project structure, UI implementation, and adherence to best practices. The guide time for the project was an hour. I timed the project and it took me a little over an hour to complete. I also made some tweaks later in the evening. For this reason I marked the hour with an empty commit message. I documented my development process throught with commit messages should you be interested. 

## Retrospective
Overall, I found the task straightforward and appreciated the non-invasive brief. Thanks to the team for being respectful of my time. 

I chose SvelteKit as the framework for this project. I've been using it commercially for a little over a year and find its architecture, performance, philosophies, and syntax ideal for both quickfire and large-scale projects. Although the majority of my experience is React-based and I generally consider myself to be framework agnostic, I would be happy to discuss my choice in greater depth if desired.

Though I was given the option to implement a component library, I opted to write the Table from scratch. I wanted to demonstrate my approach to pure functional component creation. I estimated that it would take me around 30 minutes to write the component, which more or less held up. The benefit of using an off-the-shelf component library would likely have been easier test incorporation. I would have liked to write unit tests with Vitest and component tests with Playwright. I would do this if I revisited the project with more time. However, I did have time to write documentation for the Table component. I chose to use JSDoc for this as it is a simple and effective way to document code. It also meets my personal preference for documentation as code. I am happy to discuss this concept further if desired.

On the topic of testing, had I spent more time on the project, I would have utilized Playwright for end-to-end testing of user flows. Should the project be deployed and put into production, I would also implement a CI/CD deployment workflow running parallelized test workflows. Generally, on production projects, I aim for complete code coverage of happy path user journeys with necessary coverage of edge cases. I am an advocate for pure functional programming, so I would have also been able to unit test individual functions with ease. I have a personal test philosophy that I generally follow with private and commercial projects. The formalized test philosophies that I usually create / contribute to are done in collaboration with development, product, and testing teams. These usually change depending on particular projects and organizations. I am happy to discuss this further if desired.

Additionally, within front-end communities online, a popular concept for designing front-end architecture is library-driven front-end development. This is why SvelteKit documentation encourages the use of the `/lib` folder and offers library bootstrapping out of the box. For production projects in large engagements, I would consider exporting any pure functional logic into a pure JavaScript library and any components into a SvelteKit bootstrapped library. This isolation would allow for better control over test coverage and could potentially facilitate a micro-frontend architecture should it be desired in the future. I am happy to discuss this further if desired.

Finally, with all this takin into account, I try identify the right commitments based on available time and requirements. Hence why much of this was not attempted (given the main aim was to represent my approach to structuring a FE project within a time box). 


---

## Features

- **Home Page:**  
  - Dynamically displays a list of books.
  - UI elements to search for, filter, and sort books (UI-only, not functional).
  
- **Book Details Page:**  
  - Displays detailed information about a selected book.
  
- **Navigation:**  
  - Basic page navigation (e.g., Home → Book Details → Home).

---

## Mock Data

Mock data used in the project is based on the Google Books API response format. It is located in the `static/data/books` directory. The data was retrieved via a Postman request to the Google Books API and a demonstrative set of typescript interfaces were created to represent the data in the application.

---

## Technologies Used

- **Framework:** SvelteKit 5
- **Language:** TypeScript
- **UI Framework:** None! just some basic CSS
- **Documentation:** JSDoc is used to document the Table component
- **Libs:** date-fns is used for date formatting 

---

## Component Overview

### DataTable Component

A responsive, reusable data table built with Svelte and TypeScript. It supports the following features:

- Sorting
- Pagination
- Search filtering
- Nested data formatting

Example usage:
```html
<Table
  columns={columns}
  data={data}
  totalRows={totalRows}
  currentPage={currentPage}
  rowsPerPage={rowsPerPage}
  sortBy={sortBy}
  sortDirection={sortDirection}
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  onRowClick={handleRowClick}
/>
```
---

## Project Structure

The project follows a standard, heavily simplified SvelteKit file structure. 

For those who are not familiar with SvelteKit, the project structure is quite simple.

Mine looks something like this:


```
├── src
│   ├── lib
│   │   ├── components
│   │   │   ├── index.ts
│   │   │   └── Table.svelte
│   │   ├── types
│   │   │   ├── index.ts
│   │   │   ├── table.ts
│   │   │   └── books.ts
│   ├── routes
│   │   ├── +page.ts
│   │   ├── index.svelte
│   │   └── book
│   │       └── [id]
│   │           ├── +page.ts
│   │           └── +page.svelte
│   ├── static
│   │   └── data
│   │       └── books
│   │           └── volumes.json
│   └── app.html
├── svelte.config.js
└── package.json
```

Svelte uses a file-based routing system, where each route is a folder containing any hanful of a subset of files with reserved names.

+page.ts is a file that contains the page's logic, while +page.svelte is the page's template.

The ts files are optional, but they are useful for adding types to the page's props and context. They can also be used to export functions that can be used in the template. However for this example, I am just using them to leverage the before load lifecycle methodology to fetch the mock data in the static file and channel it into the template.

If you have used Svelte before, but have not yet tried version 5, you will notice that the file structure is a bit different. The new version of SvelteKit has utalises the runes API which improves reactive syntax. There have also been changes to the way events are handled. More on that here: [Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)


---

## Setup and Development

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Running the Development Server
Start the development server:
```bash
npm run dev
```
To automatically open the app in a new browser tab:
```bash
npm run dev -- --open
```

### Building for Production
To build the application for production:
```bash
npm run build
```
The build process takes only a few seconds and generates optimized assets.

---

## Decisions and Trade-offs

- **Mock Data:** No API calls were implemented to keep the project scope manageable.
- **Functionality:** UI elements for search, filtering, and sorting are non-functional as the focus is on layout and structure.
- **Framework Choice:** SvelteKit was chosen for its simplicity and fast development experience.

---

## Submission

Submit the project as either:
- A GitHub repository link, or
- A ZIP file containing the project files.

---

## Notes
- The project focuses on frontend best practices, including state management, component reusability, and responsive design.
- The DataTable component is documented using JSDoc annotations for maintainability.

