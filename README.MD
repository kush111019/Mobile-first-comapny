1) Description : - This project is a backend system built using Node.js, Express, PostgreSQL, and Redis for caching. It includes APIs for managing orders, cart items, and other resources, with Redis integration to improve performance by caching frequently accessed data.

2) Features : - 
   a) User-based order management system
   b) Order and cart APIs with PostgreSQL (using Sequelize ORM)
   c) Caching with Redis for faster responses
   d) Indicates whether data is served from Redis or PostgreSQL
   e) Modular API structure with proper error handling

   *Redis : - First loin into redis and create a new database then get the Host , Port and Password of the redis database server.
              Now using them we can connect to the redis database server using these. Data will be stored in the key and value pair
              in the redis server and in order to see that whether the data is getting inserted on various CRUD operations in Node JS
              api server we can use SCAN  COMMAND in the redis cli . Given below are the commands which will be used to see the key 
              and value in the redis database.
              - > redis-cli -h redis-15462.c274.us-east-1-3.ec2.redns.redis-cloud.com -p 15462 -a m4ZJy0abguqrmSyFmzIs3Ng7MbJg0AIl ( Using this command we can access the redis server from the cli and no need to install the cli manually)
              - > SCAN 0 MATCH user:token:* COUNT 100 ( using this command we can see the key and value when jwt token gets saved in the redis server during sigin operation)
              - > GET user:token:2 ( using this command we can see the token value in the redis server)
              ( similarly the given below commands are for cart operation)
              - > SCAN 0 MATCH cart:* COUNT 100 
              - > GET cart:2
              ( similarly the given below commands are for products)
              - > SCAN 0 MATCH products:* COUNT 100
              - > GET products:Electronics:20:40:true:1:20:createdAt:DESC
         
         * The response of various api will itself show that whether the response is coming from the redis server or from the postgres 
         * The data will remain in the redis server for 30 minutes and the expiry time of the jwt token is 7 days
         * Only those apis are written which are asked in the Task . As per the need of the further requirements we can integrate 
           unit test and Docker component also to contanarize our application.
         * The data will be first fetched from the database on the first request but after successive request it will be fetched
           from the redis server due to caching(applicable only on those apis in which we are saving data in the redis server as well)

3) How to run locally : - 
   a) First clone the repositroy from the git
   2) cd to projectt root directory
   3) run command npm install
   4) create the .env file with the required credentials( as this the dummy project that is why .env file will be available on the git branch )
   5) create the database in postgres with the name ecommerce_db
   6) run the migration file using the command npx sequelize-cli db:migrate
   7) keep the redis server in running state
   7) run the command npm run dev to start the server


4) Tech Stack : -
   Node.js
   Express.js
   PostgreSQL (via Sequelize ORM)
   Redis (caching)
   dotenv (for environment variables)




** NOW YOU CAN CHECK THE WORKING OF THE APIS AS GIVEN IN THE POSTMAN COLLECTION



              
