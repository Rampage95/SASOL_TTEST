<br />
<div align="center">

  <h1 align="center">PRODUCT CATALOG APP</h3>
  
  </div>
<br/>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#Run the project using Docker images">Run the project using Docker images</a></li>
        <li><a href="#Run the project after cloning it from Github">Run the project after cloning it from Github</a>
          <ul>
            <li><a href="#Running the backend server">Running the backend server</a></li>
            <li><a href="#Running the frontend app">Running the frontend app</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
      <ul>
            <li><a href="#PRODUCT CATALOG">PRODUCT CATALOG Page</a></li>
            <li><a href="#PRODUCT DETAILS">PRODUCT DETAILS Page</a></li>
            <li><a href="#PRODUCT CREATION">PRODUCT CREATION Page</a></li>
            <li><a href="#404 NOT FOUND">404 NOT FOUND Page</a></li>
          </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
  
  </br>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a responsive React.js Django SQLite application. It's a simple CRUD App, that allows the user to see, create, update and delete a product.

![image](https://user-images.githubusercontent.com/79465722/222981061-77eb32ad-8c43-43b9-a9d7-df2a0a0ad571.png)

### Built With

- JavaScript, React.js, Material-UI
- Python, Django

<!-- GETTING STARTED -->

## Getting Started

You can run this application in two ways:

- Run the project images on Docker after pulling them from Docker Hub.
- Clone the project from Github and install the dependencies by yourself.

### 1. Run the project using Docker images

1. Download and install <a href="https://www.docker.com/products/docker-desktop/">Docker</a> and <a href="https://git-scm.com/downloads">Git</a>.
2. Pull the project Docker images for both
   <a href="https://hub.docker.com/repository/docker/zupersaski/product_catalog_frontend/general">frontend</a> and
   <a href="https://hub.docker.com/repository/docker/zupersaski/product_catalog_backend/general">backend</a>
   from Docker Hub.
   To do so, open a Terminal and run the two commands below:
   ```sh
    docker pull zupersaski/product_catalog_frontend
   ```
   ```sh
    docker pull zupersaski/product_catalog_backend
   ```
3. Run the backend server by typing the command below:
   ```sh
    docker run -dp 8000:8000 zupersaski/product_catalog_backend
   ```
4. Run the frontend app by typing the command below:
   ```sh
    docker run -dp 3000:3000 zupersaski/product_catalog_frontend
   ```
5. Open your browser and navigate to <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a>.

Note that you can also clone the project from Github and build docker images locally by running the commands:

```sh
 docker-compose build
```

```sh
 docker-compose up
```

### 2. Run the project by cloning it from Github

1. Open the <a href="https://github.com/Rampage95/SASOL_TTEST">project Github repository</a>.
2. Clone the project.
3. Open the project in an Integrated Development Environment (IDE) (like VSCode, Intellij...)

#### Running the backend server

4. From your Terminal, navigate to the project folder.
5. From the project folder location, navigate to the backend sub-folder by running `cd ./backend`.
6. Install the needed dependencies by typing the command:
   ```sh
    pip install django django-cors-headers djangorestframework
   ```
7. Type the commands below to run the backend server:
   ```sh
    python manage.py migrate
   ```
   ```sh
    python manage.py runserver
   ```

#### Running the frontend app

7. Now in your Terminal, from the project folder location, navigate to the frontend sub-folder `cd ./frontend`
8. install the needed dependencies by typing the command:
   ```sh
    npm install
   ```
9. Type the command below to run the frontend app:

   ```sh
    npm start
   ```

   Note that you can also run the project with a more easier way by building Docker images as mentionned above. To do so, run the two commands below in a Terminal, then navigating to <a href="http://localhost:3000/">http://localhost:3000/</a> in your browser.

   ```sh
    docker-compose build
   ```

   ```sh
    docker-compose up
   ```

## Usage

After running the project successfully, a Product Catalog page will be displayed in the browser.

![image](https://user-images.githubusercontent.com/79465722/222974640-8a9de4ca-604a-4102-ac86-e0d8c6bea537.png)

### PRODUCT CATALOG Page

- It is possible to filter the products list using the search bar.

![Untitled](https://user-images.githubusercontent.com/79465722/222974963-18d723aa-380a-43fb-847c-0e96d1ba7fa9.png)

- The informations of each product are displayed on each product card. The green/red dot on the bottom right indicates if the product is active/inactive respectively.

- Clicking on the DELETE button will remove the product from the catalog.

- Clicking on the EDIT button will redirect you to the PRODUCT DETAILS page where you can edit the selected product.

![Untitled2](https://user-images.githubusercontent.com/79465722/222976150-cc929d6a-6ccf-4467-b455-241254eba732.png)

- Clicking on NEW PRODUCT button will redirect you to the PRODCUT CREATION page where you can create a new product.

![Untitled1](https://user-images.githubusercontent.com/79465722/222975865-a4cf22c0-26de-4f20-a401-b5f6831f2c6b.png)

### PRODUCT CREATION Page

- In order to create a new product, you need to fill at least the three mandatory fields: `Name`, `Price` and `Description` (indicated by \* in their labels).

![image](https://user-images.githubusercontent.com/79465722/222976291-4095a890-909a-4289-8269-f223d236e7b4.png)

- The mandatory fields can't be empty, and the price field should respect the format digits dot digits (for exemple 120.1, 3000.543 etc).

![image](https://user-images.githubusercontent.com/79465722/222984674-160d3998-e050-44a4-989d-009320f64785.png)

- To add product tags, write the tag in the `New Tag` field and click on the `Plus icon`.

![Untitled3](https://user-images.githubusercontent.com/79465722/222976421-3e887be5-80eb-46e0-8f72-032ddf0b1bdb.png)

- To remove a tag from the product, click on the `cross icon` of the tag.

![Untitled3](https://user-images.githubusercontent.com/79465722/222980786-d35d44a5-f915-4ed5-8208-0e5f34d10c3b.png)

- Clicking on CONFIRM button will create the product and redirect you back automatically to the PRODUCT CATALOG page.

- Clicking on CLEAR button will empty the fields.

- Clicking on BACK button will redirect you to the PRODUCT CATALOG page.

### PRODUCT DETAILS Page

- This page allows you to edit the properties of a product.

- The functionalities of this page are similar to PRODUCT CREATION page's functionalities.

![image](https://user-images.githubusercontent.com/79465722/222980879-c501ccfd-cfbb-4ba1-b562-15ed2dc6aa00.png)

### 404 NOT FOUND Page

- A 404 NOT FOUND page is displayed whenever the user tries to access a wrong URL (<a href="http://localhost:3000/wrong_path">http://localhost:3000/wrong_path</a> for exemple).

![image](https://user-images.githubusercontent.com/79465722/222981359-4654fc20-513d-4985-bcda-5c830deae700.png)

<!-- CONTACT -->

## Contact

Saifeddine Skini - [@LinkedIn](https://www.linkedin.com/in/skini-saifeddine-6018a9189/) - skini.channel@gmail.com

Project Link: [https://github.com/Rampage95/SASOL_TTEST](https://github.com/Rampage95/SASOL_TTEST)
