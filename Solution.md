# Glassnode Code Challenge Solution | Efe Çini

Function **calculateHourlyEthFeeBetweenEOA** makes the required query and calculate the hourly ethereum fees between externally owned accounts.

# EndPoint

You can get the JSON response from  ```/getfee```

# Run the project
- Go the project folder
- Run docker
- Build the project: ```docker-compose build```
- Run the project: ```docker-compose up```
- Go to end point : [externaly owned accounts]: http://localhost:8080/getHourlyEthFeeBetweenEOA

# Technical Choices

- Making the query takes a litte time to run and maybe we can make it work faster by changing a little things like NOT IN/NOT EXISTS or changing the sql query within the query.

- If I had more time I would seperate the databse to files, write the comments and design a beautiful bootstrap interface for various daily, hourly, weekly Ethereum fees both between EOA and between contracts.